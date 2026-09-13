// Reveal sections on scroll
const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2,
});

hiddenElements.forEach((el) => observer.observe(el));


// Active navbar link
const navLinks = document.querySelectorAll("header nav a");
const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`header nav a[href="#${id}"]`);

        if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove("active"));
            if (navLink) navLink.classList.add("active");
        }
    });
}, {
    threshold: 0.5,
});

sections.forEach((section) => sectionObserver.observe(section));


// Contact form
const contactForm = document.querySelector(".contact form");
const feedbackMessage = document.querySelector(".feedback-message");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        if (!name || !email || !message) {
            feedbackMessage.textContent = "Please complete all fields.";
            feedbackMessage.classList.add("visible");
            return;
        }

        try {
            const response = await fetch("https://portfolio-website-h7zm.onrender.com/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                contactForm.reset();
                feedbackMessage.textContent = `Thanks, ${name}! Your message has been received.`;
            } else {
                feedbackMessage.textContent = data.message || "Failed to send message.";
            }

            feedbackMessage.classList.add("visible");

            setTimeout(() => {
                feedbackMessage.classList.remove("visible");
            }, 5000);

        } catch (error) {
            feedbackMessage.textContent = "Server error. Please try again later.";
            feedbackMessage.classList.add("visible");
        }
    });
}


const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// =====================================
// PREMIUM LOADER
// =====================================

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.remove();
        }, 800);

    }, 1800);
});
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
});