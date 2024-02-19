import { Request, Response } from "express"

const todos = [
  {id:1, text: 'Buy caca', createdAt: new Date()},
  {id:2, text: 'Buy books', createdAt: null},
  {id:3, text: 'Buy phones', createdAt: new Date()},
]

export class TodosController {

  //*DI Dependency injection
  constructor() {

  }

  public getTodos = (req:Request, res:Response) => {
    return res.json(todos)
  }

  public getTodoById = (req:Request, res:Response) => {
    const id = +req.params.id
    if (isNaN(id)) res.status(400).json({error: `id must be a number`}) //! Status 400 is for bad request
    const todo = todos.find(todo => todo.id === id)
    if (todo) {
      res.json(todo)
    } else {
      res.status(404).json({error: `TODO with id: ${id} not found`})
    }
  }

  public postTodo = (req:Request, res:Response) => {
    const {text} = req.body
    if (!text) return res.status(400).json({error: 'text is required'})
    const newTodo = {
      id: todos.length + 1,
      text: text,
      createdAt: null
    }
    
    todos.push(newTodo)
    res.json(newTodo)
  }

  public updateTodo = (req:Request, res:Response) => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({error: `id must be a number`})
    
    const todo = todos.find(todo => todo.id === id)
    if (!todo) return res.status(404).json({error: `todo not found with id:${id}`}) 

    const {text, createdAt} = req.body()
    todo.text = text || todo.text

    if (createdAt === 'null') {
      todo.createdAt = null
    } else {
      todo.createdAt = new Date(createdAt || todo.createdAt)
    }
  }

  public deleteTodo = (req:Request, res:Response) => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({error: `id must be a number`}) //! Status 400 is for bad request

    const todo = todos.find(todo => todo.id === id)

    if (!todo) return res.status(404).json({error: `TODO with id: ${id} not found`}) 

    const index = todos.findIndex(todo => todo.id === id)
    res.json(todo)
    todos.splice(index, 1)

  }
}