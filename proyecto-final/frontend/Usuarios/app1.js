function usuarioForm() {
    return {
        usuario: {
            nombre: '',
            correo: '',
            contraseña: '',
            edad: '',
            genero: 'masculino',
            ubicacion: '',
            preferencias: ''
        },
        loading: false,
        errorMessage: '',

        async submitForm() {
            this.loading = true;
            this.errorMessage = '';

            const usuarioData = {
                nombre: this.usuario.nombre,
                correo: this.usuario.correo,
                contraseña: this.usuario.contraseña,
                edad: parseInt(this.usuario.edad),
                genero: this.usuario.genero,
                ubicacion: this.usuario.ubicacion,
                preferencias: this.usuario.preferencias.split(',').map(item => item.trim()),
                reseñas: [],
                historial_búsquedas: []
            };

            try {
                const response = await fetch('http://localhost:3002/api/Usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuarioData),
                });

                if (response.ok) {
                    alert('Usuario creado exitosamente');
                    this.usuario = { nombre: '', correo: '', contraseña: '', edad: '', genero: 'masculino', ubicacion: '', preferencias: '' };
                } else {
                    const data = await response.json();
                    this.errorMessage = data.message || 'Error desconocido';
                }
            } catch (error) {
                this.errorMessage = 'Error al enviar la solicitud: ' + error.message;
            } finally {
                this.loading = false;
            }
        }
    };
}


