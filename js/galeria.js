document.addEventListener("DOMContentLoaded", () => {

    const imagenes = [
        "img/img1.jpg",
        "img/img2.jpg",
        "img/img3.jpg",
        "img/img4.jpg"
    ];

    const galeria = document.getElementById("galeria");

    imagenes.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Imagen de la galería";
        img.classList.add("galeria-img");

        img.addEventListener("click", () => abrirModal(src));

        galeria.appendChild(img);
    });
});

function abrirModal(src) {
    const modal = document.getElementById("modal");
    const imgModal = document.getElementById("img-modal");

    imgModal.src = src;
    modal.style.display = "flex";
}

document.getElementById("cerrar").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});
