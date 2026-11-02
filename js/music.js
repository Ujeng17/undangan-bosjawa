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

// Memutar lagu persis mulai menit 3:41 (detik 221)
function playAudioOnOpen() {
    if (bgMusic) {
        if (musicToggle) {
            musicToggle.classList.add("visible");
        }
        bgMusic.currentTime = 221; // Melompat ke menit 03:41 (3 * 60 + 41)
        requestAudioPlayback();
    }
}

function toggleAudio() {
    if (!bgMusic) return;

    if (bgMusic.paused) {
        if (bgMusic.currentTime === 0) {
            bgMusic.currentTime = 221;
        }
        requestAudioPlayback();
    } else {
        bgMusic.pause();
        if (musicToggle) {
            musicToggle.classList.add("visible");
        }
    }
}