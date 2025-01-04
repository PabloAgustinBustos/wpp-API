import { Router } from "express";
import { crearCuenta, obtenerCuentas } from "../controllers/cuenta";
import { validarCrearCuentaDTO } from "../middleware/cuenta";

const cuentaRouter = Router()

cuentaRouter.post("", validarCrearCuentaDTO, crearCuenta)
cuentaRouter.get("", obtenerCuentas)

export default cuentaRouter