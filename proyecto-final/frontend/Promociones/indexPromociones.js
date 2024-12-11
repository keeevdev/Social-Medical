// indexPromociones.js

document.addEventListener('DOMContentLoaded', () => {
    const promocionesTableBody = document.querySelector('#promocionesTable');
    const apiUrl = 'http://localhost:3002/api/PromocionesDescuentos';
    const searchTermInput = document.querySelector('[x-model="searchTerm"]');

    const fetchPromociones = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al obtener promociones');
            }
            const promociones = await response.json();
            renderPromociones(promociones);
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
            promocionesTableBody.innerHTML = '<tr><td colspan="6" class="text-center text-red-500">Error al cargar promociones</td></tr>';
        }
    };

    const renderPromociones = (promociones) => {
        promocionesTableBody.innerHTML = '';
        promociones.forEach(promocion => {
            const row = document.createElement('tr');
            row.classList.add('bg-gray-800', 'hover:bg-gray-700');
            row.innerHTML = `
                <td class="py-3 px-4">${promocion.promocion_id}</td>
                <td class="py-3 px-4">${promocion.nombre_promocion}</td>
                <td class="py-3 px-4">${promocion.descripcion}</td>
                <td class="py-3 px-4">${promocion.descuento}%</td>
                <td class="py-3 px-4">${new Date(promocion.fecha_inicio).toLocaleDateString()}</td>
                <td class="py-3 px-4">${new Date(promocion.fecha_fin).toLocaleDateString()}</td>
                <td class="py-3 px-4 text-center">
                    <button class="text-blue-500 hover:underline">Editar</button> | 
                    <button class="text-red-500 hover:underline ml-2">Eliminar</button>
                </td>
            `;
            promocionesTableBody.appendChild(row);
        });
    };

    searchTermInput.addEventListener('input', async (event) => {
        const term = event.target.value.toLowerCase();
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al buscar promociones');
            }
            const promociones = await response.json();
            const filteredPromociones = promociones.filter(promo => 
                promo.nombre_promocion.toLowerCase().includes(term)
            );
            renderPromociones(filteredPromociones);
        } catch (error) {
            console.error('Error al filtrar promociones:', error);
        }
    });

    fetchPromociones();
});