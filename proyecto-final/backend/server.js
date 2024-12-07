const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

const mongoURI = 'mongodb+srv://kevdev:dtgjcpG2puHCk6eh@proyectonosql.bjqwp.mongodb.net/socialMedicalDB1?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.log('Error al conectar a MongoDB Atlas: ', err));

const alertasNotificacionesRoutes = require('./routes/alertasNotificacionesRoutes');
const citasReservasRoutes = require('./routes/citasReservasRoutes');
const especialidadesMedicasRoutes = require('./routes/especialidadesMedicasRoutes');
const historialActividadesRoutes = require('./routes/historialActividadesRoutes');
const historialConsultasRoutes = require('./routes/historialConsultasRoutes');
const mensajesComunicacionesRoutes = require('./routes/mensajesComunicacionesRoutes');
const pagosTransaccionesRoutes = require('./routes/pagosTransaccionesRoutes');
const profesionalesSaludRoutes = require('./routes/profesionalesSaludRoutes');
const promocionesDescuentosRoutes = require('./routes/promocionesDescuentosRoutes');
const reseñasCalificacionesRoutes = require('./routes/reseñasCalificacionesRoutes');
const serviciosSaludRoutes = require('./routes/serviciosSaludRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/api', alertasNotificacionesRoutes);
app.use('/api', citasReservasRoutes);
app.use('/api', especialidadesMedicasRoutes);
app.use('/api', historialActividadesRoutes);
app.use('/api', historialConsultasRoutes);
app.use('/api', mensajesComunicacionesRoutes);
app.use('/api', pagosTransaccionesRoutes);
app.use('/api', profesionalesSaludRoutes);
app.use('/api', promocionesDescuentosRoutes);
app.use('/api', reseñasCalificacionesRoutes);
app.use('/api', serviciosSaludRoutes);
app.use('/api', usuarioRoutes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});






