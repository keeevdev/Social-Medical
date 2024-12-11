const apiUrl = 'http://localhost:3002/api/HistorialConsultas'; // Cambia esto si el backend está en otro puerto o dominio

async function obtenerConsultas() {
  try {
    const response = await fetch(apiUrl);
    const consultas = await response.json();
    mostrarConsultas(consultas);
  } catch (error) {
    console.error('Error al obtener las consultas:', error);
  }
}

function mostrarConsultas(consultas) {
  const listaConsultas = document.getElementById('consultasLista');
  listaConsultas.innerHTML = ''; 

  consultas.forEach(consulta => {
    const consultaDiv = document.createElement('div');
    consultaDiv.classList.add('bg-gray-700', 'p-6', 'rounded-lg', 'shadow-md', 'mb-4');
    
    consultaDiv.innerHTML = `
      <p><strong class="text-gray-200">Diagnóstico:</strong> ${consulta.diagnostico}</p>
      <p><strong class="text-gray-200">Notas del Profesional:</strong> ${consulta.notas_profesional}</p>
      <div class="flex justify-between mt-4">
        <button onclick="editarConsulta('${consulta.consulta_id}')" class="px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">Editar</button>
        <button onclick="eliminarConsulta('${consulta.consulta_id}')" class="px-4 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">Eliminar</button>
      </div>
    `;
    listaConsultas.appendChild(consultaDiv);
  });
}

document.getElementById('consultaForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const diagnostico = document.getElementById('diagnostico').value;
  const notas_profesional = document.getElementById('notas_profesional').value;
  const consulta = {
    diagnostico,
    notas_profesional
  };

  try {
    let response;
    if (document.getElementById('consultaForm').dataset.editingId) {
      const id = document.getElementById('consultaForm').dataset.editingId;
      response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(consulta),
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(consulta),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await response.json();
    alert(result.message || 'Consulta guardada');
    obtenerConsultas();
    ocultarFormulario();
  } catch (error) {
    console.error('Error al guardar la consulta:', error);
  }
});

async function editarConsulta(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const consulta = await response.json();
    
    document.getElementById('diagnostico').value = consulta.diagnostico;
    document.getElementById('notas_profesional').value = consulta.notas_profesional;
    document.getElementById('consultaForm').dataset.editingId = consulta.consulta_id;
    mostrarFormulario();
  } catch (error) {
    console.error('Error al obtener los datos para editar:', error);
  }
}

async function eliminarConsulta(id) {
  if (confirm('¿Estas seguro de que deseas eliminar esta consulta?')) {
    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      const result = await response.json();
      alert(result.message || 'Consulta eliminada');
      obtenerConsultas();
    } catch (error) {
      console.error('Error al eliminar la consulta:', error);
    }
  }
}

function mostrarFormulario() {
  document.getElementById('formularioConsulta').style.display = 'block';
}

function ocultarFormulario() {
  document.getElementById('formularioConsulta').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', obtenerConsultas);

