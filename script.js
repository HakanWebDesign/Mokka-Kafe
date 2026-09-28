```javascript
"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) => {

    try {
        return parent.querySelector(selector);
    }

    catch (error) {
        return null;
    }

};


const $$ = (selector, parent = document) => {

    try {
        return Array.from(
            parent.querySelectorAll(selector)
        );
    }

    catch (error) {
        return [];
    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        initMobileMenu();

        initScrollReveal();

        initNavbar();

        initSmoothScroll();

        initMenuCategories();

        initProductOrders();

        initReservation();

        initHeroParallax();

        initButtons();

        initFooterYear();

        initEscapeKey();

        setMinimumDate();

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const button =
        $("#menuButton");

    const nav =
        $("#navLinks");

    if (!button || !nav) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            const isActive =
                nav.classList.toggle("active");

            button.setAttribute(
                "aria-expanded",
                String(isActive)
            );


            button.innerHTML =
                isActive
                    ? '<i class="fa-solid fa-xmark"></i>'
                    : '<i class="fa-solid fa-bars"></i>';

        }
    );


    $$(".nav-links a").forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove("active");

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    button.innerHTML =
                        '<i class="fa-solid fa-bars"></i>';

                }
            );

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        $$(".reveal");


    if (!elements.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add("show");

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        element => {

            observer.observe(element);

        }
    );

}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

    const navbar =
        $(".navbar");

    const sections =
        $$("section[id]");

    const links =
        $$('.nav-links a[href^="#"]');


    function updateNavbar() {

        if (navbar) {

            if (window.scrollY > 60) {

                navbar.style.background =
                    "rgba(25,15,10,.97)";

                navbar.style.boxShadow =
                    "0 10px 35px rgba(0,0,0,.20)";

            }

            else {

                navbar.style.background =
                    "rgba(36,23,17,.88)";

                navbar.style.boxShadow =
                    "none";

            }

        }


        let current =
            "home";


        sections.forEach(
            section => {

                const top =
                    section.offsetTop - 180;

                const bottom =
                    top + section.offsetHeight;


                if (
                    window.scrollY >= top &&
                    window.scrollY < bottom
                ) {

                    current =
                        section.id;

                }

            }
        );


        links.forEach(
            link => {

                link.classList.remove(
                    "current"
                );


                const href =
                    link.getAttribute("href");


                if (
                    href === "#" + current
                ) {

                    link.classList.add(
                        "current"
                    );

                }

            }
        );

    }


    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    () => {

                        updateNavbar();

                        ticking = false;

                    }
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    updateNavbar();

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    const navbar =
        $(".navbar");


    $$('a[href^="#"]').forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute("href");


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    let target;


                    try {

                        target =
                            document.querySelector(id);

                    }

                    catch (error) {

                        return;

                    }


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const position =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo({

                        top: position,

                        behavior: "smooth"

                    });

                }
            );

        }
    );

}


/* =========================================================
   MENU CATEGORIES
========================================================= */

function initMenuCategories() {

    const buttons =
        $$(".category-button");

    const cards =
        $$(".menu-card");


    if (
        !buttons.length ||
        !cards.length
    ) {
        return;
    }


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    buttons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const category =
                        button.dataset.category;


                    cards.forEach(
                        card => {

                            const cardCategory =
                                card.dataset.category;


                            if (
                                category === "all" ||
                                category === cardCategory
                            ) {

                                card.classList.remove(
                                    "hidden"
                                );

                                setTimeout(
                                    () => {

                                        card.classList.add(
                                            "show"
                                        );

                                    },
                                    20
                                );

                            }

                            else {

                                card.classList.add(
                                    "hidden"
                                );

                            }

                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   PRODUCT → WHATSAPP
========================================================= */

function initProductOrders() {

    const buttons =
        $$(".order-product");


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const product =
                        button.dataset.product ||
                        "ürün";


                    const message =
                        `Merhaba Mokka Coffee, ${product} siparişi vermek istiyorum.`;


                    const url =
                        "https://wa.me/905555555555?text=" +
                        encodeURIComponent(message);


                    window.open(
                        url,
                        "_blank",
                        "noopener"
                    );

                }
            );

        }
    );

}


/* =========================================================
   RESERVATION
========================================================= */

function initReservation() {

    const form =
        $("#reservationForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                $("#name")?.value.trim();

            const phone =
                $("#phone")?.value.trim();

            const date =
                $("#date")?.value;

            const time =
                $("#time")?.value;

            const people =
                $("#people")?.value;

            const message =
                $("#message")?.value.trim();


            if (
                !name ||
                !phone ||
                !date ||
                !time ||
                !people
            ) {

                alert(
                    "Lütfen gerekli alanları doldurun."
                );

                return;

            }


            const whatsappMessage =
                `Merhaba Mokka Coffee!

