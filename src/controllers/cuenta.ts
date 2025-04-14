import {Request, Response} from "express";
import * as Cuenta from "../services/cuenta"

type crearCuentaDTO = {
    email: string
    password: string
}
export const crearCuenta = async(request: Request<{}, {}, crearCuentaDTO>, response: Response) => {
    const { email, password } = request.body

    const serviceResponse = await Cuenta.crearCuenta(email, password)

    if (!serviceResponse.error && serviceResponse.nuevaCuenta) {
        response.status(201).json({ 
            nuevaCuenta: serviceResponse.nuevaCuenta 
        })
    } else {
        response.status(400).json(serviceResponse)
    }

}

export const obtenerCuentas = async(request: Request, response: Response) => {
    const cuentas = await Cuenta.obtenerCuentas() as unknown[]

    response.status(200).json({ 
        amount: cuentas.length,
        cuentas 
    })
}