// js/estilojs.js

document.addEventListener("DOMContentLoaded", function () {
    
    // =================================================
    // 1. LOGICA CARRUSEL BIENVENIDA (INICIO)
    // =================================================
    const heroSection = document.querySelector('.hero-section'); 
    if (heroSection) {
        const images = [
            'url("img/fondoinicio1.jpg")',
            'url("img/fondoinicio2.jpg")',
            'url("img/fondoinicio3.jpg")'
        ];
        let currentBgIndex = 0;
        
        setInterval(() => {
            currentBgIndex = (currentBgIndex + 1) % images.length;
            heroSection.style.backgroundImage = images[currentBgIndex];
        }, 5000);
    }

    // =================================================
    // 2. LÓGICA DE FILTROS DEL MENÚ
    // =================================================
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');

            menuSections.forEach(section => {
                if (category === 'all' || section.getAttribute('data-category') === category) {
                    section.classList.add('active-category');
                } else {
                    section.classList.remove('active-category');
                }
            });
        });
    });

    // =================================================
    // 3. LÓGICA DEL MODAL
    // =================================================
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            const target = button.closest('.product-item') || button;
            
            const name = target.getAttribute('data-name');
            const description = target.getAttribute('data-description');
            const image = target.getAttribute('data-image');

            if (name) productModal.querySelector('#modal-name').textContent = name;
            if (description) productModal.querySelector('#modal-description').textContent = description;
            if (image) productModal.querySelector('#modal-image').src = image;
        });
    }

    // =================================================
    // 4. CARRUSELES AUTOMÁTICOS (BEBIDAS Y SALSAS)
    // =================================================
    function initCustomCarousel(carouselId) {
        const carouselRoot = document.getElementById(carouselId);
        if (!carouselRoot) return;

        const track = carouselRoot.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carouselRoot.querySelector('.next-arrow');
        const prevButton = carouselRoot.querySelector('.prev-arrow');
        
        let itemsPerView = window.innerWidth <= 768 ? 1 : 3;
        let currentIndex = 0;
        const totalSlides = slides.length;
        const maxIndex = Math.ceil(totalSlides / itemsPerView) - 1;
        let autoplayInterval;

        const moveToSlide = (index) => {
            if (index < 0) index = maxIndex;
            else if (index > maxIndex) index = 0;
            
            currentIndex = index;
            const movePercentage = currentIndex * -100;
            track.style.transform = `translateX(${movePercentage}%)`;
        };

        nextButton.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
            resetAutoplay();
        });

        prevButton.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
            resetAutoplay();
        });

        const startAutoplay = () => {
            autoplayInterval = setInterval(() => {
                moveToSlide(currentIndex + 1);
            }, 10000); 
        };

        const stopAutoplay = () => clearInterval(autoplayInterval);
        const resetAutoplay = () => { stopAutoplay(); startAutoplay(); };

        carouselRoot.addEventListener('mouseenter', stopAutoplay);
        carouselRoot.addEventListener('mouseleave', startAutoplay);

        window.addEventListener('resize', () => {
            const newItems = window.innerWidth <= 768 ? 1 : 3;
            if (newItems !== itemsPerView) {
                itemsPerView = newItems;
                currentIndex = 0;
                moveToSlide(0);
            }
        });

        startAutoplay();
    }

    initCustomCarousel('refrescos-carousel');
    initCustomCarousel('salsas-carousel');

    // =================================================
    // 5. LÓGICA DE PILARES (NOSOTROS)
    // =================================================
    const pillarBoxes = document.querySelectorAll('.pillar-box');
    if (pillarBoxes.length > 0) {
        pillarBoxes.forEach(box => {
            box.addEventListener('click', () => {
                if (box.classList.contains('active')) return;
                pillarBoxes.forEach(otherBox => {
                    otherBox.classList.remove('active');
                });
                box.classList.add('active');
            });
        });
    }

});