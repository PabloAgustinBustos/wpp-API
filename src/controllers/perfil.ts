import { Request, Response } from "express";

export const editarPerfil = async(request: Request, response: Response) => {
  const {firstName, lastName, birthday, photoURL, description} =  request.body

  // Buscar el perfil y updatearlo
  
}