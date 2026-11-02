function addWish() {
    const name = document.getElementById('wish-name').value;
    const msg = document.getElementById('wish-message').value;

    if (name.trim() !== '' && msg.trim() !== '') {
        const wishesContainer = document.getElementById('wishesContainer');
        const newWish = document.createElement('div');
        newWish.className = 'wish-item';
        newWish.innerHTML = `<h5>${escapeHtml(name)}</h5><p>${escapeHtml(msg)}</p>`;
        wishesContainer.prepend(newWish);

        document.getElementById('wish-name').value = '';
        document.getElementById('wish-message').value = '';
    } else {
        alert('Silakan isi nama dan ucapan Anda terlebih dahulu.');
    }
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}