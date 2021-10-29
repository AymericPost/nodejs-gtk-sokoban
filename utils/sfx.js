const alsa = require("node-wav-player");

module.exports = {
    step: () => {
        alsa.play({
            path: Math.round( Math.random() ) == 0 ? "./sfx/sfx_movement_footsteps1a.wav" : "./sfx/sfx_movement_footsteps1b.wav"
        });
    },
    wallHit: () => {
        alsa.play({ path: "./sfx/sfx_sounds_impact1.wav" })
    },
    targetReached: () => {
        alsa.play({ path: "./sfx/sfx_coin_double7.wav" });
    },
    nextLevel: () => {
        alsa.play({ path: "./sfx/sfx_sounds_interaction15.wav" });
    },
    reset: () => {
        alsa.play({ path: "./sfx/sfx_sounds_interaction1.wav" });
    }

}