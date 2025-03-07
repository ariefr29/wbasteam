// Data gambar dalam array (bisa diambil dari API atau file JSON)
const imageData = [
    { src: "./images/gallery/34.jpg", alt: "Gambar 34" },
    { src: "./images/gallery/23.jpg", alt: "Gambar 23" },
    { src: "./images/gallery/14.jpg", alt: "Gambar 14" },
    { src: "./images/gallery/6.jpg", alt: "Gambar 6" },
    { src: "./images/gallery/30.jpg", alt: "Gambar 30" },
    { src: "./images/gallery/28.jpg", alt: "Gambar 28" }
];

// Fungsi untuk menampilkan galeri dari data JSON
function renderGallery() {
    const galleryContainer = document.getElementById("gallery");
    imageData.forEach(image => {
      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("cursor-pointer");

      const imgElement = document.createElement("img");
      imgElement.src = image.src;
      imgElement.alt = image.alt;
      imgElement.classList.add("w-full", "rounded-lg", "shadow-md");

      imgWrapper.appendChild(imgElement);
      imgWrapper.onclick = () => openLightbox(image.src);
      galleryContainer.appendChild(imgWrapper);
    });
}

// Lightbox functions
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = src;
    lightbox.classList.add("show");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("show");
}

// Panggil fungsi render saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderGallery);