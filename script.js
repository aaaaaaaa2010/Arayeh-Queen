let currentLang = localStorage.getItem("selectedLanguage") || "fa";

function loadLanguage(lang) {
  fetch("lang.json")
    .then(res => res.json())
    .then(data => {
      const translations = data[lang];
      if (!translations) return;

      // ترجمهٔ المان‌هایی که data-i18n دارن
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });

      // فقط اگه ابزارها وجود داشتن
      const toolList = document.getElementById("tool-list");
      const toolContent = document.getElementById("tool-content");

      if (toolList && toolContent && translations.toolsList) {
        toolList.innerHTML = "";
        toolContent.textContent = "";

        translations.toolsList.forEach((tool, index) => {
          const button = document.createElement("button");
          button.className = "tool-button";
          button.textContent = tool.name;
          button.addEventListener("click", () => {
            toolContent.textContent = tool.description;
          });
          toolList.appendChild(button);
          if (index === 0) button.click(); // پیش‌فرض ابزار اول رو نشون بده
        });
      }
    })
    .catch(err => console.error("خطا در لود ترجمه:", err));
}

window.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);

  const langBtn = document.getElementById("lang-btn");
  const langPopup = document.getElementById("lang-popup");

  if (langBtn && langPopup) {
    langBtn.addEventListener("click", () => {
      langPopup.classList.remove("hidden");
      setTimeout(() => langPopup.classList.add("show"), 10);
    });

    document.getElementById("lang-close-btn")?.addEventListener("click", () => {
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

    document.getElementById("lang-save-btn")?.addEventListener("click", () => {
      langPopup.classList.remove("show");
      setTimeout(() => langPopup.classList.add("hidden"), 300);
      const savedLang = localStorage.getItem("selectedLanguage") || "fa";
      currentLang = savedLang;
      loadLanguage(currentLang);
    });
  }

  document.getElementById("home-link")?.addEventListener("click", e => {
    e.preventDefault();
    alert("فعلاً تو صفحه خانه هستی 🏠");
  });

  document.getElementById("tools-link")?.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("tool-list")?.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("about-link")?.addEventListener("click", e => {
    e.preventDefault();
    window.location.href = "about.html";
  });

  document.getElementById("start-btn")?.addEventListener("click", () => {
    alert("آزمایش رایگان هنوز فعال نشده 😅 ولی تو اولین نفری هستی که دعوت می‌شی!");
  });

  document.getElementById("ai-btn")?.addEventListener("click", () => {
    alert("در حال اتصال به هوش مصنوعی... آماده‌باش برای جادو! 🤖✨");
  });
 
  // اگر صفحه dream.html بود، ترجمه‌های اختصاصی ابزارها رو از lang-dream.json بگیر
if (window.location.pathname.includes("dream.html")) {
  const dreamLang = localStorage.getItem("selectedLanguage") || "fa";

  fetch("lang-dream.json")
    .then(res => res.json())
    .then(data => {
      const t = data[dreamLang] || data["fa"];

      // اعمال ترجمه‌ها به بخش‌های خاص این صفحه
      document.querySelector("h1")?.innerText = t.toolTitle;
      document.querySelector("section > p")?.innerText = t.toolSubtitle;
      document.querySelector("section > p:nth-of-type(2)")?.innerText = t.trialTime;

      const cards = document.querySelectorAll(".tool-card");
      if (cards.length >= 3) {
        cards[0].querySelector("h2").innerText = t.mindMapTitle;
        cards[0].querySelector("p").innerText = t.mindMapDesc;
        cards[0].querySelector("button").innerText = t.mindMapButton;

        cards[1].querySelector("h2").innerText = t.noiseFilterTitle;
        cards[1].querySelector("p").innerText = t.noiseFilterDesc;
        cards[1].querySelector("button").innerText = t.noiseFilterButton;

        cards[2].querySelector("h2").innerText = t.aiConnectorTitle;
        cards[2].querySelector("p").innerText = t.aiConnectorDesc;
        cards[2].querySelector("button").innerText = t.aiConnectorButton;
      }
    })
    .catch(err => {
      console.error("خطا در بارگذاری ترجمه‌های dream:", err);
    });
  }); 

