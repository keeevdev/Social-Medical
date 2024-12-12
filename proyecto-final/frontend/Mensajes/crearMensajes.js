
let mensajes = [];
function mostrarMensajes() {
    const listaMensajes = document.getElementById('mensajes');
    listaMensajes.innerHTML = ''; 

    mensajes.forEach((mensaje, index) => {
        const li = document.createElement('li');
        li.textContent = `${mensaje.fecha_envio}: ${mensaje.contenido}`;
        listaMensajes.appendChild(li);
    });
}

document.getElementById('formEnviarMensaje').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const contenido = document.getElementById('contenido').value;
    const fechaEnvio = new Date().toISOString(); 


    const nuevoMensaje = {
        contenido: contenido,
        fecha_envio: fechaEnvio,
        leido: false
    };

 
    mensajes.push(nuevoMensaje);

 
    document.getElementById('contenido').value = '';


    mostrarMensajes();
});

mostrarMensajes();