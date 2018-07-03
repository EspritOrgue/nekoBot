module.exports= {
  common_names: [''],
  title: "Prefix only",
  description: "The bot will respond if you only use the prefix",
  example: "!",
  channel: "main_channel_id",
  handle: function(bot){
    bot.message.channel.send('Nyat is it? <:chocowa:318193746409947136>');
  }
}
