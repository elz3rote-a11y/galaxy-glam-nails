const numeroWhatsApp="525578673234";

document.getElementById("botonCita").addEventListener("click",e=>{
 e.preventDefault();mostrarFormulario();
});

function mostrarFormulario(){
 const modal=document.createElement("div");
 modal.className="modal";
 modal.innerHTML=`
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
   <label for="fecha">Fecha:</label><input type="date" id="fecha" required>
   <label for="hora">Hora:</label><input type="time" id="hora" required>
   <button type="submit" class="boton">CONFIRMAR CITA ✦</button>
  </form>
 </div>`;
 document.body.appendChild(modal);

 modal.querySelector(".cerrar-formulario").onclick=()=>modal.remove();
 modal.onclick=e=>{if(e.target===modal)modal.remove()};

 const servicio=modal.querySelector("#servicio");
 const precio=modal.querySelector("#precioSeleccionado");
 servicio.onchange=()=>{
  const p={"Manicure":"Precio: $200","Gelish":"Precio: $300","Uñas acrílicas":"Precio: $450","Nail Art":"Precio: Desde $50"};
  precio.textContent=p[servicio.value]||"Selecciona un servicio";
 };

 const hoy=new Date();
 modal.querySelector("#fecha").min=`${hoy.getFullYear()}-${String(hoy.getMonth()+1).padStart(2,"0")}-${String(hoy.getDate()).padStart(2,"0")}`;

 modal.querySelector("#formularioCita").onsubmit=e=>{
  e.preventDefault();
  const nombre=modal.querySelector("#nombre").value.trim();
  const telefono=modal.querySelector("#telefono").value.trim();
  const servicioElegido=servicio.value;
  const fecha=modal.querySelector("#fecha").value;
  const hora=modal.querySelector("#hora").value;
  if(!nombre||!telefono||!servicioElegido||!fecha||!hora){alert("Por favor completa todos los campos.");return}
  const fechaBonita=new Date(fecha+"T00:00:00").toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const mensaje=`✨ *NUEVA SOLICITUD DE CITA* ✨

💅 *Galaxy Glam Nails*

👤 *Nombre:* ${nombre}

📱 *Teléfono:* ${telefono}

💅 *Servicio:* ${servicioElegido}

📅 *Fecha:* ${fechaBonita}

⏰ *Hora:* ${hora}

Hola, me gustaría confirmar la disponibilidad para esta cita. ✨`;
  window.open("https://wa.me/"+numeroWhatsApp+"?text="+encodeURIComponent(mensaje),"_blank");
  modal.remove();
 };
}

document.getElementById("botonContacto").addEventListener("click",e=>{
 e.preventDefault();
 const mensaje="Hola Galaxy Glam Nails 💅✨

Me gustaría obtener información sobre sus servicios.";
 window.open("https://wa.me/"+numeroWhatsApp+"?text="+encodeURIComponent(mensaje),"_blank");
});

document.querySelectorAll(".foto-galeria").forEach(foto=>{
 foto.addEventListener("click",()=>{
  const visor=document.createElement("div");
  visor.className="visor";
  visor.innerHTML=`<span class="cerrar">&times;</span><img src="${foto.src}" alt="${foto.alt}">`;
  document.body.appendChild(visor);
  visor.querySelector(".cerrar").onclick=()=>visor.remove();
  visor.onclick=e=>{if(e.target===visor)visor.remove()};
 });
});
