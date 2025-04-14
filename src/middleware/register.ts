import { NextFunction, Request, Response } from "express";

export const validarRegisterDTO = (request: Request, response: Response, next: NextFunction) => {
  const {email, username, password} =  request.body

  const faltantes = []

  if (!email) faltantes.push("email")
  if (!username) faltantes.push("username")
  if (!password) faltantes.push("password")
  
  if (faltantes.length > 0) {
    response.status(400).json({
      message: "Faltan datos para crear la cuenta",
      faltantes
    })
  } else {
    next()
  }
}