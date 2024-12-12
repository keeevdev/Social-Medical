// indexEspecialidades.js

document.addEventListener('DOMContentLoaded', () => {
    const especialidadesTableBody = document.querySelector('#especialidadesTable');
    const apiUrl = 'http://localhost:3002/api/EspecialidadesMedicas';
    const searchTermInput = document.querySelector('[x-model="searchTerm"]');

    const fetchEspecialidades = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al obtener especialidades');
            }
            const especialidades = await response.json();
            renderEspecialidades(especialidades);
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
            especialidadesTableBody.innerHTML = '<tr><td colspan="4" class="text-center text-red-500">Error al cargar especialidades</td></tr>';
        }
    };

    const renderEspecialidades = (especialidades) => {
        especialidadesTableBody.innerHTML = '';
        especialidades.forEach(especialidad => {
            const row = document.createElement('tr');
            row.classList.add('bg-gray-800', 'hover:bg-gray-700');
            row.innerHTML = `
                <td class="py-3 px-4">${especialidad.especialidad_id}</td>
                <td class="py-3 px-4">${especialidad.nombre}</td>
                <td class="py-3 px-4">${especialidad.descripcion}</td>
                <td class="py-3 px-4 text-center">
                    <button class="text-blue-500 hover:underline">Editar</button> | 
                    <button class="text-red-500 hover:underline ml-2">Eliminar</button>
                </td>
            `;
            especialidadesTableBody.appendChild(row);
        });
    };

    searchTermInput.addEventListener('input', async (event) => {
        const term = event.target.value.toLowerCase();
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al buscar especialidades');
            }
            const especialidades = await response.json();
            const filteredEspecialidades = especialidades.filter(especialidad => 
                especialidad.nombre.toLowerCase().includes(term)
            );
            renderEspecialidades(filteredEspecialidades);
        } catch (error) {
            console.error('Error al filtrar especialidades:', error);
        }
    });

    fetchEspecialidades();
});
