const gallery = document.getElementById("heart-gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("music-btn");
const images = [];
let currentIndex = 0;

// Hình trái tim
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

// ===================
// Tạo Gallery
// ===================
heart.forEach(row => {

    for (const cell of row) {

        const item = document.createElement("div");

        if (cell === "1") {

            item.className = "photo";

            const img = document.createElement("img");

            img.src = `images/${count}.jpg`;
            img.alt = `Ảnh ${count}`;

            // Nếu thiếu ảnh
            img.onerror = () => {
                img.src = "images/default.jpg";
            };

            images.push(img.src);

            item.appendChild(img);

            item.addEventListener("click", () => {

                currentIndex = images.indexOf(img.src);

                if (lightbox && lightboxImg) {
                    lightbox.style.display = "flex";
                    lightboxImg.src = images[currentIndex];
                }

            });

            count++;

        } else {

            item.className = "empty";

        }

        gallery.appendChild(item);

    }

});

console.log("Tổng số ảnh:", count - 1);

// ===================
// Lightbox
// ===================

if (closeBtn) {

    closeBtn.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

}

if (lightbox) {

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

}

// ===================
// Ảnh trước
// ===================

function showPrev() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = images.length - 1;

    }

    lightboxImg.src = images[currentIndex];

}

// ===================
// Ảnh sau
// ===================

function showNext() {

    currentIndex++;

    if (currentIndex >= images.length) {

        currentIndex = 0;

    }

    lightboxImg.src = images[currentIndex];

}

if (prevBtn) {

    prevBtn.addEventListener("click", showPrev);

}

if (nextBtn) {

    nextBtn.addEventListener("click", showNext);

}

// ===================
// Điều khiển bàn phím
// ===================

document.addEventListener("keydown", (e) => {

    if (!lightbox || lightbox.style.display !== "flex") return;

    switch (e.key) {

        case "ArrowLeft":
            showPrev();
            break;

        case "ArrowRight":
            showNext();
            break;

        case "Escape":
            lightbox.style.display = "none";
            break;

    }

});

// ===================
// Music
// ===================

if (music && musicBtn) {

    musicBtn.addEventListener("click", () => {

        if (music.paused) {

            music.play()
                .then(() => {

                    musicBtn.innerHTML = "⏸ Pause";

                })
                .catch(err => {

                    console.log("Không thể phát nhạc:", err);

                });

        } else {

            music.pause();

            musicBtn.innerHTML = "🎵 Play";

        }

    });

    // Tự phát sau lần click đầu tiên
    document.addEventListener("click", () => {

        if (music.paused) {

            music.play()
                .then(() => {

                    musicBtn.innerHTML = "⏸ Pause";

                })
                .catch(() => {});

        }

    }, { once: true });

}