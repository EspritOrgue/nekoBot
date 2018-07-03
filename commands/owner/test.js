module.exports= {
  common_names: ['test','tt'],
  title: "Test command",
  description: "Testing thing with that command",
  example: "!tt",
  handle: function(bot){
    bot.message.channel.send("This channel has the following id: "+bot.message.channel.id);
  }
}
