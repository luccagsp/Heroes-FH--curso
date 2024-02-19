import { Server } from "./presentation/server"
import { envs } from "./config/envs"
import { AppRoutes } from "./presentation/routes"

(() => {
  main()
})()

async function main() {
  
  const server = new Server({
    port: envs.PORT,
    public_folder: envs.PUBLIC_PATH,
    routes: AppRoutes.routes
  })
  server.start()
}
