const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGER_MEMBERS")) return message.reply("Sorry, but you cannot do that.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (args.length < 2) {
    message.reply("Invalid Usage! !kick <User> <Reason>");
    return;
  }
  if (!rMember) return message.reply("Sorry, Could not find that user.");
  let reason = args.join(" ").slice(22);
  let reportschannel = message.guild.channels.find("name", "reports");
  if (!reportschannel) {
      return message.reply("Sorry, but I could not find the reports channel.");
  }
  reportschannel.send(rMember + " has been kicked by: " + message.author + " with id: " + message.author.id);
  reportschannel.send("Time: " + message.createdAt);
  message.author.send("You kicked: " + rMember + " from: " + message.server.name);
  message.delete(0);
  await message.guild.member(rMember).kick(reason);
}
module.exports.help = {
  name: "kick"
}
