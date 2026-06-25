document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.getElementById("heart-gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("music-btn");

    const preview = document.getElementById("hover-preview");
    const previewImg = document.getElementById("preview-img");

    const images = [];
    let currentIndex = 0;

    // ==========================
    // Shape trái tim
    // ==========================

    const heart = [
        "0000000000000000000",
        "0000111100011110000",
        "0001111110111111000",
        "0011111111111111100",
        "0111111111111111110",
        "1111111111111111111",
        "1111111111111111111",
        "1111111111111111111",
        "0111111111111111110",
        "0011111111111111100",
        "0001111111111111000",
        "0000111111111110000",
        "0000011111111100000",
        "0000001111111000000",
        "0000000111110000000",
        "0000000011100000000",
        "0000000001000000000"
    ];

    let count = 1;

    // ==========================
    // Gallery
    // ==========================

    heart.forEach(row => {

        [...row].forEach(cell => {

            const item = document.createElement("div");

            if (cell === "1") {

                item.className = "photo";
                item.style.animationDelay = `${count * 0.02}s`;

                const img = document.createElement("img");

                const imagePath = `images/${count}.JPG`;

                img.src = imagePath;
                img.alt = `Ảnh ${count}`;

                img.onerror = () => {
                    img.onerror = null;
                    img.src = "images/default.JPG";
                };

                const imageIndex = images.length;
                images.push(imagePath);

                item.appendChild(img);

                // Hover Preview
                item.addEventListener("mouseenter", () => {

                    preview.style.display = "block";
                    previewImg.src = imagePath;

                });

                item.addEventListener("mousemove", (e) => {

                    let left = e.clientX + 25;
                    let top = e.clientY - 150;

                    if (left + 320 > window.innerWidth) {
                        left = e.clientX - 330;
                    }

                    if (top < 10) {
                        top = 10;
                    }

                    preview.style.left = left + "px";
                    preview.style.top = top + "px";

                });

                item.addEventListener("mouseleave", () => {

                    preview.style.display = "none";

                });

                // Click mở Lightbox
                item.addEventListener("click", () => {

                    currentIndex = imageIndex;

                    lightbox.style.display = "flex";
                    lightboxImg.src = images[currentIndex];

                });

                count++;

            } else {

                item.className = "empty";

            }

            gallery.appendChild(item);

        });

    });

    // ==========================
    // Lightbox
    // ==========================

    function showPrev() {

        currentIndex--;

        if (currentIndex < 0)
            currentIndex = images.length - 1;

        lightboxImg.src = images[currentIndex];

    }

    function showNext() {

        currentIndex++;

        if (currentIndex >= images.length)
            currentIndex = 0;

        lightboxImg.src = images[currentIndex];

    }

    closeBtn.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox)
            lightbox.style.display = "none";

    });

    prevBtn.addEventListener("click", e => {

        e.stopPropagation();
        showPrev();

    });

    nextBtn.addEventListener("click", e => {

        e.stopPropagation();
        showNext();

    });

    document.addEventListener("keydown", e => {

        if (lightbox.style.display !== "flex") return;

        if (e.key === "ArrowLeft") showPrev();

        if (e.key === "ArrowRight") showNext();

        if (e.key === "Escape")
            lightbox.style.display = "none";

    });

    // ==========================
    // Music
    // ==========================

    musicBtn.addEventListener("click", e => {

        e.stopPropagation();

        if (music.paused) {

            music.play();

            musicBtn.textContent = "⏸ Pause";

        } else {

            music.pause();

            musicBtn.textContent = "🎵 Play Music";

        }

    });

    document.addEventListener("click", () => {

        if (music.paused) {

            music.play().catch(() => {});

            musicBtn.textContent = "⏸ Pause";

        }

    }, { once: true });

});

