// Animación simple de dropdown: el botón nunca desaparece
function toggleDropdown() {
  const menu = document.getElementById('dropdown-menu');
  menu.classList.toggle('open');
}

// Cerrar el menú si se hace clic fuera
document.addEventListener('click', function(e) {
  const btn = document.getElementById('options-btn');
  const menu = document.getElementById('dropdown-menu');
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('open');
  }
});