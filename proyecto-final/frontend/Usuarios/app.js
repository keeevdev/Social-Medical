document.addEventListener('DOMContentLoaded', () => {
    const usuariosTableBody = document.querySelector('#usuariosTable');
    const apiUrl = 'http://localhost:3002/api/Usuarios';
    const searchTermInput = document.querySelector('[x-model="searchTerm"]');
    let searchTerm = '';

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

    const filterUsuariosByName = (usuarios, searchTerm) => {
        if (!searchTerm) return usuarios;
        return usuarios.filter(usuario => 
            usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const renderUsuarios = (usuarios) => {
        usuariosTableBody.innerHTML = ''; // Limpiar contenido **IMPORTANTE**
        const filteredUsuarios = filterUsuariosByName(usuarios, searchTerm);

        if (filteredUsuarios.length === 0) {
            usuariosTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="py-2 px-4 text-center text-gray-500">
                        No hay usuarios disponibles
                    </td>
                </tr>
            `;
            return;
        }

        filteredUsuarios.forEach((usuario) => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-700';
            row.innerHTML = `
                <td class="py-2 px-4">${usuario.usuario_id}</td>
                <td class="py-2 px-4">${usuario.nombre}</td>
                <td class="py-2 px-4">${usuario.correo}</td>
                <td class="py-2 px-4">${usuario.edad}</td>
                <td class="py-2 px-4">${usuario.genero}</td>
                <td class="py-2 px-4">${usuario.ubicacion}</td>
                <td class="py-2 px-4">
                    <button onclick="deleteUsuario('${usuario.usuario_id}')" class="text-red-500 hover:text-red-700">
                        Eliminar
                    </button>
                </td>
            `;
            usuariosTableBody.appendChild(row);
        });

        document.querySelector('[x-show="loading"]').style.display = 'none';
    };

    searchTermInput.addEventListener('input', (event) => {
        searchTerm = event.target.value;
        fetchUsuarios();
    });

    const deleteUsuario = async (usuarioId) => {
        const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este usuario?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${apiUrl}/${usuarioId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar el usuario');
            }

            fetchUsuarios();
        } catch (error) {
            console.error('Error al eliminar usuario:', error.message);
            alert(`Error al eliminar el usuario: ${error.message}`);
        }
    };

    fetchUsuarios();
});








