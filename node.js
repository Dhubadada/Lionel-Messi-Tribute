document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const items = document.querySelectorAll('.slider .item');
    const background = document.querySelector('.background-animation');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');

    if (!slider || !nextBtn || !prevBtn || items.length === 0) {
        console.error("Slider or button elements not found. Please check your HTML structure.");
        return;
    }

    let activeIndex = 0;
    const totalItems = items.length;
    let autoRotateInterval;

    function updateSlider(action) {
        const prevIndex = (activeIndex - 1 + totalItems) % totalItems;
        const nextIndex = (activeIndex + 1) % totalItems;

        items.forEach(item => {
            item.classList.remove('active', 'prev', 'next');
        });

        items[activeIndex].classList.add('active');
        items[prevIndex].classList.add('prev');
        items[nextIndex].classList.add('next');
        
      
        if (action === 'next' || action === 'prev') {
            background.classList.add('fast');
            setTimeout(() => {
                background.classList.remove('fast');
            }, 500);
        }
    }

   
    function showNext() {
        activeIndex = (activeIndex + 1) % totalItems;
        updateSlider('next');
    }

    function showPrev() {
        activeIndex = (activeIndex - 1 + totalItems) % totalItems;
        updateSlider('prev');
    }

    
    function resetAutoRotate() {
        clearInterval(autoRotateInterval); // Stop the old timer
        autoRotateInterval = setInterval(showNext, 5000); // Start a new one
    }

  
   
    nextBtn.addEventListener('click', () => {
        showNext();
        resetAutoRotate(); 
    });

  
    prevBtn.addEventListener('click', () => {
        showPrev();
        resetAutoRotate(); // Restart the auto-play timer after a manual click
    });

    // Pause the auto-play when the user's mouse is over the slider
    slider.addEventListener('mouseover', () => {
        clearInterval(autoRotateInterval);
    });
    
    // Resume the auto-play when the user's mouse leaves the slider
    slider.addEventListener('mouseout', () => {
        resetAutoRotate();
    });

    // --- 5. INITIALIZE THE SLIDER ON PAGE LOAD ---
    updateSlider();
    autoRotateInterval = setInterval(showNext, 5000);
});