const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('button');
const resultsContainer = document.createElement('div');
resultsContainer.className = 'results';
document.body.appendChild(resultsContainer);

function getDocs() {
    return Object.keys(localStorage)
        .filter(k => k.startsWith('doc_'))
        .map(k => JSON.parse(localStorage.getItem(k)));
}

function renderResults(docs) {
    resultsContainer.innerHTML = '';

    if (docs.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No notes found.</p>';
        return;
    }

    docs.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <div class="result-header">
                <h2 class="result-title">${doc.title}</h2>
                <span class="result-date">${doc.savedAt}</span>
            </div>
            <p class="result-preview">${doc.content}</p>
        `;

        card.addEventListener('click', () => {
            window.location.href = `newFile.html?title=${encodeURIComponent(doc.title)}`;
        });

        resultsContainer.appendChild(card);
    });
}

function search() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        resultsContainer.innerHTML = '';
        return;
    }

    const matches = getDocs().filter(doc =>
        doc.title.toLowerCase().includes(query) ||
        doc.content.toLowerCase().includes(query)
    );

    renderResults(matches);
}

searchBtn.addEventListener('click', search);
searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') search();
});