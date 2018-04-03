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
  let Embed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#15f153")
  .addField("Kicked User: " + rMember + " with ID: " + rMember.id)
  .addField("Sent by: " + message.author)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason)

  message.author.send("You kicked: " + rMember);
  message.delete(0);
  reportschannel.send(Embed);
  await message.guild.member(rMember).kick(reason);
}
module.exports.help = {
  name: "kick"
}
