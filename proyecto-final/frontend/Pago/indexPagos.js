document.addEventListener('DOMContentLoaded', () => {
    const pagosTableBody = document.querySelector('#pagosTable');
    const apiUrl = 'http://localhost:3002/api/PagosTransacciones';
    const searchTermInput = document.querySelector('[x-model="searchTerm"]');

    async function fetchPagos() {
        try {
            const response = await fetch(apiUrl);
            const pagos = await response.json();
            renderPagos(pagos);
        } catch (error) {
            console.error('Error al obtener pagos:', error.message);
        }
    }

    function renderPagos(pagos) {
        pagosTableBody.innerHTML = '';
        pagos.forEach(pago => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="py-3 px-4">${pago.transaccion_id}</td>
                <td class="py-3 px-4">${pago.usuario_id}</td>
                <td class="py-3 px-4">${pago.servicio_id}</td>
                <td class="py-3 px-4">$${pago.monto.toFixed(2)}</td>
                <td class="py-3 px-4">${new Date(pago.fecha).toLocaleDateString()}</td>
                <td class="py-3 px-4">${pago.estado_pago}</td>
                <td class="py-3 px-4">
                    <button class="text-indigo-500 hover:underline" onclick="editPago(${pago.transaccion_id})">Editar</button> |
                    <button class="text-red-500 hover:underline" onclick="deletePago(${pago.transaccion_id})">Eliminar</button>
                </td>
            `;
            pagosTableBody.appendChild(row);
        });
    }

    async function deletePago(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Pago eliminado correctamente');
                fetchPagos();
            } else {
                console.error('Error al eliminar el pago');
            }
        } catch (error) {
            console.error('Error al eliminar el pago:', error.message);
        }
    }

    searchTermInput.addEventListener('input', async () => {
        const searchTerm = searchTermInput.value.trim().toLowerCase();
        const response = await fetch(apiUrl);
        const pagos = await response.json();
        const filteredPagos = pagos.filter(pago =>
            String(pago.usuario_id).toLowerCase().includes(searchTerm)
        );
        renderPagos(filteredPagos);
    });

    fetchPagos();
});
