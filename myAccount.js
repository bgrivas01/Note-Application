document.getElementById('change-btn').addEventListener('click', async () => {
    const identifier = document.getElementById('identifier').value.trim();
    const current    = document.getElementById('current').value.trim();
    const newpw      = document.getElementById('newpw').value.trim();
    const confirm    = document.getElementById('confirm').value.trim();
    const msg        = document.getElementById('msg');

    if (!identifier || !current || !newpw || !confirm) { msg.textContent = 'Please fill in all fields.'; return; }
    if (newpw !== confirm) { msg.textContent = 'New passwords do not match.'; return; }

    try {
        const res  = await fetch('http://localhost:5000/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, current_password: current, new_password: newpw })
        });
        const data = await res.json();
        msg.textContent  = data.status === 'success' ? 'Password changed!' : data.message;
        msg.style.color  = data.status === 'success' ? 'green' : 'red';
    } catch {
        msg.textContent = 'Could not connect to server.';
        msg.style.color = 'red';
    }
});
