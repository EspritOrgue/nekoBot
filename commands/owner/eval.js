module.exports= {
  common_names: ['eval','e'],
  title: "Eval",
  description: "It will evaluate a command you entered",
  example: "!eval <optional:valid js expression>",
  handle: function(bot){
    try{bot.message.channel.send(eval(bot.args));}catch(e){console.log(e);bot.message.channel.send('An error occured');};
  }
}
