let currentLang = localStorage.getItem("selectedLanguage") || "fa";

// 📦 داده ابزارها
const tools = [
  {
    name: "مدیریت پروژه",
    description: "این ابزار بهت کمک می‌کنه پروژه‌هاتو ساختاریافته و مرحله‌به‌مرحله پیش ببری."
  },
  {
    name: "مولد ایده",
    description: "با استفاده از الگوریتم‌های خلاق، بهت ایده‌های نو برای کسب‌وکار یا محتوا می‌ده."
  },
  {
    name: "بررسی متن",
    description: "متن‌هاتو از نظر نگارشی، لحن یا حرفه‌ای بودن بررسی می‌کنه."
  }
];

// 🧠 تابع لود ترجمه
function loadLanguage(lang) {
  fetch("lang.json")
    .then(res => res.json())
    .then(data => {
      const translations = data[lang];
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
    });
}

// 📌 پس از بارگذاری صفحه:
window.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);

  // باز و بسته‌کردن منوی زبان
  const langBtn = document.getElementById("lang-btn"); 
  const langPopup = document.getElementById("lang-popup");
  langBtn.addEventListener("click", () => {
    langPopup.classList.remove("hidden");
    setTimeout(() => langPopup.classList.add("show"), 10);
  });
  document.getElementById("lang-close-btn").addEventListener("click", () => {
    langPopup.classList.remove("show");
    setTimeout(() => langPopup.classList.add("hidden"), 300);
  });

  // انتخاب زبان
  document.querySelectorAll(".flag-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-lang");
      if (selected) {
        localStorage.setItem("selectedLanguage", selected);
        loadLanguage(selected);
      }
    });
  });

  document.getElementById("lang-save-btn").addEventListener("click", () => {
    langPopup.classList.remove("show");
    setTimeout(() => langPopup.classList.add("hidden"), 300);
  });

  // دکمه‌های ابزار
  const toolList = document.getElementById("tool-list");
  const toolContent = document.getElementById("tool-content");
  tools.forEach(tool => {
    const button = document.createElement("button");
    button.className = "tool-button";
    button.textContent = tool.name;
    button.addEventListener("click", () => {
      toolContent.textContent = tool.description;
    });
    toolList.appendChild(button);
  });

  // دکمه ناوبری
  document.getElementById("home-link").addEventListener("click", e => {
    e.preventDefault();
    alert("فعلاً تو صفحه خانه هستی 🏠");
  });
  document.getElementById("tools-link").addEventListener("click", e => {
    e.preventDefault();
    toolList.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("about-link").addEventListener("click", e => {
    e.preventDefault();
    alert("بخش درباره ما به‌زودی اضافه می‌شه 💬");
  });

  // دکمه‌های تعامل
  document.getElementById("start-btn").addEventListener("click", () => {
    alert("آزمایش رایگان هنوز فعال نشده 😅 ولی تو اولین نفری هستی که دعوت می‌شی!");
  });
  document.getElementById("ai-btn").addEventListener("click", () => {
    alert("در حال اتصال به هوش مصنوعی... آماده‌باش برای جادو! 🤖✨");
  });
});