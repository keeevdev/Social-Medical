document.addEventListener("DOMContentLoaded", cargarDatos);

async function cargarDatos() {
    try {
        // Cargar usuarios
        const usuariosResponse = await fetch("http://localhost:3002/api/Usuarios");
        const usuarios = await usuariosResponse.json();
        const selectUsuarios = document.getElementById("usuario_id");
        usuarios.forEach(usuario => {
            const option = document.createElement("option");
            option.value = usuario._id;
            option.textContent = usuario.nombre;
            selectUsuarios.appendChild(option);
        });

        // Cargar servicios
        const serviciosResponse = await fetch("http://localhost:3002/api/ServiciosSalud");
        const servicios = await serviciosResponse.json();
        const selectServicios = document.getElementById("servicio_id");
        servicios.forEach(servicio => {
            const option = document.createElement("option");
            option.value = servicio._id;
            option.textContent = servicio.nombre;
            selectServicios.appendChild(option);
        });
    } catch (error) {
        alert("Error al cargar los datos: " + error.message);
    }
}

document.getElementById("formPago").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        usuario_id: document.getElementById("usuario_id").value,
        servicio_id: document.getElementById("servicio_id").value,
        monto: document.getElementById("monto").value,
        metodo_pago: document.getElementById("metodo_pago").value
    };

    try {
        const response = await fetch("http://localhost:3002/api/Pagos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error("Error al guardar el pago");

        alert("Pago creado con éxito");
        window.location.href = "pagos.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
});
