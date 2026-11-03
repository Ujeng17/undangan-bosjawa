var bgMusic = document.getElementById("bgMusic");
var musicToggle = document.getElementById("musicToggle");

if (bgMusic) {
    bgMusic.addEventListener("play", function() {
        if (musicToggle) {
            musicToggle.classList.add("active");
        }
    });

    bgMusic.addEventListener("pause", function() {
        if (musicToggle) {
            musicToggle.classList.remove("active");
        }
    });
}

function requestAudioPlayback() {
    var playRequest = bgMusic.play();

    if (playRequest && typeof playRequest.catch === "function") {
        playRequest.catch(function(error) {
            console.warn("Musik gagal diputar:", error);
        });
    }
}

function seekToMusicStart() {
    if (!bgMusic || !Number.isFinite(bgMusic.duration)) return;

    bgMusic.currentTime = bgMusic.duration > 221 ? 221 : 0;
}

function playFromMusicStart() {
    if (!bgMusic) return;

    if (bgMusic.readyState >= 1) {
        seekToMusicStart();
    } else {
        bgMusic.addEventListener("loadedmetadata", seekToMusicStart, { once: true });
    }

    requestAudioPlayback();
}

function playAudioOnOpen() {
    if (bgMusic) {
        if (musicToggle) {
            musicToggle.classList.add("visible");
        }
        playFromMusicStart();
    }
}

function toggleAudio() {
    if (!bgMusic) return;

    if (bgMusic.paused) {
        if (musicToggle) {
            musicToggle.classList.add("visible");
        }
        if (bgMusic.currentTime === 0) {
            playFromMusicStart();
        } else {
            requestAudioPlayback();
        }
    } else {
        bgMusic.pause();
    }
}