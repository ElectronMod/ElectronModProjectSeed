const { spawn } = require('child_process')
const { createServer, build } = require('vite')
const electron = require('electron')

process.env.MODE = 'development'

function watchMain(server) {
  let electronProcess = null
  const address = server.httpServer.address()
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_URL: `http://${address.address}:${address.port}`
  })

  return build({
    configFile: 'packages/main/vite.config.js',
    plugins: [
      {
        name: 'electron-main-watcher',
        writeBundle() {
          electronProcess && electronProcess.kill()
          electronProcess = spawn(electron, ['.'], { stdio: 'inherit', env })
        }
      }
    ],
    build: {
      watch: true
    }
  })
}

function watchPreload(server) {
  return build({
    configFile: 'packages/preload/vite.config.js',
    plugins: [
      {
        name: 'electron-preload-watcher',
        writeBundle() {
          server.ws.send({ type: 'full-reload' })
        }
      }
    ],
    build: {
      watch: true
    }
  })
}

;(async () => {
  const server = await createServer({ configFile: 'packages/renderer/vite.config.js' })
  await server.listen()
  await watchPreload(server)
  await watchMain(server)
})()
