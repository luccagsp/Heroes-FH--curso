import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";



export class AppRoutes {

  static get routes(): Router {
    const router = Router()
    
    
    router.use('/api/todos', TodoRoutes.routes) //todo: Como es un middleware se utiliza router.use y no router.get
    return router
  }
}