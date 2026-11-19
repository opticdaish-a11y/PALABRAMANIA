// js/storage.js - Gestión de perfil, estadísticas y récords locales

const STORAGE_KEYS = {
    PROFILE: 'sopa_player_profile',
    STATS: 'sopa_player_stats',
    LEADERBOARD: 'sopa_local_leaderboard',
    CUSTOM_LISTS: 'sopa_custom_lists'
};

const DEFAULT_PROFILE = {
    name: 'Cazapalabras',
    avatar: '🦊',
    color: '#3B82F6' // Azul principal
};

const DEFAULT_STATS = {
    gamesPlayed: 0,
    gamesWon: 0,
    multiplayerWins: 0,
    multiplayerLosses: 0,
    wordsFound: 0,
    bestTimes: {}, // { 'animales_facil': 45, ... } en segundos
    currentStreak: 0,
    bestStreak: 0
};

export class StorageManager {
    static getProfile() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
            return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : { ...DEFAULT_PROFILE };
        } catch (e) {
            return { ...DEFAULT_PROFILE };
        }
    }

    static saveProfile(profile) {
        try {
            localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
        } catch (e) {
            console.error('Error guardando perfil:', e);
        }
    }

    static getStats() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.STATS);
            return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : { ...DEFAULT_STATS };
        } catch (e) {
            return { ...DEFAULT_STATS };
        }
    }

    static recordWordFound() {
        const stats = this.getStats();
        stats.wordsFound = (stats.wordsFound || 0) + 1;
        this.saveStats(stats);
    }

    static recordGameCompletion(categoryKey, difficulty, timeInSeconds, isWin = true) {
        const stats = this.getStats();
        stats.gamesPlayed = (stats.gamesPlayed || 0) + 1;

        if (isWin) {
            stats.gamesWon = (stats.gamesWon || 0) + 1;
            stats.currentStreak = (stats.currentStreak || 0) + 1;
            if (stats.currentStreak > (stats.bestStreak || 0)) {
                stats.bestStreak = stats.currentStreak;
            }

            const recordKey = `${categoryKey}_${difficulty}`;
            if (!stats.bestTimes[recordKey] || timeInSeconds < stats.bestTimes[recordKey]) {
                stats.bestTimes[recordKey] = timeInSeconds;
            }

            // Registrar en el ranking local
            this.addToLeaderboard({
                playerName: this.getProfile().name,
                category: categoryKey,
                difficulty,
                time: timeInSeconds,
                date: new Date().toLocaleDateString()
            });
        } else {
            stats.currentStreak = 0;
        }

        this.saveStats(stats);
    }

    static recordMultiplayerResult(won) {
        const stats = this.getStats();
        stats.gamesPlayed = (stats.gamesPlayed || 0) + 1;
        if (won) {
            stats.multiplayerWins = (stats.multiplayerWins || 0) + 1;
        } else {
            stats.multiplayerLosses = (stats.multiplayerLosses || 0) + 1;
        }
        this.saveStats(stats);
    }

    static saveStats(stats) {
        try {
            localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
        } catch (e) {
            console.error('Error guardando stats:', e);
        }
    }

    static getLeaderboard() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    static addToLeaderboard(entry) {
        const lb = this.getLeaderboard();
        lb.push({
            id: Date.now(),
            ...entry
        });
        // Ordenar por tiempo ascendente (menor tiempo = mejor)
        lb.sort((a, b) => a.time - b.time);
        // Guardar solo los mejores 50
        const trimmed = lb.slice(0, 50);
        try {
            localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(trimmed));
        } catch (e) {
            console.error('Error guardando leaderboard:', e);
        }
    }

    static getCustomLists() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_LISTS);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    static saveCustomList(name, words) {
        const lists = this.getCustomLists();
        const newList = {
            id: 'custom_' + Date.now(),
            name,
            icon: '✏️',
            description: `Lista personalizada (${words.length} palabras)`,
            words
        };
        lists.push(newList);
        try {
            localStorage.setItem(STORAGE_KEYS.CUSTOM_LISTS, JSON.stringify(lists));
        } catch (e) {
            console.error('Error guardando lista personalizada:', e);
        }
        return newList;
    }
}
