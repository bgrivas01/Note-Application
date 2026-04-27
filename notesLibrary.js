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

        card.innerHTML = `
            <div class="card-header">
                <h2 class="card-title">${doc.title}</h2>
                <span class="card-date">${doc.savedAt}</span>
            </div>
            <p class="card-preview">${doc.content}</p>
            <button class="delete-btn" data-title="${doc.title}">Delete</button>
        `;

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