import {readdirSync} from 'node:fs'
import {resolve} from 'node:path'

function readDirectory(p: string) {
  return readdirSync(p, 'utf8')
  .filter(f => f !== 'index.ts')
  .map(f => resolve(p, f))
}

// eslint-disable-next-line unicorn/prefer-module
const testFiles = readDirectory(__dirname)

export default testFiles
