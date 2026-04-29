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
        if (saved.media) showPreview(saved.media);
    }
}

// File attach
let attachedMedia = null;
document.getElementById('file-input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    document.getElementById('file-name').textContent = file.name;
    const reader = new FileReader();
    reader.onload = e => {
        attachedMedia = { name: file.name, type: file.type, dataUrl: e.target.result };
        showPreview(attachedMedia);
    };
    reader.readAsDataURL(file);
});

//download button (and preview in the new tab)
function showPreview(media) {
    const box = document.getElementById('media-preview');
    if (media.type.startsWith('image/')) {
        box.innerHTML = `
            <img src="${media.dataUrl}" style="max-height:150px;max-width:100%;border-radius:4px;margin-bottom:8px;cursor:pointer;" onclick="window.open('${media.dataUrl}')">
            <a href="${media.dataUrl}" download="${media.name}"><button type="button" style="font-size:13px;">⬇ Download</button></a>
        `;
    } else {
        const icon = media.type === 'application/pdf' ? 'icon1' : 'pdf2';
        box.innerHTML = `
            <span style="font-size:14px;" onclick="window.open('${media.dataUrl}')">${icon} ${media.name}</span>
            <a href="${media.dataUrl}" download="${media.name}"><button type="button" style="font-size:13px;margin-left:10px;">⬇ Download</button></a>
        `;    
    }
}

saveBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title) { alert('Please enter a title before saving.'); return; }
    if (!content) { alert('Please write something before saving.'); return; }

    const doc = { title, content, savedAt: new Date().toLocaleString(), media: attachedMedia };
    localStorage.setItem(`doc_${title}`, JSON.stringify(doc));
    alert(`"${title}" saved!`);
    window.location.href = 'homepage.html';
});
