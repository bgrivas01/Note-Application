const body = document.body;

const docs = Object.keys(localStorage)
    .filter(k => k.startsWith('doc_'))
    .map(k => JSON.parse(localStorage.getItem(k)));

const library = document.createElement('div');
library.className = 'library';

if (docs.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'No saved notes yet.';
    library.appendChild(empty);
} else {
    docs.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'card';

        
        let mediaHtml = '';
        if (doc.media && doc.media.type.startsWith('image/')) {
            mediaHtml = `<img src="${doc.media.dataUrl}" style="width:100%;max-height:160px;object-fit:cover;border-radius:4px;margin-bottom:6px;">`;
        } else if (doc.media) {
            const icon = doc.media.type === 'application/pdf' ? '📄' : '📝';
            mediaHtml = `<span style="font-size:13px;color:rgba(255,255,255,0.6);">${icon} ${doc.media.name}</span>`;
        }

        card.innerHTML = `
            <div class="card-header">
                <h2 class="card-title">${doc.title}</h2>
                <span class="card-date">${doc.savedAt}</span>
            </div>
            ${mediaHtml}
            <p class="card-preview">${doc.content}</p>
            <button class="delete-btn" data-title="${doc.title}">Delete</button>
        `;

        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn')) {
                window.location.href = `newFile.html?title=${encodeURIComponent(doc.title)}`;
            }
        });

        library.appendChild(card);
    });
}

document.querySelector('h1').insertAdjacentElement('afterend', library);

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const title = e.target.dataset.title;
        localStorage.removeItem(`doc_${title}`);
        e.target.closest('.card').remove();

        if (document.querySelectorAll('.card').length === 0) {
            library.innerHTML = '<p class="empty">No saved notes yet.</p>';
        }
    }
});