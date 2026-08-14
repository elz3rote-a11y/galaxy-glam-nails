// Galaxy Glam Nails - JavaScript
// WhatsApp del negocio: México +52 55 7867 3234
const NUMERO_WHATSAPP = "525578673234";

function abrirWhatsApp(mensaje){
    const url = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(mensaje);
    window.location.href = url;
}

document.getElementById("botonCita").addEventListener("click", function(e){
    e.preventDefault();
    mostrarFormulario();
});

document.getElementById("botonContacto").addEventListener("click", function(e){
    e.preventDefault();
    abrirWhatsApp("Hola Galaxy Glam Nails 💅✨\n\nMe gustaría obtener información sobre sus servicios.");
});

function mostrarFormulario(){
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="formulario">
            <span class="cerrar-formulario">&times;</span>
            <h2>✦ AGENDA TU CITA ✦</h2>
            <form id="formularioCita">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" placeholder="Escribe tu nombre" required>

                <label for="telefono">Teléfono:</label>
                <input type="tel" id="telefono" placeholder="55 0000 0000" required>

                <label for="servicio">Servicio:</label>
                <select id="servicio" required>
                    <option value="">Selecciona un servicio</option>
                    <option value="Manicure">Manicure - $200</option>
                    <option value="Gelish">Gelish - $300</option>
                    <option value="Uñas acrílicas">Uñas acrílicas - $450</option>
                    <option value="Nail Art">Nail Art - Desde $50</option>
                </select>

                <div class="precio-seleccionado" id="precioSeleccionado">Selecciona un servicio</div>

                <label for="fecha">Fecha:</label>
                <input type="date" id="fecha" required>

                <label for="hora">Hora:</label>
                <input type="time" id="hora" required>

                <button type="submit" class="boton">CONFIRMAR CITA ✦</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".cerrar-formulario").onclick = () => modal.remove();
    modal.onclick = e => { if(e.target === modal) modal.remove(); };

    const servicio = modal.querySelector("#servicio");
    const precio = modal.querySelector("#precioSeleccionado");
    const precios = {
        "Manicure":"Precio: $200",
        "Gelish":"Precio: $300",
        "Uñas acrílicas":"Precio: $450",
        "Nail Art":"Precio: Desde $50"
    };

    servicio.addEventListener("change", () => {
        precio.textContent = precios[servicio.value] || "Selecciona un servicio";
    });

    const fecha = modal.querySelector("#fecha");
    const hoy = new Date();
    fecha.min = hoy.toISOString().split("T")[0];

    modal.querySelector("#formularioCita").addEventListener("submit", function(e){
        e.preventDefault();

        const nombre = modal.querySelector("#nombre").value.trim();
        const telefono = modal.querySelector("#telefono").value.trim();
        const servicioElegido = servicio.value;
        const fechaElegida = fecha.value;
        const horaElegida = modal.querySelector("#hora").value;

        if(!nombre || !telefono || !servicioElegido || !fechaElegida || !horaElegida){
            alert("Por favor completa todos los campos.");
            return;
        }

        const fechaBonita = new Date(fechaElegida + "T00:00:00").toLocaleDateString("es-MX", {
            weekday:"long", day:"numeric", month:"long", year:"numeric"
        });

        const mensaje =
            "✨ *NUEVA SOLICITUD DE CITA* ✨\n\n" +
            "💅 *Galaxy Glam Nails*\n\n" +
            "👤 *Nombre:* " + nombre + "\n\n" +
            "📱 *Teléfono:* " + telefono + "\n\n" +
            "💅 *Servicio:* " + servicioElegido + "\n\n" +
            "📅 *Fecha:* " + fechaBonita + "\n\n" +
            "⏰ *Hora:* " + horaElegida + "\n\n" +
            "Hola, me gustaría confirmar la disponibilidad para esta cita. ✨";

        abrirWhatsApp(mensaje);
    });
}

// Galería: tocar una imagen la abre en pantalla completa.
document.querySelectorAll(".foto-galeria").forEach(function(foto){
    foto.addEventListener("click", function(){
        const visor = document.createElement("div");
        visor.className = "visor";
        visor.innerHTML = `
            <span class="cerrar">&times;</span>
            <img src="${foto.src}" alt="${foto.alt}">
        `;
        document.body.appendChild(visor);

        visor.querySelector(".cerrar").onclick = () => visor.remove();
        visor.onclick = e => { if(e.target === visor) visor.remove(); };
    });
});
