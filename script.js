document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("settingsForm");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = "Please complete the required fields.";
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    console.log("Settings submitted:", data);
    status.textContent = "Settings saved successfully.";
  });
});