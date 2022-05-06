import {readdirSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

function readDirectory(p: string) {
  return readdirSync(p, 'utf8')
  .filter(f => f !== 'index.ts')
  .map(f => resolve(p, f))
}

const testFiles = readDirectory(dirname(fileURLToPath(import.meta.url)))

export default testFiles
