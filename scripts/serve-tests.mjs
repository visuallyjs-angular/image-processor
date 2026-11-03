// Serve the browser regression suite and production Angular app on one origin.
import { build } from 'esbuild'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
const root = resolve(import.meta.dirname, '..')
const app = resolve(root, 'dist/image-processor/browser')
const result = await build({ entryPoints: [resolve(root, 'tests/runner.ts')], bundle: true, format: 'esm', write: false })
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' }
createServer(async (req, res) => {
    const path = new URL(req.url, 'http://localhost').pathname
    if (path === '/tests/runner.ts') {
        res.setHeader('Content-Type', 'text/javascript')
        res.end(result.outputFiles[0].contents)
        return
    }
    const directory = path.startsWith('/tests/') ? root : app
    const file = resolve(directory, '.' + (path.endsWith('/') ? path + 'index.html' : path))
    if (!file.startsWith(directory + sep)) { res.writeHead(403).end(); return }
    try {
        res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream')
        res.end(await readFile(file))
    } catch { res.writeHead(404).end('Not found') }
}).listen(5184, '127.0.0.1', () => console.log('Browser regression suite: http://127.0.0.1:5184/tests/'))
