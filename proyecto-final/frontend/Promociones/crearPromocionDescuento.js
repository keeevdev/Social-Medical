function promocionForm() {
    return {
        promocion: {
            nombre_promocion: '',
            descripcion: '',
            descuento: '',
            fecha_inicio: '',
            fecha_fin: '',
            profesional_id: ''
        },
        loading: false,
        errorMessage: '',

        async submitForm() {
            this.loading = true;
            this.errorMessage = '';

            const promocionData = {
                nombre_promocion: this.promocion.nombre_promocion,
                descripcion: this.promocion.descripcion,
                descuento: parseFloat(this.promocion.descuento),
                fecha_inicio: new Date(this.promocion.fecha_inicio).toISOString(),
                fecha_fin: new Date(this.promocion.fecha_fin).toISOString(),
                profesional_id: parseInt(this.promocion.profesional_id)
            };

            try {
                const response = await fetch('http://localhost:3002/api/PromocionesDescuentos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(promocionData),
                });

                if (response.ok) {
                    alert('Promoción creada exitosamente');
                    this.promocion = {
                        nombre_promocion: '',
                        descripcion: '',
                        descuento: '',
                        fecha_inicio: '',
                        fecha_fin: '',
                        profesional_id: ''
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
