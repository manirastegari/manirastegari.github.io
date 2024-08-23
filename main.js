// FOR SCROLLING DOWN AND SHOWING THE NAV BAR
let lastScrollTop = 0;
let delta = 5; // Adjust as needed

window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(lastScrollTop - currentScroll) <= delta) {
        return;
    }

    if (currentScroll > lastScrollTop) {
        // Scroll Down
        document.body.classList.remove("scroll-up");
        document.body.classList.add("scroll-down");
    } else {
        // Scroll Up
        document.body.classList.remove("scroll-down");
        document.body.classList.add("scroll-up");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

// FOR GOING TO SECTION OF PAGE WHEN NAV LINK CLICKED
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navlist');

  navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          console.log("Link Clicked:", this.getAttribute('href'));
          const targetId = this.getAttribute('href').substring(1);
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
              console.log("Smooth Scrolling to:", targetId);
              smoothScroll(targetSection, 1000); // 1000 milliseconds (1 second)
          }
      });
  });

  // Custom smooth scrolling function
  function smoothScroll(target, duration) {
      const targetPosition = target.getBoundingClientRect().top;
      const startPosition = window.pageYOffset || window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime = null;

      console.log("Target Position:", targetPosition);
      console.log("Start Position:", startPosition);
      console.log("Distance:", distance);

      function animation(currentTime) {
          if (startTime === null) {
              startTime = currentTime;
          }
          const timeElapsed = currentTime - startTime;
          const scrollAmount = easeInOutQuad(timeElapsed, startPosition, distance, duration);
          console.log("Scroll Amount:", scrollAmount);
          window.scrollTo(0, scrollAmount);
          if (timeElapsed < duration) {
              requestAnimationFrame(animation);
          }
      }

      // Easing function for smoother scroll
      function easeInOutQuad(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
  }
});
