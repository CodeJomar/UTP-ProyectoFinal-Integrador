document.addEventListener('DOMContentLoaded', function () {
  const tabItems = document.querySelectorAll('.tab-item-JE');
  const tabPanes = document.querySelectorAll('.tab-pane-JE');

  tabItems.forEach(item => {
    item.addEventListener('click', function () {
      // Remover clase activa de todas las pestañas
      tabItems.forEach(tab => tab.classList.remove('active-tab-JE'));
      tabPanes.forEach(pane => pane.classList.remove('active-pane-JE'));

      // Añadir clase activa a la pestaña seleccionada
      this.classList.add('active-tab-JE');

      // Mostrar el contenido correspondiente
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active-pane-JE');
    });
  });

  // Toggle password visibility
  const togglePasswordButtons = document.querySelectorAll('.toggle-password-JE');
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function () {
      const input = this.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        this.textContent = 'visibility';
      } else {
        input.type = 'password';
        this.textContent = 'visibility_off';
      }
    });
  });
});