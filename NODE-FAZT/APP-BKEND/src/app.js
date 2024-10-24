import express from "express";
// RUTAS
import routerEmpleados from "./routes/empleados.routes.js";

const app = express();

app.use(express.json())

//usamos las rutas
app.use(routerEmpleados);
// app.use('/api',routerEmpleados); --> podemos pasarle el parametro en el caso de extender la ruta


app.use((req,res,next)=>{ res.status(404).json({ message:'endpoint not found'})})

export default app