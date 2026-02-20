
//Codigo Nav Hamburguesa //
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        if(navMenu.classList.contains("active")){
            menuBtn.innerHTML= "✕";
            menuBtn.setAttribute("aria-expanded", "true");
        }
        else {
            menuBtn.innerHTML = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        }
    });
}
//fin//

// Accordion: permitir sólo un detalle abierto y desplazar en móvil
const accordionDetails = document.querySelectorAll('.accordion-list details');
accordionDetails.forEach(detail => {
    detail.addEventListener('toggle', () => {
        if (detail.open) {
            accordionDetails.forEach(d => { if (d !== detail) d.open = false; });
            if (window.innerWidth <= 900) detail.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    });
});

// Submenu: toggle en móvil y cerrar al hacer clic fuera
// reuse existing `navMenu` variable (no redeclaration)
const submenuParents = document.querySelectorAll('.nav-menu li');
submenuParents.forEach(li => {
    const submenu = li.querySelector('.links-down');
    const link = li.querySelector('a, .menu-link');
    if (submenu && link) {
        // accesibilidad
        link.setAttribute('aria-haspopup', 'true');
        link.setAttribute('aria-expanded', 'false');

        // Si el padre es `.menu-link` (no navegable), añadir soporte de teclado y prevenir clic que navegue
        if (link.classList && link.classList.contains('menu-link')) {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const isOpen = li.classList.toggle('open');
                    link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                }
            });
            link.addEventListener('click', (e) => { e.preventDefault(); });
        }

        // Toggle por clic en móvil: ahora usamos un botón dedicado `.submenu-toggle` para que el link del padre siga navegable
        const toggleBtn = li.querySelector('.submenu-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isOpen = li.classList.toggle('open');
                toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
        }

        // Mejora: abrir en desktop y evitar que se cierre instantáneamente cuando el cursor pasa entre el link y el submenu
        let hideTimeout = null;
        li.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                clearTimeout(hideTimeout);
                li.classList.add('open-desktop');
                const link = li.querySelector('a, .menu-link'); if (link) link.setAttribute('aria-expanded', 'true');
            }
        });
        li.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                // pequeño retraso para permitir mover el cursor al submenu
                hideTimeout = setTimeout(() => {
                    li.classList.remove('open-desktop');
                    const link = li.querySelector('a, .menu-link'); if (link) link.setAttribute('aria-expanded', 'false');
                }, 230);
            }
        });

    }
});

// Cerrar cualquier submenu desktop abierto al hacer clic fuera
document.addEventListener('click', (e) => {
    if (window.innerWidth > 768) {
        if (!e.target.closest('.nav-menu')) {
            document.querySelectorAll('.nav-menu li.open-desktop').forEach(li => {
                li.classList.remove('open-desktop');
                const link = li.querySelector('a, .menu-link'); if (link) link.setAttribute('aria-expanded', 'false');
            });
        }
    }
});

// eliminar estados open-desktop al cambiar a móvil
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.nav-menu li.open-desktop').forEach(li => {
            li.classList.remove('open-desktop');
            const link = li.querySelector('a, .menu-link'); if (link) link.setAttribute('aria-expanded', 'false');
        });
    }
});

// cerrar submenus al hacer clic fuera (en móvil)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.nav-menu')) {
            document.querySelectorAll('.nav-menu li.open').forEach(li => {
                li.classList.remove('open');
                const link = li.querySelector('a, .menu-link'); if (link) link.setAttribute('aria-expanded', 'false');
            });
        }
    }
});

// limpiar estados al cambiar a desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.nav-menu li.open').forEach(li => {
            li.classList.remove('open');
            const link = li.querySelector('a, .menu-link'); if (link) link.setAttribute('aria-expanded', 'false');
        });
    }
});

// FIN //


// PARA INFORMACIÓN DE CURSOS //
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.submit-btn');
        if (!btn) return;

        const originalText = btn.textContent;

        btn.textContent = 'Enviando...';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        setTimeout(() => {
            btn.textContent = '✓ Enviado Correctamente';

            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
            }, 1000);
        }, 1500);
    });

    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            if (input.parentElement && input.parentElement.style) {
                input.parentElement.style.transform = 'translateX(2px)';
            }
        });

        input.addEventListener('blur', () => {
            if (input.parentElement && input.parentElement.style) {
                input.parentElement.style.transform = 'translateX(0)';
            }
        });
    });
}


