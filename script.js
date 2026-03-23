gsap.registerPlugin(ScrollTrigger);

const slides = document.querySelectorAll(".slide");
const scrollDist = 400; 

// FIX: Subtract 1 from the length so the scroll ends on the final slide
document.body.style.height = ((slides.length - 1) * scrollDist + 100) + "vh";

slides.forEach((slide, i) => {
    const isLast = i === slides.length - 1;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            // Starts the animation at the correct scroll position
            start: `${i * scrollDist}vh top`,
            // Ends the animation before the next slide starts
            end: `${(i + 1) * scrollDist}vh top`,
            scrub: 2.5, 
            toggleActions: "play reverse play reverse",
        }
    });

    // Fade and Scale In
    tl.fromTo(slide, 
        { autoAlpha: 0, scale: 0.9, y: 50 }, 
        { autoAlpha: 1, scale: 1, y: 0, duration: 1.5 }
    );

    // ONLY Fade Out if it's NOT the last slide
    if (!isLast) {
        tl.to(slide, { 
            autoAlpha: 0, 
            scale: 1.1, 
            y: -50, 
            duration: 1.5 
        });
    }
});

window.onscroll = () => {
    let winScroll = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = (winScroll / height * 100);
    // Ensure the progress bar hits 100% exactly
    document.getElementById("myBar").style.width = Math.min(progress, 100) + "%";
};

// Whale Interaction
const whale = document.getElementById('interactive-whale');
const spout = document.getElementById('spout');
const sound = document.getElementById('spurt-sound');

if (whale) {
    whale.addEventListener('click', () => {
        sound.currentTime = 0;
        sound.play();
        gsap.fromTo(spout, 
            { height: 0, opacity: 1, top: "40%" },
            { height: 150, opacity: 0, top: "-50%", duration: 0.8, ease: "power2.out" }
        );
    });
}