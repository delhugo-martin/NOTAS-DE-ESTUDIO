import { Router } from "express";

//importamos controladores
import {
  getEmpleados,
  postEmpleados,
  putEmpleados,
  deleteEmpleados,
  getEmpleadosById,
  patchEmpleados
} from "../controllers/empleados.controllers.js";

const router = Router();

router.get("/empleados", getEmpleados);

router.get("/empleados/:id", getEmpleadosById);

router.post("/empleados", postEmpleados);

router.put("/empleados/:id", putEmpleados);

router.patch("/empleados/:id", patchEmpleados);
// usamos PATCH en el caso de querer actualizar parcialmente un registro
// (es una consideracion REST)

router.delete("/empleados/:id", deleteEmpleados);

export default router;
