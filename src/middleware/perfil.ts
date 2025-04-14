import { NextFunction, Request, Response } from "express";

export const validarEditarPerfilDTO = (request: Request, response: Response, next: NextFunction) => {
  const {firstName, lastName, birthday, photoURL, description} =  request.body

  const faltantes = []

  if (!firstName) faltantes.push("firstName")
  if (!lastName) faltantes.push("lastName")
  if (!birthday) faltantes.push("birthday")
  if (!photoURL) faltantes.push("photoURL")
  if (!description) faltantes.push("description")
  
  if (faltantes.length > 0) {
    response.status(400).json({
      message: "Faltan datos para crear la cuenta",
      faltantes
    })
  } else {
    next()
  }
}