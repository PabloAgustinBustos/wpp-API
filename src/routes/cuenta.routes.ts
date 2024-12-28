import { Router } from "express";
import { crearCuenta } from "../controllers/cuenta";

const cuentaRouter = Router()

cuentaRouter.post("", crearCuenta)

export default cuentaRouter