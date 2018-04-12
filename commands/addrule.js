const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMININSTRATOR")) return message.reply("Sorry, but you cannot do this.");
  let ruleChannel = message.guild.channels.find("name", "rules");
  if (!ruleChannel) return message.reply("Sorry, but I could not find the #rules channel.");

  if (args.length == 0) {
    message.reply("Invalid Usage! !addrule <Rule>");
    return;
  }
  let arg = args.join(" ").slice(22);
  let embed = new Discord.RichEmbed();
  if (!embed) {
    message.reply("Sorry, but I could not find the embed. Please try again.")
  }
  embed.setDescription("Rules");
  await embed.addField(arg);
  ruleChannel.send(embed);
  message.reply("Added rule to rules channel.");
}
module.exports.help = {
  name: "addrule"
}