Rezervasyon talebi oluşturmak istiyorum.

Ad Soyad: ${name}
Telefon: ${phone}
Tarih: ${date}
Saat: ${time}
Kişi Sayısı: ${people}
Not: ${message || "Yok"}`;


            const url =
                "https://wa.me/905555555555?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                url,
                "_blank",
                "noopener"
            );


            form.reset();

        }
    );

}


/* =========================================================
   MINIMUM RESERVATION DATE
========================================================= */

function setMinimumDate() {

    const dateInput =
        $("#date");


    if (!dateInput) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.min =
        `${year}-${month}-${day}`;

}


/* =========================================================
   HERO PARALLAX
========================================================= */

function initHeroParallax() {

    const hero =
        $(".hero");


    if (!hero) {
        return;
    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.innerWidth < 800
            ) {
                return;
            }


            if (!ticking) {

                window.requestAnimationFrame(
                    () => {

                        if (
                            window.scrollY <
                            window.innerHeight
                        ) {

                            hero.style.backgroundPosition =
                                `center ${window.scrollY * 0.18}px`;

                        }

                        ticking = false;

                    }
                );

                ticking = true;

            }

        },
        { passive: true }
    );

}


/* =========================================================
   BUTTON RIPPLE
========================================================= */

function initButtons() {

    const buttons =
        $$(".btn");


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    const ripple =
                        document.createElement(
                            "span"
                        );


                    const rect =
                        button.getBoundingClientRect();


                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );


                    const x =
                        event.clientX -
                        rect.left -
                        size / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        size / 2;


                    ripple.style.position =
                        "absolute";

                    ripple.style.width =
                        `${size}px`;

                    ripple.style.height =
                        `${size}px`;

                    ripple.style.left =
                        `${x}px`;

                    ripple.style.top =
                        `${y}px`;

                    ripple.style.borderRadius =
                        "50%";

                    ripple.style.background =
                        "rgba(255,255,255,.18)";

                    ripple.style.transform =
                        "scale(0)";

                    ripple.style.pointerEvents =
                        "none";

                    ripple.style.animation =
                        "rippleEffect .6s ease-out";


                    button.style.position =
                        "relative";

                    button.style.overflow =
                        "hidden";


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        600
                    );

                }
            );

        }
    );

}


/* =========================================================
   FOOTER YEAR
========================================================= */

function initFooterYear() {

    const footer =
        $(".footer-bottom p");


    if (!footer) {
        return;
    }


    const year =
        new Date().getFullYear();


    footer.textContent =
        `© ${year} Mokka Coffee. Tüm hakları saklıdır.`;

}


/* =========================================================
   ESCAPE
========================================================= */

function initEscapeKey() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            const nav =
                $("#navLinks");

            const button =
                $("#menuButton");


            if (nav) {

                nav.classList.remove(
                    "active"
                );

            }


            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

                button.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }
    );

}


/* =========================================================
   ERROR PROTECTION
========================================================= */

window.addEventListener(
    "error",
    event => {

        console.warn(
            "Mokka Coffee:",
            event.message
        );

    }
);


window.addEventListener(
    "unhandledrejection",
    event => {

        console.warn(
            "Mokka Coffee Promise:",
            event.reason
        );

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "Mokka Coffee — HakanWebDesign Demo hazır."
);
```
