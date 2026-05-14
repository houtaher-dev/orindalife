/**
 * غيّر رقم واتساب: كود الدولة بدون + ثم الرقم بدون صفر أول
 * مثال ليبيا: 218912345678
 */
const WHATSAPP_NUMBER = "218XXXXXXXXX";

function waUrl(text) {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

document.getElementById("year").textContent = new Date().getFullYear();

const general = document.getElementById("whatsapp-general");
if (general) {
  general.href = waUrl(general.dataset.msg || "مرحبا");
}

document.querySelectorAll(".product-order").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.product || "منتج";
    const price = btn.dataset.price || "";
    const msg = `السلام عليكم، أود طلب: ${name}${price ? ` — ${price}` : ""}`;
    window.open(waUrl(msg), "_blank", "noopener,noreferrer");
  });
});

const toggle = document.querySelector(".nav-toggle");
const mobile = document.getElementById("nav-menu");

if (toggle && mobile) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    mobile.hidden = open;
    toggle.setAttribute("aria-label", open ? "فتح القائمة" : "إغلاق القائمة");
  });

  mobile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobile.hidden = true;
    });
  });
}
