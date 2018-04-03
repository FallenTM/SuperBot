const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry, but you cannot do that.");
  let user = message.guild.member(message.mentions.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("Sorry, but I cannot find the user specified.");
  if (user.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry, but you cannot do that.");
  let reason = args.join(" ").slice(22);

  if (!warns[user.id]) warns[user.id] = {
    warns: 0
  };
  warns[user.id].warns++;
  fs.writeFile("./warnings.json", JSON.stringify(warns) (err) => {
    if (err) console.log(err);
  });
  let Embed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned user: ", user.name)
  .addField("Warned in: ", message.channel)
  .addField("Number of Warns", warns[user.id].warns)
  .addField("Reason", reason);

  let warnChannel = message.guild.channels.find("name", "warns");
  if (!warnChannel) return message.reply("Sorry, but I cannot find the #warns channel.");

  warnChannel.send(Embed);
  message.reply("That user has now been warned.");

  if (warns[user.id].warns == 2) {
    let muteR = message.guild.roles.find("name", "muted");
    if (!muteR) return message.reply("I cannot find the role muted.");
    let muteTime = "30m";
    await (user.addRole(muteR.id));
    message.channel.send(user.name + " has been muted for: " + muteTime);

    setTimeout(function() {
      user.removeRole(muteR.id);
      message.reply("That user has now been unmuted.");
    }, ms(muteTime))
  }
  if (warns[user.id].warns == 4) {
    user.send("You have been kicked from the server: " + message.server);
    await message.guild.member(user).kick(reason);
    warns[user.id].warns = 0;
  }
}

module.exports.help = {
  name: "warn"
}
