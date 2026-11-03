// Membaca nama tamu dari URL parameter (?to=NamaTamu atau ?n=NamaTamu)
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get('to') || urlParams.get('n');
    const guestElement = document.getElementById("guest-name");

    if (guestName && guestElement) {
        guestName = decodeURIComponent(guestName.replace(/\+/g, ' '));
        guestElement.innerText = guestName;
    }
});

// Fungsi membuka undangan saat tombol diklik
function openInvitation() {
    var coverSection = document.getElementById("cover-section");
    
    if (coverSection) {
        coverSection.classList.add("opened");
    }

    // Panggil fungsi musik untuk play dari detik 221 (menit 3:41)
    if (typeof playAudioOnOpen === 'function') {
        playAudioOnOpen();
    }

    // Refresh animasi AOS setelah transisi
    setTimeout(function () {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 500);
}