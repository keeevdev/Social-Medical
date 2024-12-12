document.addEventListener('DOMContentLoaded', () => {
    const resenasTableBody = document.querySelector('#resenasTable');
    const apiUrl = 'http://localhost:3002/api/ResenasCalificaciones';
    const searchTermInput = document.querySelector('[x-model="searchTerm"]');

    const fetchResenas = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al obtener reseñas');
            }
            const resenas = await response.json();
            renderResenas(resenas);
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
            resenasTableBody.innerHTML = '<tr><td colspan="5" class="text-center text-red-500">Error al cargar reseñas</td></tr>';
        }
    };

    const renderResenas = (resenas) => {
        resenasTableBody.innerHTML = '';
        resenas.forEach(resena => {
            const row = document.createElement('tr');
            row.classList.add('bg-gray-800', 'hover:bg-gray-700');
            row.innerHTML = `
                <td class="py-3 px-4">${resena.reseña_id}</td>
                <td class="py-3 px-4">${resena.usuario_id}</td>
                <td class="py-3 px-4">${resena.profesional_id}</td>
                <td class="py-3 px-4">${resena.comentario}</td>
                <td class="py-3 px-4">${resena.calificacion}</td>
                <td class="py-3 px-4 text-center">${new Date(resena.fecha).toLocaleDateString()}</td>
            `;
            resenasTableBody.appendChild(row);
        });
    };

    searchTermInput.addEventListener('input', async (event) => {
        const term = event.target.value.toLowerCase();
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al buscar reseñas');
            }
            const resenas = await response.json();
            const filteredResenas = resenas.filter(resena => 
                resena.comentario.toLowerCase().includes(term)
            );
            renderResenas(filteredResenas);
        } catch (error) {
            console.error('Error al filtrar reseñas:', error);
        }
    });

    fetchResenas();
});
