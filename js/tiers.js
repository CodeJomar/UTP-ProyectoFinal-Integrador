document.addEventListener('DOMContentLoaded', function () {
  // Toggle de facturación anual/mensual
  const billingToggle = document.getElementById('billingToggle');
  const amounts = document.querySelectorAll('.amount-JE');
  const periods = document.querySelectorAll('.period-JE');

  billingToggle.addEventListener('change', function () {
    const isYearly = this.checked;

    amounts.forEach(amount => {
      const monthly = amount.getAttribute('data-monthly');
      const yearly = amount.getAttribute('data-yearly');
      amount.textContent = isYearly ? yearly : monthly;
    });

    periods.forEach(period => {
      period.textContent = isYearly ? '/año' : '/mes';
    });
  });

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question-JE');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement;
      const answer = faqItem.querySelector('.faq-answer-JE');
      const icon = this.querySelector('.material-icons-sharp');

      // Toggle active class
      faqItem.classList.toggle('active-JE');

      // Toggle icon
      if (faqItem.classList.contains('active-JE')) {
        icon.textContent = 'expand_less';
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        icon.textContent = 'expand_more';
        answer.style.maxHeight = '0';
      }
    });
  });

  // Botones de actualización
  const upgradeButtons = document.querySelectorAll('.upgrade-button-JE, .upgrade-cta-JE');

  upgradeButtons.forEach(button => {
    button.addEventListener('click', function () {
      alert('Redirigiendo al proceso de actualización...');
    });
  });

  // Botón de contacto
  const contactButton = document.querySelector('.contact-button-JE');
  if (contactButton) {
    contactButton.addEventListener('click', function () {
      alert('Redirigiendo al formulario de contacto...');
    });
  }
});