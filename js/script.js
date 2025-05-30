const sideMenuJE = document.querySelector(".aside-JE");

const menuBtnJE = document.querySelector("#menu-btn-JE");
const closeBtnJE = document.querySelector("#close-btn-JE");

const themeTogglerJE = document.querySelector(".theme-toggler-JE")


// Muestra la barra lateral
menuBtnJE.addEventListener('click', () => {
  sideMenuJE.style.display = 'block';
});

// Cierra la barra lateral
closeBtnJE.addEventListener('click', () => {
  sideMenuJE.style.display = 'none';
});

// Modo claro / oscuro
themeTogglerJE.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables-JE')
  themeTogglerJE.querySelector('span:nth-child(1)').classList.toggle('active-JE');
  themeTogglerJE.querySelector('span:nth-child(2)').classList.toggle('active-JE');
})