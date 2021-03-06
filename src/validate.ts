import schema from '../schemas/schema.json'
import Ajv2019, {ValidateFunction} from 'ajv/dist/2020'
import addFormats from 'ajv-formats'
import {readFileSync} from 'node:fs'
const ajv = new Ajv2019({
  allowUnionTypes: true,
  allowMatchingProperties: true,
})
addFormats(ajv)
class Validator {
  validateFn: ValidateFunction<{
    [x: string]: Record<string, unknown>;
  }>

  constructor() {
    this.validateFn = ajv.compile(schema)
  }

  public validate(packageJson: { [x: string]: Record<string, unknown> }): boolean {
    const valid = this.validateFn(packageJson)
    if (!valid) {
      throw this.validateFn.errors
    }

    return valid
  }

  public validateFile(path: string): boolean {
    return this.validate(JSON.parse(readFileSync(path, 'utf8')))
  }
}

const validator = new Validator()

export default validator
