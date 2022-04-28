import { Command, Flags } from "@oclif/core";

export default class Validate extends Command {
  static override description = "describe the command here";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  static override flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: "f" }),
  };

  static override args = [{ name: "file" }];

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Validate);

    const name = flags.name ?? "world";
    this.log(
      `hello ${name} from /home/nau/sdu/jpm-schema/src/commands/validate.ts`
    );
    if (args["file"] && flags.force) {
      this.log(`you input --force and --file: ${args["file"]}`);
    }
  }
}
