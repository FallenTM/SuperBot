const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, but you cannot manager messages.");
  if(!args[0]) return message.reply("Sorry, but you must specify an amount of messages to delete.")
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send("Cleared: " + args[0] + " messages").then(msg => msg.delete(2000));
});
module.exports.help = {
  name: "clear"
}
