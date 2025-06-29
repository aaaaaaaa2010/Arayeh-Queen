let currentLang = localStorage.getItem("selectedLanguage") || "fa";

function loadLanguage(lang) {
  fetch("lang.json")
    .then(res => res.json())
    .then(data => {
      const translations = data[lang];

      // ترجمهٔ المان‌های دارای data-i18n
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });

      // ابزارها رو از JSON لود کن
      const toolList = document.getElementById("tool-list");
      const toolContent = document.getElementById("tool-content");
      toolList.innerHTML = "";
      toolContent.textContent = "";

      if (translations.toolsList) {
        translations.toolsList.forEach(tool => {
          const button = document.createElement("button");
          button.className = "tool-button";
          button.textContent = tool.name;
          button.addEventListener("click", () => {
            toolContent.textContent = tool.description;
          });
          toolList.appendChild(button);
        });
      }
    });
}

window.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);

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

  document.querySelectorAll(".flag-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-lang");
      if (selected) {
        localStorage.setItem("selectedLanguage", selected);
      }
    });
  });

  document.getElementById("lang-save-btn").addEventListener("click", () => {
    langPopup.classList.remove("show");
    setTimeout(() => langPopup.classList.add("hidden"), 300);
    const savedLang = localStorage.getItem("selectedLanguage") || "fa";
    loadLanguage(savedLang);
  });

  document.getElementById("home-link").addEventListener("click", e => {
    e.preventDefault();
    alert("فعلاً تو صفحه خانه هستی 🏠");
  });

  document.getElementById("tools-link").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("tool-list").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("about-link").addEventListener("click", e => {
    e.preventDefault();
    alert("بخش درباره ما به‌زودی اضافه می‌شه 💬");
  });

  document.getElementById("start-btn").addEventListener("click", () => {
    alert("آزمایش رایگان هنوز فعال نشده 😅 ولی تو اولین نفری هستی که دعوت می‌شی!");
  });

  document.getElementById("ai-btn").addEventListener("click", () => {
    alert("در حال اتصال به هوش مصنوعی... آماده‌باش برای جادو! 🤖✨");
  });
});
