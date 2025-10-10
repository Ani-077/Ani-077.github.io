// Pega esto en tu menu_script.js, reemplazando la sección de los botones

// =============================================
// FUNCIONALIDAD DE LAS PESTAÑAS DEL MENÚ
// =============================================
console.log("Script cargado. Buscando botones..."); // <-- MENSAJE DE PRUEBA 1

const categoryButtons = document.querySelectorAll('.category-btn');
const menuSections = document.querySelectorAll('.menu-section');

console.log(`Encontrados ${categoryButtons.length} botones y ${menuSections.length} secciones.`); // <-- MENSAJE DE PRUEBA 2

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        console.log(`Botón clickeado: ${button.dataset.category}`); // <-- MENSAJE DE PRUEBA 3

        // Elimina la clase 'active' de todos los botones y secciones
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        menuSections.forEach(section => section.classList.remove('active-category'));

        // Añade la clase 'active' al botón clicado
        button.classList.add('active');

        // Muestra la sección correspondiente
        const category = button.dataset.category;
        if (category === 'all') {
            menuSections.forEach(section => section.classList.add('active-category'));
        } else {
            const sectionToShow = document.querySelector(`.menu-section[data-category="${category}"]`);
            if (sectionToShow) {
                sectionToShow.classList.add('active-category');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // FUNCIONALIDAD DE LAS PESTAÑAS DEL MENÚ
    // =============================================
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Elimina la clase 'active' de todos los botones y secciones
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            menuSections.forEach(section => section.classList.remove('active-category'));

            // Añade la clase 'active' al botón clicado
            button.classList.add('active');

            // Muestra la sección correspondiente
            const category = button.dataset.category;
            if (category === 'all') {
                menuSections.forEach(section => section.classList.add('active-category'));
            } else {
                // Buscamos la sección que tenga el data-category correspondiente
                const sectionToShow = document.querySelector(`.menu-section[data-category="${category}"]`);
                if (sectionToShow) {
                    sectionToShow.classList.add('active-category');
                }
            }
        });
    });

    // =============================================
    // FUNCIONALIDAD DEL MODAL (POP-UP) DEL PRODUCTO
    // =============================================
    const productItems = document.querySelectorAll('.product-item');
    const modal = document.getElementById('product-modal');
    const closeModalButton = document.querySelector('.close-button');
    const modalImage = document.getElementById('modal-image');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');

    if (modal) { // Solo si el modal existe
        productItems.forEach(item => {
            item.addEventListener('click', () => {
                modalImage.src = item.dataset.image;
                modalName.textContent = item.dataset.name;
                modalDescription.textContent = item.dataset.description;
                modal.classList.add('active');
            });
        });

        closeModalButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Pega este nuevo bloque en tu menu_script.js

// ==========================================================
// LÓGICA PARA ACTIVAR CATEGORÍA DESDE UN ENLACE EXTERNO
// ==========================================================
function activateCategoryFromURL() {
    const hash = window.location.hash; // Obtiene el # de la URL, ej: #tacos-menu
    
    // Si hay un hash en la URL...
    if (hash) {
        // Convierte '#tacos-menu' en 'tacos'
        const category = hash.replace('#', '').replace('-menu', '');
        
        // Busca el botón que corresponde a esa categoría
        const targetButton = document.querySelector(`.category-btn[data-category="${category}"]`);
        
        // Si encuentra el botón, simula un clic en él
        if (targetButton) {
            targetButton.click();
        }
    }
}

// Ejecuta la función justo cuando la página ha cargado
activateCategoryFromURL();

    // =================================================================
    // FUNCIÓN GENÉRICA PARA INICIALIZAR UN CARRUSEL
    // =================================================================
    function setupCarousel(containerSelector) {
        const carouselContainer = document.querySelector(containerSelector);
        
        // Si el contenedor de este carrusel no existe, no hacemos nada
        if (!carouselContainer) {
            return;
        }

        const carousel = carouselContainer.querySelector('.soda-carousel, .salsas-carousel');
        const slides = carousel.querySelectorAll('.soda-slide');
        const prevBtn = carouselContainer.querySelector('.prev-soda, .prev-salsa');
        const nextBtn = carouselContainer.querySelector('.next-soda, .next-salsa');

        if (slides.length === 0) {
            return;
        }

        let currentIndex = 0;
        const totalSlides = slides.length;

        function updatePosition() {
            const slideWidth = slides[0].offsetWidth;
            const slideMargin = parseInt(window.getComputedStyle(slides[0]).marginRight);
            const moveDistance = (slideWidth + (slideMargin * 2)) * currentIndex;
            carousel.style.transform = `translateX(-${moveDistance}px)`;
        }

        nextBtn.addEventListener('click', () => {
            const slidesInView = Math.floor(carousel.parentElement.offsetWidth / slides[0].offsetWidth);
            if (currentIndex >= totalSlides - slidesInView) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updatePosition();
        });

        prevBtn.addEventListener('click', () => {
            const slidesInView = Math.floor(carousel.parentElement.offsetWidth / slides[0].offsetWidth);
            if (currentIndex <= 0) {
                currentIndex = totalSlides - slidesInView;
                if (currentIndex < 0) currentIndex = 0; // Evita error si hay menos slides que los visibles
            } else {
                currentIndex--;
            }
            updatePosition();
        });

        window.addEventListener('resize', () => {
            currentIndex = 0;
            updatePosition();
        });

        // Inicializa la posición al cargar
        updatePosition();
    }

    // =============================================
    // INICIALIZAMOS LOS DOS CARRUSELES
    // =============================================
    setupCarousel('.soda-carousel-container');
    setupCarousel('.salsas-carousel-container');

});