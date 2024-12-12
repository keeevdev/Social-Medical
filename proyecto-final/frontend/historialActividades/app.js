document.addEventListener('DOMContentLoaded', async () => {
    const API_URL = 'http://localhost:3002/api/HistorialActividades';
    const tableBody = document.getElementById('actividadesTable');
    const loadingIndicator = document.getElementById('loading');
    const errorContainer = document.getElementById('errorMessage');
    const form = document.getElementById('addActivityForm');

    const usuarioId = localStorage.getItem('usuario_id') || 'default_id';

    const renderActividades = (actividades) => {
        tableBody.innerHTML = '';
        actividades.forEach((actividad) => {
            const row = document.createElement('tr');
            row.classList.add('hover:bg-gray-700');

            row.innerHTML = `
                <td class="py-2 px-4">${actividad.actividad_id}</td>
                <td class="py-2 px-4">${actividad.usuario_id}</td>
                <td class="py-2 px-4">${actividad.descripcion}</td>
                <td class="py-2 px-4">${new Date(actividad.fecha).toLocaleString()}</td>
                <td class="py-2 px-4">${actividad.tipo_actividad}</td>
            `;
            tableBody.appendChild(row);
        });
    };

    const fetchActividades = async () => {
        loadingIndicator.style.display = 'block';
        errorContainer.style.display = 'none';

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Error al obtener las actividades');
            }
            const actividades = await response.json();
            renderActividades(actividades);
        } catch (error) {
            console.error(error);
            errorContainer.textContent = error.message;
            errorContainer.style.display = 'block';
        } finally {
            loadingIndicator.style.display = 'none';
        }
    };

    const addActividad = async (actividad) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(actividad),
            });

            if (!response.ok) {
                throw new Error('Error al agregar la actividad');
            }

            await fetchActividades();
        } catch (error) {
            console.error(error);
            alert('Hubo un error al agregar la actividad: ' + error.message);
        }
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const actividad = {
            usuario_id: usuarioId,
            descripcion: form.descripcion.value,
            fecha: new Date().toISOString(),
            tipo_actividad: form.tipo_actividad.value,
        };

        await addActividad(actividad);

        form.reset();
    });

    await fetchActividades();
});





