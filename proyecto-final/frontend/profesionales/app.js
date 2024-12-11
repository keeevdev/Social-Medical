const API_URL = 'http://localhost:3002/api/ProfesionalesSalud';

async function obtenerProfesionales() {
    try {
        const response = await fetch(API_URL);
        const profesionales = await response.json();
        const tabla = document.getElementById('listaProfesionales');
        tabla.innerHTML = ''; 
        profesionales.forEach(profesional => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${profesional.profesional_id}</td>
                <td>${profesional.nombre}</td>
                <td>${profesional.especialidad}</td>
                <td>${profesional.ubicacion}</td>
                <td>${profesional.experiencia}</td>
                <td>${profesional.horario_atencion.join(', ')}</td>
                <td>${profesional.tarifa}</td>
                <td>${profesional.contacto}</td>
                <td>${profesional.disponibilidad ? 'Sí' : 'No'}</td>
                <td>
                    <button class="px-4 py-2 bg-red-500 text-white rounded" onclick="eliminarProfesional('${profesional.profesional_id}')">Eliminar</button>
                    <button class="px-4 py-2 bg-yellow-500 text-white rounded" onclick="actualizarProfesional('${profesional.profesional_id}')">Actualizar</button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al obtener profesionales:', error);
    }
}

document.getElementById('formAgregar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nuevoProfesional = {
        nombre: document.getElementById('nombre').value,
        especialidad: document.getElementById('especialidad').value,
        ubicacion: document.getElementById('ubicacion').value,
        experiencia: parseInt(document.getElementById('experiencia').value),
        horario_atencion: [document.getElementById('horario_atencion').value],
        tarifa: parseFloat(document.getElementById('tarifa').value),
        contacto: document.getElementById('contacto').value,
        disponibilidad: true
    };
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProfesional)
        });
        if (response.ok) obtenerProfesionales();
    } catch (error) {
        console.error('Error al agregar profesional:', error);
    }
});

async function eliminarProfesional(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) obtenerProfesionales();
    } catch (error) {
        console.error('Error al eliminar profesional:', error);
    }
}

// aun no funciona
async function actualizarProfesional(id) {
    const nuevaDisponibilidad = confirm('¿Marcar disponibilidad como NO?') ? false : true;
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ disponibilidad: nuevaDisponibilidad })
        });
        if (response.ok) obtenerProfesionales();
    } catch (error) {
        console.error('Error al actualizar profesional:', error);
    }
}

obtenerProfesionales();



