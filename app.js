const BRAND_NAME = "OutFormasi";
const OLD_BRAND_NAME = "Rilsult";

function replaceBrandText(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => {
    if (node.nodeValue.includes(OLD_BRAND_NAME)) {
      node.nodeValue = node.nodeValue.replaceAll(OLD_BRAND_NAME, BRAND_NAME);
    }
  });

  document.querySelectorAll("[aria-label]").forEach((element) => {
    element.setAttribute("aria-label", element.getAttribute("aria-label").replaceAll(OLD_BRAND_NAME, BRAND_NAME));
  });

  document.querySelectorAll(".brand-mark").forEach((mark) => {
    mark.textContent = "O";
  });

  document.querySelectorAll('meta[name="description"]').forEach((meta) => {
    meta.content = meta.content.replaceAll(OLD_BRAND_NAME, BRAND_NAME);
  });

  document.title = document.title.replaceAll(OLD_BRAND_NAME, BRAND_NAME);
}

replaceBrandText();

const compactNavHref = new URL("compact-nav.css", document.currentScript?.src || window.location.href).href;

if (!document.querySelector(`link[href="${compactNavHref}"]`)) {
  const compactNavStyles = document.createElement("link");
  compactNavStyles.rel = "stylesheet";
  compactNavStyles.href = compactNavHref;
  document.head.appendChild(compactNavStyles);
}

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
