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
        servicio_id: localStorage.getItem('servicio_id') ? parseInt(localStorage.getItem('servicio_id')) : 1,

        async submitForm() {
            this.loading = true;
            this.errorMessage = '';


            const servicioData = {
                servicio_id: this.servicio_id++,
                nombre_servicio: this.servicio.nombre_servicio,
                tipo: this.servicio.tipo,
                descripcion: this.servicio.descripcion,
                precio: parseFloat(this.servicio.precio),
                duracion: parseInt(this.servicio.duracion),
                categorias: this.servicio.categorias.split(',').map(item => item.trim()),
                profesional_id: parseInt(this.servicio.profesional_id)
            };

            // Guardamos el nuevo valor de servicio_id en localStorage
            localStorage.setItem('servicio_id', this.servicio_id);

            try {
                const response = await fetch('http://localhost:3002/api/ServiciosSalud', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(servicioData),
                });

                if (response.ok) {
                    alert('Servicio creado exitosamente');
                    this.servicio = { nombre_servicio: '', tipo: '', descripcion: '', precio: '', duracion: '', categorias: '', profesional_id: '' };
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