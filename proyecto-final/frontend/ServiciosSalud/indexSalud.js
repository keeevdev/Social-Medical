document.addEventListener('DOMContentLoaded', () => {
    const serviciosTableBody = document.querySelector('#serviciosTable');
    const apiUrl = 'http://localhost:3002/api/ServiciosSalud';
    const searchTermInput = document.querySelector('[x-model="searchTerm"]');

    let searchTerm = '';

    const fetchServicios = async () => {
        try {
            document.querySelector('[x-show="loading"]').style.display = 'flex';
            document.querySelector('[x-show="errorMessage"]').style.display = 'none';

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al obtener servicios: ' + response.statusText);
            }

            const servicios = await response.json();
            renderServicios(servicios);
        } catch (error) {
            console.error(error.message);
            document.querySelector('[x-show="loading"]').style.display = 'none';
            document.querySelector('[x-show="errorMessage"]').style.display = 'block';
            document.querySelector('[x-show="errorMessage"]').textContent = 'Error al cargar servicios.';
        }
    };

    // Filtrar servicios por nombre
    const filterServiciosByName = (servicios, searchTerm) => {
        if (!searchTerm) return servicios;
        return servicios.filter(servicio => 
            servicio.nombre_servicio.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const renderServicios = (servicios) => {
        serviciosTableBody.innerHTML = '';
        const filteredServicios = filterServiciosByName(servicios, searchTerm);

        if (filteredServicios.length === 0) {
            serviciosTableBody.innerHTML = 
                `<tr>
                    <td colspan="6" class="py-2 px-4 text-center text-gray-500">
                        No hay servicios disponibles
                    </td>
                </tr>`;
            return;
        }

        filteredServicios.forEach((servicio) => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-700';
            row.innerHTML = 
                `<td class="py-2 px-4">${servicio.servicio_id}</td>
                 <td class="py-2 px-4">${servicio.nombre_servicio}</td>
                 <td class="py-2 px-4">${servicio.tipo}</td>
                 <td class="py-2 px-4">${servicio.precio}</td>
                 <td class="py-2 px-4">${servicio.duracion} mins</td>
                 <td class="py-2 px-4">
                     <a href="Editar_ServicioSalud.html?id=${servicio.servicio_id}" class="text-blue-500 hover:text-blue-700">Editar</a> |
                     <button class="text-red-500 hover:text-red-700" onclick="deleteServicio(${servicio.servicio_id})">Eliminar</button>
                 </td>`;
            serviciosTableBody.appendChild(row);
        });

        document.querySelector('[x-show="loading"]').style.display = 'none';
    };

    const deleteServicio = async (servicioId) => {
        if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
            try {
                const response = await fetch(`${apiUrl}/${servicioId}`, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error('Error al eliminar el servicio');
                }
                alert('Servicio eliminado con éxito');
                fetchServicios();
            } catch (error) {
                alert(error.message);
            }
        }
    };

    searchTermInput.addEventListener('input', (event) => {
        searchTerm = event.target.value;
        fetchServicios();
    });

    fetchServicios();
});
