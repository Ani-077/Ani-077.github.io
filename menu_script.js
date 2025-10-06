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
                document.querySelector(`.menu-section[data-category="${category}"]`).classList.add('active-category');
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

    productItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.dataset.name;
            const description = item.dataset.description;
            const image = item.dataset.image;

            modalImage.src = image;
            modalName.textContent = name;
            modalDescription.textContent = description;
            
            modal.classList.add('active'); // Muestra el modal
        });
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.remove('active'); // Oculta el modal
    });

    // Cierra el modal si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });


    // =============================================
    // CARRUSEL DE REFRESCOS
    // =============================================
    const sodaCarousel = document.querySelector('.soda-carousel');
    const sodaSlides = document.querySelectorAll('.soda-slide');
    const prevSodaBtn = document.querySelector('.prev-soda');
    const nextSodaBtn = document.querySelector('.next-soda');
    
    let currentSodaIndex = 0;
    const slidesPerView = 3; // Cuántos slides mostrar a la vez en desktop
    const totalSlides = sodaSlides.length;

    // Ajusta slidesPerView para móviles
    function getSlidesPerView() {
        if (window.innerWidth <= 480) return 1; // 1 slide en pantallas muy pequeñas
        if (window.innerWidth <= 768) return 2; // 2 slides en tablets pequeñas
        return slidesPerView; // 3 slides en desktop
    }

    function updateCarouselPosition() {
        const view = getSlidesPerView();
        let offset;
        
        if (view === 1) { // Para 1 slide
            offset = -currentSodaIndex * 100;
        } else if (view === 2) { // Para 2 slides
             offset = -currentSodaIndex * (100 / view);
        } else { // Para 3 slides
            offset = -currentSodaIndex * (100 / view);
        }
        
        sodaCarousel.style.transform = `translateX(${offset}%)`;
    }

    prevSodaBtn.addEventListener('click', () => {
        const view = getSlidesPerView();
        currentSodaIndex = (currentSodaIndex - 1 + totalSlides); // Permite ir al final
        if (currentSodaIndex >= totalSlides - view + 1) { // Evita desbordamiento si vamos del inicio al final
             currentSodaIndex = totalSlides - view;
             if (currentSodaIndex < 0) currentSodaIndex = 0; // Asegura que no sea negativo
        }
        currentSodaIndex %= totalSlides;
        updateCarouselPosition();
    });

    nextSodaBtn.addEventListener('click', () => {
        const view = getSlidesPerView();
        currentSodaIndex = (currentSodaIndex + 1) % totalSlides;
        // Si llegamos al final y los slides restantes no llenan la vista, retrocedemos para mostrar el último grupo completo
        if (currentSodaIndex > totalSlides - view) {
            currentSodaIndex = 0; // Vuelve al inicio
        }
        updateCarouselPosition();
    });

    // Actualiza la posición del carrusel cuando la ventana cambia de tamaño
    window.addEventListener('resize', updateCarouselPosition);

    // Muestra la primera posición al cargar
    updateCarouselPosition();
});