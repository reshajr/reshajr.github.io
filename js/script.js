

  document.addEventListener("DOMContentLoaded", () => {
    // Ambil elemen-elemen utama
    const gallery = document.getElementById("gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeButton = document.getElementById("close");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    let currentIndex = 0;
    let captionEnabled = true;

    // Event klik pada gambar dalam galeri
    gallery.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG") {
        const imageSrc = e.target.dataset.image || e.target.src;
        const caption = e.target.dataset.caption || e.target.alt;
        currentIndex = Array.from(gallery.querySelectorAll("img")).indexOf(e.target);

        updateImage(imageSrc, caption);
        lightbox.style.display = "flex";
        fadeIn(lightbox, 500);
        document.body.style.overflow = "hidden";
      }
    });

    // Tombol tutup
    closeButton.addEventListener("click", () => {
      fadeOut(lightbox, 500, () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
      });
    });

    // Klik di luar gambar (overlay)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        fadeOut(lightbox, 500, () => {
          lightbox.style.display = "none";
          document.body.style.overflow = "auto";
        });
      }
    });

    // Tombol Next
    nextButton.addEventListener("click", () => {
      const images = gallery.querySelectorAll("img");
      const nextIndex = (currentIndex + 1) % images.length;
      const nextImage = images[nextIndex].dataset.image || images[nextIndex].src;
      const nextCaption = images[nextIndex].dataset.caption || images[nextIndex].alt;

      fadeOut(lightboxImage, 500, () => {
        updateImage(nextImage, nextCaption);
        currentIndex = nextIndex;
      });
    });

    // Tombol Prev
    prevButton.addEventListener("click", () => {
      const images = gallery.querySelectorAll("img");
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      const prevImage = images[prevIndex].dataset.image || images[prevIndex].src;
      const prevCaption = images[prevIndex].dataset.caption || images[prevIndex].alt;

      fadeOut(lightboxImage, 500, () => {
        updateImage(prevImage, prevCaption);
        currentIndex = prevIndex;
      });
    });

    // Fade In Function
    function fadeIn(element, duration) {
      element.style.opacity = "0";
      element.style.transition = `opacity ${duration / 1000}s`;
      setTimeout(() => {
        element.style.opacity = "1";
      }, 50);
    }

    // Fade Out Function
    function fadeOut(element, duration, onComplete) {
      element.style.opacity = "1";
      element.style.transition = `opacity ${duration / 1000}s`;
      setTimeout(() => {
        element.style.opacity = "0";
        setTimeout(onComplete, duration);
      }, 50);
    }

    // Update Caption
    function updateCaption(caption) {
      lightboxCaption.innerHTML = captionEnabled ? caption : "";
    }

    // Update Image + Caption
    function updateImage(src, caption) {
      lightboxImage.src = src;
      updateCaption(caption);
      fadeIn(lightboxImage, 500);
    }
  });
