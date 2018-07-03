module.exports= {
  common_names: ['nickall','na'],
  title: "Nickname all",
  description: "It will change everyone nickname",
  example: "!nickall <optional:new nickname>",
  handle: function(bot){
    bot.message.guild.members.forEach(function(value,key){value.setNickname(bot.args[0]).then(bot.message.channel.send("Changed"))});
  }
}
