import { Server } from "./presentation/server"
import { envs } from "./config/envs"

(() => {
  main()
})()

async function main() {
  
  const server = new Server({
    port: envs.PORT,
    public_folder: envs.PUBLIC_PATH
  })
  server.start()
}
