const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs-extra')
const { build } = require('vite')
const buildConfig = require('./build.config')

process.env.MODE = 'production'

const isPkg = (pathToCheck) => {
  return path.basename(path.dirname(pathToCheck)) === 'node_modules'
}

const hasPkg = (pkg, pkgs) => {
  for (let i = 0; i < pkgs.length; i++) {
    if (pkgs[i] == pkg) {
      return true
    }
  }
  return false
}

const addPkgDeps = async (pkgDir, pkgs) => {
  const pkgPath = path.join(pkgDir, 'package.json')
  const pkgJson = await fs.readJSON(pkgPath)
  if (!pkgJson) {
    return
  }

  const pkgName = 'node_modules/' + pkgJson.name
  if (hasPkg(pkgName, pkgs)) {
    return
  }

  if (isPkg(pkgDir)) {
    pkgs.push(pkgName)
  }

  if (pkgJson.dependencies) {
    Object.keys(pkgJson.dependencies).forEach(async (name) => {
      const pkgDir = path.join(buildConfig.dir, `node_modules/${name}`)
      await addPkgDeps(pkgDir, pkgs)
    })
  }
}

const findPkgDeps = async () => {
  const pkgs = []
  await addPkgDeps(buildConfig.dir, pkgs)
  return pkgs
}

const getPackageFilter = async () => {
  const pkgs = await findPkgDeps()

  return (file) => {
    let name = file.split(buildConfig.dir)[1]

    if (path.sep === '\\') {
      name = name.replace(/\\/g, '/')
    }

    return isPkg(file)
      ? hasPkg(name, pkgs)
      : !buildConfig.ignores.some((regex) => name.match(regex))
  }
}

const bundle = async () => {
  await fs.remove(buildConfig.out)

  const bin = path.join(__dirname, 'asar.exe')

  let src = null
  let dest = null

  src = path.join(buildConfig.dir, 'dist')
  dest = path.join(buildConfig.out, 'app/dist')
  await fs.copy(src, dest)

  src = path.join(buildConfig.dir, 'package.json')
  dest = path.join(buildConfig.out, 'app/package.json')
  let packageJson = await fs.readJSON(src)
  await fs.writeJSON(dest, {
    version: packageJson.version,
    name: packageJson.name,
    main: packageJson.main
  })

  src = path.join(buildConfig.out, 'app')
  dest = path.join(buildConfig.out, 'app.bin')
  execSync(bin + ` p "${src}" "${dest}"`)

  await fs.remove(src)

  const packageFilter = await getPackageFilter(buildConfig.dir)

  src = path.join(buildConfig.dir, 'node_modules')
  dest = path.join(buildConfig.out, 'modules')
  await fs.copy(src, dest, {
    filter: (file) => {
      return packageFilter(file)
    }
  })

  src = path.join(buildConfig.out, 'modules')
  dest = path.join(buildConfig.out, 'modules.bin')
  execSync(bin + ` p "${src}" "${dest}"`)

  await fs.remove(src)
}

;(async () => {
  await fs.remove(path.join(buildConfig.dir, 'dist'))

  await build({ configFile: 'packages/main/vite.config.js' })
  await build({ configFile: 'packages/preload/vite.config.js' })
  await build({ configFile: 'packages/renderer/vite.config.js' })

  await bundle()
})()
