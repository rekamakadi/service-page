// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  const specialSection = document.querySelector("#special-section");
    const background = specialSection.querySelector(".background");
    const video = specialSection.querySelector(".video");
    const h2 = specialSection.querySelector("h2"); // Select the h2 element
    const p = specialSection.querySelector("p"); // Select the p element

    // Set the loop attribute on the video element
video.loop = true;
video.volume = 0.2;

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: [0.3, 0.7]
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const intersectionRatio = entry.intersectionRatio;
                if (intersectionRatio > 0.1 && intersectionRatio < 0.7) {
                    background.style.opacity = "1";
                    video.style.opacity = "0";
                    video.pause();
                    h2.style.backgroundColor = ""; // Correct property name
                    h2.style.color = "";
                    p.style.backgroundColor = ""; // Correct property name
                    p.style.color = "";

                    
                } else {
                    background.style.opacity = "0";
                    video.style.opacity = "1";
                    video.play();
                    h2.style.backgroundColor = "#ffcc00"; // Correct property name
                    h2.style.color = "black";
                    p.style.backgroundColor = "#ffcc00"; // Correct property name
                    p.style.color = "black";


                  }
            } else {
                background.style.opacity = "1";
                video.style.opacity = "0";
                video.pause();
                h2.style.backgroundColor = ""; // Correct property name
                h2.style.color = "";
                p.style.backgroundColor = ""; // Correct property name
                p.style.color = "";
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(specialSection);
  // Contact form submission
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Implement form submission here
    alert('Thank you for your message!');

    


  });
  