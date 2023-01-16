import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import authRouter from './app/routers/auth';
import cargoRouter from './app/routers/cargo';
import estatusHabitacionRouter from './app/routers/estatusHabitacion';
import habitacionRouter from './app/routers/habitacion';
import pagoRouter from './app/routers/pago';
import reservacionRouter from './app/routers/reservacion';
import rolesRouter from './app/routers/roles';
import tipoHabitacionRouter from './app/routers/tipoHabitacion';
import tipoPagoRouter from './app/routers/tipoPago';
import trabajadorRouter from './app/routers/trabajador';
import usuarioRouter from './app/routers/usuario';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/cargo', cargoRouter);
app.use('/estatusHabitacion', estatusHabitacionRouter);
app.use('/habitacion', habitacionRouter);
app.use('/pago', pagoRouter);
app.use('/reservacion', reservacionRouter);
app.use('/roles', rolesRouter);
app.use('/tipoHabitacion', tipoHabitacionRouter);
app.use('/tipoPago', tipoPagoRouter);
app.use('/trabajador', trabajadorRouter);
app.use('/usuario', usuarioRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
