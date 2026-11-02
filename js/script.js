// Fungsi membuka undangan saat tombol diklik
function openInvitation() {
    var coverSection = document.getElementById("cover-section");
    
    if (coverSection) {
        coverSection.classList.add("opened");
    }

    // Panggil fungsi musik untuk play dari menit 3:41
    if (typeof playAudioOnOpen === 'function') {
        playAudioOnOpen();
    }

    // Refresh animasi AOS setelah efek transisi selesai
    setTimeout(function() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 500);
}

// Menangkap nama tamu dari parameter URL (contoh: ?to=NamaTamu)
document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var guestName = urlParams.get('to') || urlParams.get('n');
    var guestElement = document.getElementById("guest-name");

    if (guestName && guestElement) {
        guestElement.innerText = decodeURIComponent(guestName);
    }
});