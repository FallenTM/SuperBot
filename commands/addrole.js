const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGER_MEMBERS")) return message.reply("Sorry, but you cannot do that.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return message.reply("Sorry, Could not find that user.");
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Specifiy a role!");
  let gRole = message.guild.roles.find("name", role);
  if (!gRole) return message.reply("Sorry, but that role doesn't exist.");

  if (rMember.roles.has(gRole.id)) return message.reply("Sorry but that user already has that role.");
  await (rMember.addRole(gRole.id));

  message.delete(0);
  message.channel.send(rMember + " has been given the role " + gRole.name);
}

module.exports.help = {
  name: "addrole"
}
