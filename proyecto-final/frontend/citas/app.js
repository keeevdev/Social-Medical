// URL base del API
const API_URL = "http://localhost:3002/api/CitasReservas";

const citasTable = document.getElementById("citasTable");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const buscarCitaInput = document.getElementById("buscarCitaInput");

const cargarCitas = async () => {
    try {
        loading.classList.remove("hidden");
        errorMessage.classList.add("hidden");

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener las citas");

        const citas = await response.json();

        citasTable.innerHTML = "";

        citas.forEach((cita) => {
            const row = document.createElement("tr");
            row.classList.add("hover:bg-gray-700");

            row.innerHTML = `
                <td class="py-3 px-4">${cita.cita_id}</td>
                <td class="py-3 px-4">${cita.usuario_id}</td>
                <td class="py-3 px-4">${cita.profesional_id}</td>
                <td class="py-3 px-4">${new Date(cita.fecha).toLocaleDateString()}</td>
                <td class="py-3 px-4">${cita.hora}</td>
                <td class="py-3 px-4">${cita.estado_reserva}</td>
                <td class="py-3 px-4">$${cita.costo.toFixed(2)}</td>
                <td class="py-3 px-4">${cita.detalles}</td>
                <td class="py-3 px-4">
                    <button class="text-indigo-500 hover:text-indigo-700" onclick="editarCita(${cita.cita_id})">Editar</button>
                    <button class="text-red-500 hover:text-red-700 ml-4" onclick="eliminarCita(${cita.cita_id})">Eliminar</button>
                </td>
            `;

            citasTable.appendChild(row);
        });

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
};

buscarCitaInput.addEventListener("input", async (event) => {
    const termino = event.target.value.trim();

    if (termino === "") {
        cargarCitas();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${termino}`);
        if (!response.ok) throw new Error("Cita no encontrada");

        const cita = await response.json();
        citasTable.innerHTML = "";

        const row = document.createElement("tr");
        row.classList.add("hover:bg-gray-700");

        row.innerHTML = `
            <td class="py-3 px-4">${cita.cita_id}</td>
            <td class="py-3 px-4">${cita.usuario_id}</td>
            <td class="py-3 px-4">${cita.profesional_id}</td>
            <td class="py-3 px-4">${new Date(cita.fecha).toLocaleDateString()}</td>
            <td class="py-3 px-4">${cita.hora}</td>
            <td class="py-3 px-4">${cita.estado_reserva}</td>
            <td class="py-3 px-4">$${cita.costo.toFixed(2)}</td>
            <td class="py-3 px-4">${cita.detalles}</td>
            <td class="py-3 px-4">
                <button class="text-indigo-500 hover:text-indigo-700" onclick="editarCita(${cita.cita_id})">Editar</button>
                <button class="text-red-500 hover:text-red-700 ml-4" onclick="eliminarCita(${cita.cita_id})">Eliminar</button>
            </td>
        `;

        citasTable.appendChild(row);

    } catch (error) {
        citasTable.innerHTML = "";
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
});

const editarCita = (citaId) => {
    window.location.href = `editar_cita.html?id=${citaId}`;
};

const eliminarCita = async (citaId) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
        try {
            const response = await fetch(`${API_URL}/${citaId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Error al eliminar la cita");

            alert("Cita eliminada con exito");
            cargarCitas();
        } catch (error) {
            alert("Error: " + error.message);
        }
    }
};

cargarCitas();



