import {Command, Flags} from '@oclif/core'
import Validator from '../validate'
import {lstatSync, existsSync} from 'node:fs'
import {isAbsolute, join} from 'node:path'
export default class Validate extends Command {
  static override description = 'Validate jpm enabled package.json'

  static override examples = ['$ validate .', '$ validate ./package.json']
  static override usage = [
    'validate [package_json_path]',
    'validate [directory]',
  ]

  static override flags = {
    verbose: Flags.boolean({char: 'v', description: 'Verbose mode'}),
  }

  static override strict = false

  static override args = [
    {
      name: 'path',
      description:
        'path to package.json file or directory that contains package.json',
      required: true,
    },
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Validate)

    let path = args['path']

    // checks if argument is a absolute path or not
    if (!isAbsolute(path)) {
      path = join(process.cwd(), path)
    }

    // checks if argument is a directory
    if (lstatSync(path).isDirectory()) {
      path = join(path, 'package.json')
    }

    if (flags.verbose) {
      this.log('validating file: ', path)
    }

    if (!existsSync(path)) {
      this.error(
        'file not exists: ' + flags.verbose ?
          'lookup path ' + path :
          args['path'],
        {exit: 1},
      )
    }

    try {
      const res = Validator.validateFile(path)
      if (res) {
        this.log('true')
      }
    } catch (error) {
      if (flags.verbose) {
        this.error(error as Error)
      }

      this.error('false', {exit: 1})
    }
  }
}
