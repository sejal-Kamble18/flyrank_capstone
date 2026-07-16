document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('settingsForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Settings submitted:', data);
    alert('Settings saved!');
  });
});