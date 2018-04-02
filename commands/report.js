const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let reportschannel = message.guild.channels.find("name", "reports");
  if (!reportschannel) {
      return message.reply("Sorry, but I could not find the reports channel.");
  }
  if (args.length < 2) {
    message.reply("Invalid Usage! !report <User> <Reason>");
    return;
  } else {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.reply("Sorry, but I could not find the user specified.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", rUser + " with ID: " + rUser.id)
    .addField("Reported by:", message.author + " with ID: " + message.author.id)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    message.delete(0);
    reportschannel.send(reportEmbed);
    message.author.send("You reported a user. User: " + rUser);
  }
}
module.exports.help = {
  name: "report"
}
