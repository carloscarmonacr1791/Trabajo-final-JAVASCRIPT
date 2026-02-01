document.addEventListener("DOMContentLoaded", () => {
    fetch("data/noticias.json")
        .then(response => response.json())
        .then(data => mostrarNoticias(data))
        .catch(error => {
            document.getElementById("contenedor-noticias").innerHTML =
                "<p>Error al cargar las noticias</p>";
        });
});

function mostrarNoticias(noticias) {
    const contenedor = document.getElementById("contenedor-noticias");
    contenedor.innerHTML = "";

    noticias.forEach(noticia => {
        const div = document.createElement("div");
        div.classList.add("noticia");

        div.innerHTML = `
            <h3>${noticia.titulo}</h3>
            <p>${noticia.descripcion}</p>
            <small>${noticia.fecha}</small>
        `;

        contenedor.appendChild(div);
    });
}

// Resaltar la página actual en la barra de navegación
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");
    const current = window.location.pathname.split("/").pop(); // nombre del archivo actual

    links.forEach(link => {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        }
    });
});
