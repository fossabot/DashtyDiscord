import { readdirSync } from 'fs';

export = (bot) => {
  const load = (directories: string) => {
    const commands = readdirSync(`${__dirname}../../commands/${directories}/`).filter((d) => d.endsWith('.js'));
    commands.forEach((commandFile) => {
      const command = require(`${__dirname}../../commands/${directories}/${commandFile}`);
      bot.commands.set(command.config.name, command);
      if (command.config.aliases) command.config.aliases.forEach((alias: any) => bot.aliases.set(alias, command.config.name));
    });
  };
  ['misc', 'moderation'].forEach((folder) => load(folder));
};