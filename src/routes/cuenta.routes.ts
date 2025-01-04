import { Router } from "express";
import { crearCuenta, obtenerCuentas } from "../controllers/cuenta";

const cuentaRouter = Router()

cuentaRouter.post("", crearCuenta)
cuentaRouter.get("", obtenerCuentas)

export default cuentaRouter