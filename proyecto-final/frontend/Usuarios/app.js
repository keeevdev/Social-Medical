document.addEventListener('DOMContentLoaded', () => {
    const usuariosTableBody = document.querySelector('#usuariosTable');

    // la url de la api **IMPORTANTE**
    const apiUrl = 'http://localhost:3002/api/Usuarios';

    const fetchUsuarios = async () => {
        try {
            document.querySelector('[x-show="loading"]').style.display = 'flex';
            document.querySelector('[x-show="errorMessage"]').style.display = 'none';

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error al obtener usuarios: ${response.statusText}`);
            }

            const usuarios = await response.json();
            renderUsuarios(usuarios);
        } catch (error) {
            console.error(error.message);
            document.querySelector('[x-show="loading"]').style.display = 'none';
            document.querySelector('[x-show="errorMessage"]').style.display = 'block';
            document.querySelector('[x-show="errorMessage"]').textContent = 'Error al cargar usuarios.';
        }
    };

    const renderUsuarios = (usuarios) => {
        usuariosTableBody.innerHTML = ''; // Limpiar contenido **IMPORTANTE**
        if (usuarios.length === 0) {
            usuariosTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="py-2 px-4 text-center text-gray-500">
                        No hay usuarios disponibles
                    </td>
                </tr>
            `;
            return;
        }

        usuarios.forEach((usuario) => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-700';
            row.innerHTML = `
                <td class="py-2 px-4">${usuario.usuario_id}</td>
                <td class="py-2 px-4">${usuario.nombre}</td>
                <td class="py-2 px-4">${usuario.correo}</td>
                <td class="py-2 px-4">${usuario.edad}</td>
                <td class="py-2 px-4">${usuario.genero}</td>
                <td class="py-2 px-4">${usuario.ubicacion}</td>
            `;
            usuariosTableBody.appendChild(row);
        });

        document.querySelector('[x-show="loading"]').style.display = 'none';
    };

    fetchUsuarios();
});



