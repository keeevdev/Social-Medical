function especialidadForm() {
    return {
        especialidad: {
            especialidad_id: '',
            nombre: '',
            descripcion: ''
        },
        loading: false,
        errorMessage: '',

        async submitForm() {
            this.loading = true;
            this.errorMessage = '';

            const especialidadData = {
                especialidad_id: parseInt(this.especialidad.especialidad_id),
                nombre: this.especialidad.nombre,
                descripcion: this.especialidad.descripcion
            };

            try {
                const response = await fetch('http://localhost:3002/api/EspecialidadesMedicas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(especialidadData),
                });

                if (response.ok) {
                    alert('Especialidad médica creada exitosamente');
                    this.especialidad = {
                        especialidad_id: '',
                        nombre: '',
                        descripcion: ''
                    };
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
