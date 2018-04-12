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
  let embed = new Discord.RichEmbed
  .setDescription("Rules")
  .addField("Rules:" + arg);
  await ruleChannel.send(embed);
}
module.exports.help = {
  name: "addrule"
}
