window.addEventListener("load", function() {
    setTimeout(function() {
        document.getElementById("loading").style.display = "none";
        document.getElementById("content").style.display = "block";
        document.body.classList.remove("no-scroll");
    }, 3000);
  });
  
  
  window.onload = function() {
    var width = window.innerWidth;
    
    if (width <= 908) {
        // Show message for mobile
        document.querySelector('.message').style.display = 'flex';
        document.querySelector('.main-content').style.display = 'none';
    } else {
        // Show content for large screens
        document.querySelector('.message').style.display = 'none';
        document.querySelector('.main-content').style.display = 'block';
    }
  };

  jQuery(document).ready(function () {
    let isLocked = false; // Flag to lock interaction
    const scaleOutDuration = 1000; // Duration for scale-out effect (in milliseconds)
    const delayBetweenSlides = 900; // Delay before moving to next slide after scale-out
    
    // Initialize the Slick slider
    jQuery(".c-slider-init").slick({
      dots: false,
      nav: false,
      arrows: false, // Disable default arrows
      infinite: true,
      speed: 1100, // Use a reasonable speed for slide transitions
      slidesToShow: 1,
      adaptiveHeight: true,
      autoplay: false, // Autoplay off, as we’ll manage transitions manually
      draggable: true, // Enable dragging
      swipe: true, // Enable swiping on touch devices
      pauseOnFocus: false,
      pauseOnHover: false,
      accessibility: false,
    });
    
    // Add scale-in class to the first slide initially
    jQuery(".slick-current").addClass("animateIn");
    
    let transitionSetup = {
      target: ".slick-list",
      scaleOutClass: "u-scale-out",
      scaleInClass: "animateIn",
      doScaleOut: function () {
        let slideContainer = document.querySelector(this.target);
        slideContainer.classList.add(this.scaleOutClass);
      },
      doScaleIn: function () {
        let slideContainer = document.querySelector(this.target);
        slideContainer.classList.remove(this.scaleOutClass);
        jQuery(".slick-current").addClass(this.scaleInClass);
      },
    };
    
    // Keyboard event listener for arrow keys
    document.addEventListener("keydown", function (event) {
      if (isLocked) return; // Prevent interaction if locked
    
      // Check if left or right arrow is pressed
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        isLocked = true; // Lock the interaction
    
        const currentSlide = jQuery(".c-slider-init").slick("slickCurrentSlide");
        const slideCount = jQuery(".c-slider-init").slick("getSlick").slideCount;
        let nextSlide;
    
        // Determine the next slide based on the arrow key pressed
        if (event.key === "ArrowRight") {
          nextSlide = (currentSlide + 1) % slideCount; // Wrap around to the first slide
        } else if (event.key === "ArrowLeft") {
          nextSlide = (currentSlide - 1 + slideCount) % slideCount; // Wrap around to the last slide
        }
    
        // Start scale-out animation
        transitionSetup.doScaleOut();
    
        // After scale-out animation is complete, transition to the next slide
        setTimeout(() => {
          // Move to the next slide using Slick's slide transition
          jQuery(".c-slider-init").slick("slickGoTo", nextSlide);
    
          // After the slide transition, apply scale-in effect on the new slide
          setTimeout(() => {
            transitionSetup.doScaleIn();
            // Unlock interaction after the animation is done
            isLocked = false;
          }, delayBetweenSlides); // Delay before applying scale-in
        }, scaleOutDuration); // Duration of scale-out animation
      }
    });
    
    // Event listeners for Slick slider change events
    jQuery(".c-slider-init").on("beforeChange", function(event, slick, currentSlide, nextSlide) {
      transitionSetup.doScaleOut();
    });
    
    jQuery(".c-slider-init").on("afterChange", function(event, slick, currentSlide) {
      transitionSetup.doScaleIn();
      isLocked = false;
    });
    
    // Trigger the initial scale-in for the first slide on load
    transitionSetup.doScaleIn();
    });
    