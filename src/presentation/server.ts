import express from 'express'
import path from 'path'


interface Props {
  port: number,
  public_folder?: string
}


export class Server {
  private app = express()
  private port: number;
  private publicFolder: string;

  constructor(props: Props){
    const {port, public_folder = 'public'} = props
    this.port = port
    this.publicFolder = public_folder
    
  }


  async start() {
    const port = 3000

    //* middlewares or public folder
    this.app.use(express.static(this.publicFolder))

    this.app.get('*', (req, res) => {

      const indexPath = path.join(__dirname + `../../../${this.publicFolder}/index.html`)
      res.sendFile(indexPath)
    })



    this.app.listen(this.port, () => {
      console.log(`server running on port: ${this.port}`)
    })

  }
}