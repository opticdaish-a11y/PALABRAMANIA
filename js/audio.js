// js/audio.js - Efectos de sonido sintetizados con Web Audio API

class SoundManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.loadSettings();
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    loadSettings() {
        const saved = localStorage.getItem('sopa_sound_enabled');
        if (saved !== null) {
            this.enabled = saved === 'true';
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('sopa_sound_enabled', this.enabled);
        return this.enabled;
    }

    playLetterSelect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(450, now);
            osc.frequency.exponentialRampToValueAtTime(700, now + 0.05);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {
            // Audio ignore
        }
    }

    playWordFound() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            // Acorde triunfal brillante (Do Mayor: C5, E5, G5, C6)
            const notes = [523.25, 659.25, 783.99, 1046.50];

            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const noteTime = now + (idx * 0.07);

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, noteTime);

                gain.gain.setValueAtTime(0.12, noteTime);
                gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(noteTime);
                osc.stop(noteTime + 0.35);
            });
        } catch (e) {
            // Audio ignore
        }
    }

    playWrongWord() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.linearRampToValueAtTime(110, now + 0.18);

            gain.gain.setValueAtTime(0.09, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.18);
        } catch (e) {
            // Audio ignore
        }
    }

    playVictory() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            // Fanfarria victoriosa: G4, C5, E5, G5
            const fanfare = [
                { f: 392.00, d: 0.12, offset: 0 },
                { f: 523.25, d: 0.12, offset: 0.14 },
                { f: 659.25, d: 0.12, offset: 0.28 },
                { f: 783.99, d: 0.45, offset: 0.42 }
            ];

            fanfare.forEach(note => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const noteTime = now + note.offset;

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(note.f, noteTime);

                gain.gain.setValueAtTime(0.18, noteTime);
                gain.gain.exponentialRampToValueAtTime(0.001, noteTime + note.d);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(noteTime);
                osc.stop(noteTime + note.d);
            });
        } catch (e) {
            // Audio ignore
        }
    }

    playRivalWord() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.2);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.2);
        } catch (e) {
            // Audio ignore
        }
    }
}

export const sounds = new SoundManager();
