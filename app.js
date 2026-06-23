const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#navLinks");
const form = document.querySelector("#waitlistForm");
const emailInput = document.querySelector("#emailInput");
const formNote = document.querySelector("#formNote");

navToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    formNote.textContent = "Masukkan email terlebih dahulu.";
    return;
  }

  localStorage.setItem("outformasi_waitlist_email", email);
  formNote.textContent = "Terima kasih! Email demo tersimpan di browser. Sambungkan ke backend nanti untuk produksi.";
  form.reset();
});
