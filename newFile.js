const saveBtn = document.getElementById('save-btn');
const titleInput = document.querySelector('.title-input');
const contentInput = document.querySelector('.content-input');

saveBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title) {
        alert('Please enter a title before saving.');
        return;
    }

    if (!content) {
        alert('Please write something before saving.');
        return;
    }

    const doc = {
        title,
        content,
        savedAt: new Date().toLocaleString()
    };

    localStorage.setItem(`doc_${title}`, JSON.stringify(doc));

    alert(`"${title}" saved!`);
});