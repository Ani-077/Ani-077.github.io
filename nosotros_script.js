document.addEventListener('DOMContentLoaded', function() {
    
    const pillarBoxes = document.querySelectorAll('.pillar-box');

    pillarBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // Si la caja a la que se le hizo clic ya está activa, no hagas nada
            if (box.classList.contains('active')) {
                return;
            }

            // Quita la clase 'active' de todas las cajas
            pillarBoxes.forEach(otherBox => {
                otherBox.classList.remove('active');
            });

            // Añade la clase 'active' solo a la caja a la que se le hizo clic
            box.classList.add('active');
        });
    });

});