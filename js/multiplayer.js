// js/multiplayer.js - Multijugador 1 vs 1 en tiempo real mediante PeerJS (WebRTC)

import { StorageManager } from './storage.js';

export class MultiplayerManager {
    constructor(callbacks) {
        this.callbacks = callbacks;
        this.peer = null;
        this.conn = null;
        this.isHost = false;
        this.roomCode = null;
        this.connectedPlayer = null;
        this.status = 'DISCONNECTED'; // DISCONNECTED | CONNECTING | WAITING | PLAYING
    }

    /**
     * Genera un código de sala amigable de 4-5 caracteres alfanuméricos
     */
    static generateRoomCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    static getPeerId(roomCode) {
        return `sopa-p2p-${roomCode.toUpperCase().trim()}`;
    }

    /**
     * Inicia una sala como Host
     */
    createRoom(roomCode = null) {
        this.roomCode = roomCode || MultiplayerManager.generateRoomCode();
        this.isHost = true;
        this.status = 'WAITING';

        const myProfile = StorageManager.getProfile();
        const peerId = MultiplayerManager.getPeerId(this.roomCode);

        // Inicializar PeerJS (servidor de señalización público y gratuito de PeerJS)
        if (window.Peer) {
            this.peer = new window.Peer(peerId, {
                debug: 1,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:global.stun.twilio.com:3478' }
                    ]
                }
            });

            this.peer.on('open', (id) => {
                console.log('Host peer abierto con ID:', id);
                if (this.callbacks.onRoomCreated) {
                    this.callbacks.onRoomCreated(this.roomCode);
                }
            });

            this.peer.on('connection', (connection) => {
                this.conn = connection;
                this.setupConnectionHandlers();
            });

            this.peer.on('error', (err) => {
                console.error('Peer error:', err);
                if (err.type === 'unavailable-id') {
                    // Si el código ya existe, generar otro
                    this.createRoom();
                } else if (this.callbacks.onError) {
                    this.callbacks.onError(err.message || 'Error de conexión');
                }
            });
        } else {
            console.error('PeerJS library not loaded');
            if (this.callbacks.onError) {
                this.callbacks.onError('La biblioteca PeerJS no se pudo cargar.');
            }
        }
    }

    /**
     * Se une a una sala existente como Invitado (Guest)
     */
    joinRoom(roomCode) {
        this.roomCode = roomCode.toUpperCase().trim();
        this.isHost = false;
        this.status = 'CONNECTING';

        const guestPeerId = `sopa-guest-${Date.now()}-${Math.floor(Math.random()*1000)}`;
        const hostPeerId = MultiplayerManager.getPeerId(this.roomCode);

        if (window.Peer) {
            this.peer = new window.Peer(guestPeerId, {
                debug: 1,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:global.stun.twilio.com:3478' }
                    ]
                }
            });

            this.peer.on('open', () => {
                this.conn = this.peer.connect(hostPeerId, { reliable: true });
                this.setupConnectionHandlers();
            });

            this.peer.on('error', (err) => {
                console.error('Peer join error:', err);
                if (this.callbacks.onError) {
                    this.callbacks.onError('No se pudo encontrar la sala o el anfitrión no está disponible.');
                }
            });
        }
    }

    setupConnectionHandlers() {
        if (!this.conn) return;

        this.conn.on('open', () => {
            console.log('Conexión P2P establecida');
            const myProfile = StorageManager.getProfile();

            if (this.isHost) {
                // Notificar que el rival se conectó
                if (this.callbacks.onPlayerJoined) {
                    this.callbacks.onPlayerJoined({ role: 'guest' });
                }
            } else {
                // El invitado envía su perfil al Host
                this.send({
                    type: 'GUEST_HELLO',
                    profile: myProfile
                });
            }
        });

        this.conn.on('data', (data) => {
            this.handleIncomingData(data);
        });

        this.conn.on('close', () => {
            console.log('Conexión cerrada por el otro jugador');
            this.status = 'DISCONNECTED';
            if (this.callbacks.onPlayerLeft) {
                this.callbacks.onPlayerLeft();
            }
        });

        this.conn.on('error', (err) => {
            console.error('Connection error:', err);
            if (this.callbacks.onError) {
                this.callbacks.onError('Se perdió la conexión con el rival.');
            }
        });
    }

    send(data) {
        if (this.conn && this.conn.open) {
            this.conn.send(data);
        }
    }

    handleIncomingData(data) {
        if (!data || !data.type) return;

        switch (data.type) {
            case 'GUEST_HELLO':
                this.connectedPlayer = data.profile;
                if (this.callbacks.onPlayerJoined) {
                    this.callbacks.onPlayerJoined({
                        role: 'guest',
                        profile: data.profile
                    });
                }
                break;

            case 'START_GAME':
                // Recibido por el invitado con el puzzle generado por el host
                this.status = 'PLAYING';
                this.connectedPlayer = data.hostProfile;
                if (this.callbacks.onGameStart) {
                    this.callbacks.onGameStart(data);
                }
                break;

            case 'WORD_FOUND':
                // El rival encontró una palabra
                if (this.callbacks.onRivalWordFound) {
                    this.callbacks.onRivalWordFound(data);
                }
                break;

            case 'REACTION':
                // El rival envió un emoji de reacción
                if (this.callbacks.onReactionReceived) {
                    this.callbacks.onReactionReceived(data.emoji);
                }
                break;

            case 'RESTART_REQUEST':
                if (this.callbacks.onRestartRequest) {
                    this.callbacks.onRestartRequest();
                }
                break;
        }
    }

    /**
     * Host lanza la partida enviando el tablero al invitado
     */
    startMatch(puzzleData) {
        if (!this.isHost) return;
        const hostProfile = StorageManager.getProfile();
        this.status = 'PLAYING';

        this.send({
            type: 'START_GAME',
            puzzle: puzzleData,
            hostProfile
        });

        if (this.callbacks.onGameStart) {
            this.callbacks.onGameStart({
                puzzle: puzzleData,
                hostProfile,
                guestProfile: this.connectedPlayer
            });
        }
    }

    /**
     * Notifica al rival que se encontró una palabra
     */
    notifyWordFound(word, cells) {
        this.send({
            type: 'WORD_FOUND',
            word,
            cells
        });
    }

    /**
     * Envía un emoji de reacción en vivo
     */
    sendReaction(emoji) {
        this.send({
            type: 'REACTION',
            emoji
        });
    }

    disconnect() {
        if (this.conn) {
            try { this.conn.close(); } catch (e) {}
            this.conn = null;
        }
        if (this.peer) {
            try { this.peer.destroy(); } catch (e) {}
            this.peer = null;
        }
        this.status = 'DISCONNECTED';
        this.isHost = false;
        this.roomCode = null;
    }
}
