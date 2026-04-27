const saveBtn = document.getElementById('save-btn');
const titleInput = document.querySelector('.title-input');
const contentInput = document.querySelector('.content-input');

// Load note if opened from search
const params = new URLSearchParams(window.location.search);
const loadTitle = params.get('title');
if (loadTitle) {
    const saved = JSON.parse(localStorage.getItem(`doc_${loadTitle}`));
    if (saved) {
        titleInput.value = saved.title;
        contentInput.value = saved.content;
    }
}

saveBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title) { alert('Please enter a title before saving.'); return; }
    if (!content) { alert('Please write something before saving.'); return; }

    const doc = { title, content, savedAt: new Date().toLocaleString() };
    localStorage.setItem(`doc_${title}`, JSON.stringify(doc));
    alert(`"${title}" saved!`);
});