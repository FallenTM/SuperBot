const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MEMBERS")) {
    let embed = new Discord.RichEmbed()
    .setDescription("User Help")
    .setColor("#15f153")
    .addField("Current commands", "!help and !report")
    .addField("Help Command", "Gets all commands for this bot.")
    .addField("Report Command", "Report a user and send it to an admin.");

    message.reply("Help has been sent to your DM's");
    await message.author.send(embed);
  } else {
    let aembed = new Discord.RichEmbed()
    .setDescription("Admin Help")
    .setColor("#15f153")
    .addField("Current commands", "!help, !report, !addrole, !clear, !kick, !removerole, !addrule")
    .addField("Help Command", "Gets all commands for this bot.")
    .addField("Report Command", "Report a user and send it to an admin.")
    .addField("Addrole Command", "Add a role to a user.")
    .addField("Clear command", "Clear a certain amount of messages in a channel.")
    .addField("Kick command", "Kick a person from the server")
    .addField("RemoveRole command", "Remove a role from a user.")
    .addField("Addrule Command", "Add a rule to the #rules channel");

    message.reply("Help has been sent to your DM's");
    await message.author.send(aembed);
  }
}
module.exports.help = {
  name: "help"
}
