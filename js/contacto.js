document.addEventListener("DOMContentLoaded", () => {

    // Coordenadas reales de Calle Mayor 1, Madrid
    const empresa = [40.415363, -3.707398]; 
    
    // Inicializar mapa
    const mapa = L.map('mapa').setView(empresa, 15);

    // Capa OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(mapa);

    // Marcador empresa con popup y enlace Google Maps
    L.marker(empresa).addTo(mapa)
        .bindPopup(
            "<b>WebDev Studio</b><br>Calle Mayor 1, 28013 Madrid<br>" +
            "<a href='https://www.google.com/maps/dir/?api=1&destination=40.415363,-3.707398' target='_blank'>Ver ruta en Google Maps</a>"
        )
        .openPopup();

    // Redibujar mapa para centrar correctamente
    setTimeout(() => {
        mapa.invalidateSize();
        mapa.setView(empresa, 15); // asegura que el mapa quede centrado
    }, 200);

    // Routing desde ubicación del cliente
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const cliente = [pos.coords.latitude, pos.coords.longitude];

            L.Routing.control({
                waypoints: [
                    L.latLng(cliente[0], cliente[1]),
                    L.latLng(empresa[0], empresa[1])
                ],
                routeWhileDragging: false,
                show: true
            }).addTo(mapa);

        }, () => {
            console.log("No se pudo obtener la ubicación del cliente.");
        });
    } else {
        console.log("Geolocalización no soportada por el navegador.");
    }

});
