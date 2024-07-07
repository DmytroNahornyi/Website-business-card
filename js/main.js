document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const messageText = document.getElementById("messageText");
  const submitButton = form.querySelector('button[type="submit"]');
  const messageError = document.getElementById("messageError");
  let hasStartedTyping = false;

  function validateMessageLength() {
    const minLength = 10;
    const currentLength = messageText.value.length;

    if (currentLength > 0) {
      hasStartedTyping = true;
    }

    if (currentLength >= minLength) {
      submitButton.disabled = false;
      messageError.style.display = "none";
      messageText.setCustomValidity("");
    } else if (hasStartedTyping) {
      submitButton.disabled = true;
      messageError.style.display = "block";
      messageError.textContent = `Будь ласка, введіть ще ${
        minLength - currentLength
      } символів`;
      messageText.setCustomValidity(
        "Повідомлення повинно містити щонайменше 10 символів"
      );
    } else {
      submitButton.disabled = true;
      messageError.style.display = "none";
      messageText.setCustomValidity("");
    }
  }

  messageText.addEventListener("input", validateMessageLength);

  form.addEventListener("submit", function (e) {
    if (messageText.value.length < 10) {
      e.preventDefault();
      messageError.style.display = "block";
      messageError.textContent =
        "Повідомлення повинно містити щонайменше 10 символів";
    }
  });

  // Начальное состояние: кнопка неактивна, сообщение об ошибке скрыто
  submitButton.disabled = true;
  messageError.style.display = "none";

  // Новый код для плавной прокрутки
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // Продолжительность анимации в миллисекундах
        let start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percentage = Math.min(progress / duration, 1);

          window.scrollTo(
            0,
            startPosition + distance * easeInOutCubic(percentage)
          );

          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        }

        function easeInOutCubic(t) {
          return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        window.requestAnimationFrame(step);
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // ... (весь предыдущий код остается без изменений) ...

  // Добавляем новый код для мультиязычности
  const translations = {
    uk: {
      pageTitle: "Оцифрування відеокасет",
      home: "Головна",
      services: "Послуги",
      about: "Про нас",
      contact: "Контакти",
      mainTitle: "Оцифрування відео",
      mainSubtitle: "Збережіть ваші спогади у цифровому форматі",
      mainDescription:
        "Ласкаво просимо до нашого сервісу оцифрування відео. Ми допоможемо вам зберегти ваші дорогоцінні моменти у високій якості для майбутніх поколінь.",
      contactTitle: "Зв'яжіться з нами",
      namePlaceholder: "Ваше ім'я",
      emailPlaceholder: "Ваш email",
      messagePlaceholder: "Ваше повідомлення",
      submitButton: "Надіслати",
      contactDescription:
        "Ми завжди раді відповісти на ваші запитання та допомогти вам зберегти ваші спогади. Не соромтеся зв'язатися з нами в будь-який час!",
      footerText: "© 2024 Оцифрування відео. Усі права захищені.",
      errorMessage: "Повідомлення повинно містити щонайменше 10 символів",
      errorMessagePart1: "Будь ласка, введіть ще ",
      errorMessagePart2: " символів",
      servicesTitle: "Послуги",
      servicesDescription:
        "Ми пропонуємо широкий спектр послуг з оцифрування відео. Наші експерти використовують найсучасніше обладнання для забезпечення найвищої якості.",
      aboutTitle: "Про нас",
      aboutDescription:
        "Наша команда складається з досвідчених фахівців, які пристрасно ставляться до збереження ваших спогадів. Ми працюємо в цій галузі вже багато років і постійно вдосконалюємо наші методи.",
    },
    en: {
      pageTitle: "Video Digitization",
      home: "Home",
      services: "Services",
      about: "About",
      contact: "Contact",
      mainTitle: "Video Digitization",
      mainSubtitle: "Preserve your memories in digital format",
      mainDescription:
        "Welcome to our video digitization service. We will help you preserve your precious moments in high quality for future generations.",
      contactTitle: "Contact Us",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Your message",
      submitButton: "Send",
      contactDescription:
        "We are always happy to answer your questions and help you preserve your memories. Don't hesitate to contact us at any time!",
      footerText: "© 2024 Video Digitization. All rights reserved.",
      errorMessage: "The message must contain at least 10 characters",
      errorMessagePart1: "Please enter ",
      errorMessagePart2: " more characters",
      servicesTitle: "Services",
      servicesDescription:
        "We offer a wide range of video digitization services. Our experts use state-of-the-art equipment to ensure the highest quality.",
      aboutTitle: "About Us",
      aboutDescription:
        "Our team consists of experienced professionals who are passionate about preserving your memories. We have been working in this field for many years and are constantly improving our methods.",
    },
  };

  function updateLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[lang][key]) {
        if (element.placeholder !== undefined) {
          element.placeholder = translations[lang][key];
        } else {
          element.textContent = translations[lang][key];
        }
      }
    });

    // Обновляем текст ошибки
    messageError.textContent = translations[lang].errorMessage;
  }

  const languageSelect = document.querySelector(".language-select");
  languageSelect.addEventListener("change", (event) => {
    updateLanguage(event.target.value);
  });

  // Изменяем функцию validateMessageLength для поддержки мультиязычности
  function validateMessageLength() {
    const minLength = 10;
    const currentLength = messageText.value.length;
    const currentLang = document.documentElement.lang;

    if (currentLength > 0) {
      hasStartedTyping = true;
    }

    if (currentLength >= minLength) {
      submitButton.disabled = false;
      messageError.style.display = "none";
      messageText.setCustomValidity("");
    } else if (hasStartedTyping) {
      submitButton.disabled = true;
      messageError.style.display = "block";
      messageError.textContent = `${
        translations[currentLang].errorMessagePart1
      }${minLength - currentLength}${
        translations[currentLang].errorMessagePart2
      }`;
      messageText.setCustomValidity(translations[currentLang].errorMessage);
    } else {
      submitButton.disabled = true;
      messageError.style.display = "none";
      messageText.setCustomValidity("");
    }
  }

  // Инициализация языка при загрузке страницы
  updateLanguage("uk");
});
