document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // CARRUSEL AUTOMÁTICO PARA LA SECCIÓN DE BIENVENIDA
    // =============================================
    const heroSection = document.getElementById('inicio');
    // Pon aquí las rutas a tus imágenes de fondo
    const backgroundImages = [
        'url("img/fondoinicio1.jpg")',
        'url("img/fondoinicio2.jpg")',
        'url("img/fondoinicio3.jpg")'
    ];
    let currentImageIndex = 0;

    function changeBackgroundImage() {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        heroSection.style.backgroundImage = backgroundImages[currentImageIndex];
    }

    // Cambia la imagen de fondo cada 5 segundos (5000 milisegundos)
    setInterval(changeBackgroundImage, 5000);
    // Carga la primera imagen al iniciar
    heroSection.style.backgroundImage = backgroundImages[0];


    // =============================================
    // CARRUSEL MANUAL PARA "RECIÉN AGREGADO"
    // =============================================
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    function showSlide(index) {
        // Oculta todos los slides
        slides.forEach(slide => slide.classList.remove('active'));
        // Muestra el slide correcto
        slides[index].classList.add('active');
    }

    prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        showSlide(currentSlideIndex);
    });

    nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    });
    
    // Muestra el primer slide al cargar la página
    showSlide(currentSlideIndex);


    // =============================================================
    // TRANSICIÓN PARA "LO MEJOR DE LO MEJOR" AL HACER SCROLL
    // =============================================================
    const animatedItems = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: deja de observar el elemento una vez que es visible
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // La animación se dispara cuando el 10% del elemento es visible
    });

    animatedItems.forEach(item => {
        observer.observe(item);
    });

});