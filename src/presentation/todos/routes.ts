import { Router } from "express";
import { TodosController } from "./controller";



export class TodoRoutes {

  static get routes(): Router {
    
    const router = Router()
    
    const todoController = new TodosController()
    
    
    router.get('/', todoController.getTodos)//todo: El get es '/' por que se asume que la ruta que le mande su middleware es su punto de partida
    router.get('/:id', todoController.getTodoById)//todo: :id es una sintaxis especial de express
    router.post('/', todoController.postTodo)//todo: :id es una sintaxis especial de express
    router.delete('/:id', todoController.deleteTodo)//todo: :id es una sintaxis especial de express
    return router 
  }
}