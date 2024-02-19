import express, { Router } from 'express'
import path from 'path'


interface Props {
  port: number,
  routes: Router,
  public_folder?: string
}


export class Server {
  private app = express()
  private readonly port: number;
  private readonly publicFolder: string;
  private readonly routes: Router

  constructor(props: Props){
    const {port, public_folder = 'public', routes} = props
    this.port = port
    this.publicFolder = public_folder;
    this.routes = routes;
  }


  async start() {
    const port = 3000

    //* middlewares
    this.app.use(express.json()) // raw
    this.app.use(express.urlencoded({extended: true})) // x-www.form-urlencoded


    //*public folder
    this.app.use(express.static(this.publicFolder))

    //*Routes
    this.app.use(this.routes)

    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicFolder}/index.html`)
      res.sendFile(indexPath) //! El index recibe el URL y react se encarga de construir la pagina segun la URL
    })




    this.app.listen(this.port, () => {
      console.log(`server running on: : http://localhost:${this.port}`)
    })

  }
}