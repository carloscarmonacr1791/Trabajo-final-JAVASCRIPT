document.addEventListener("DOMContentLoaded", () => {

    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.querySelectorAll(".extra");
    const presupuestoFinal = document.getElementById("presupuesto-final");
    const form = document.getElementById("form-presupuesto");

    // Función para validar datos de contacto
    function validarContacto() {
        const regexNombre = /^[A-Za-z]{1,15}$/;
        const regexApellidos = /^[A-Za-z\s]{1,40}$/;
        const regexTelefono = /^[0-9]{1,9}$/;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        if (!regexNombre.test(nombre.value)) return false;
        if (!regexApellidos.test(apellidos.value)) return false;
        if (!regexTelefono.test(telefono.value)) return false;
        if (!regexEmail.test(email.value)) return false;

        return true;
    }

    // Función para calcular presupuesto
    function calcularPresupuesto() {
        let total = parseFloat(producto.value);

        extras.forEach(extra => {
            if (extra.checked) total += parseFloat(extra.value);
        });

        let descuento = 0;
        if (plazo.value >= 3) descuento = 0.1; // 10% si el plazo es 3 o más meses
        if (plazo.value >= 6) descuento = 0.2; // 20% si el plazo es 6 o más

        total = total - (total * descuento);
        presupuestoFinal.value = total.toFixed(2);
    }

    // Eventos para recalcular automáticamente
    producto.addEventListener("change", calcularPresupuesto);
    plazo.addEventListener("input", calcularPresupuesto);
    extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));

    // Calcular al cargar la página
    calcularPresupuesto();

    // Validación y envío del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validarContacto()) {
            alert("Por favor, revisa tus datos de contacto. No cumplen los criterios.");
            return;
        }

        if (!document.getElementById("condiciones").checked) {
            alert("Debes aceptar las condiciones de privacidad.");
            return;
        }

        alert("Formulario enviado correctamente.\nPresupuesto final: " + presupuestoFinal.value + "€");
        form.reset();
        calcularPresupuesto();
    });
});
