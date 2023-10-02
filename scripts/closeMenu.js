
document.addEventListener('click', function (event) {
    const navbarContent = document.getElementById('navbarSupportedContent');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Verificar si el clic fue fuera del menú y fuera del botón hamburguesa
    const isOutsideMenu = !navbarContent.contains(event.target) && !navbarToggler.contains(event.target);

    if (isOutsideMenu || event.target.closest('.navbar-nav')) {
      const isNavbarOpen = navbarContent.classList.contains('show');
      if (isNavbarOpen) {
        // Si el menú está abierto, ciérralo
        navbarToggler.click();
      }
    }
  });