module.exports= {
  common_names: ['poi'],
  description: "The bot will answer with a poi",
  title: "Poi",
  example: "!poi",
  handle: function(bot){
    bot.message.reply('Poi');
  }
}
