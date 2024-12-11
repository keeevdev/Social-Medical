function servicioForm() {
    return {
        servicio: {
            nombre_servicio: '',
            tipo: '',
            descripcion: '',
            precio: '',
            duracion: '',
            categorias: '',
            profesional_id: ''
        },
        loading: false,
        errorMessage: '',
        servicio_id: new URLSearchParams(window.location.search).get('id'), 
        async cargarServicio() {
            if (!this.servicio_id) {
                this.errorMessage = 'ID del servicio no proporcionado.';
                return;
            }

            try {
                const response = await fetch(`http://localhost:3002/api/ServiciosSalud/${this.servicio_id}`);
                const data = await response.json();

                if (response.ok) {
                    this.servicio = data.servicio;
                } else {
                    this.errorMessage = data.message || 'Error desconocido';
                }
            } catch (error) {
                this.errorMessage = 'Error al cargar el servicio: ' + error.message;
            }
        },

        async submitForm() {
            this.loading = true;
            this.errorMessage = '';

            const servicioData = {
                servicio_id: this.servicio_id,
                nombre_servicio: this.servicio.nombre_servicio,
                tipo: this.servicio.tipo,
                descripcion: this.servicio.descripcion,
                precio: parseFloat(this.servicio.precio),
                duracion: parseInt(this.servicio.duracion),
                categorias: this.servicio.categorias.split(',').map(item => item.trim()),
                profesional_id: parseInt(this.servicio.profesional_id)
            };

            try {
                const response = await fetch(`http://localhost:3002/api/ServiciosSalud/${this.servicio_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(servicioData),
                });

                if (response.ok) {
                    alert('Servicio actualizado exitosamente');
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
