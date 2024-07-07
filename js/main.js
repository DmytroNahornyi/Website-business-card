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
