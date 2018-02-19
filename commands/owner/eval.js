module.exports= {
  common_names: ['eval','e'],
  handle: function(bot){
    var msg = bot.message;
    try{bot.message.channel.send(eval(bot.command.arg));}catch(e){console.log(e);bot.message.channel.send('An error occured');};
  }
}
