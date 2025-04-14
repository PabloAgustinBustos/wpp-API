import { Router } from "express";
import { validarEditarPerfilDTO } from "../middleware/perfil";
import { editarPerfil } from "../controllers/perfil";

const perfilRouter = Router()

perfilRouter.put("", validarEditarPerfilDTO, editarPerfil)

export default perfilRouter