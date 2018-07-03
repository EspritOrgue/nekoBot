module.exports= {
  common_names: ['disconnect','dc'],
  title: "Disconnect",
  description: "It will disconnect the bot.",
  example: "!disconnect",
  handle: function(bot){
    bot.message.reply(bot.dialog[bot.neko].goodbye).then(function(){
        bot.destroy().catch(err => {console.log({err});});
        process.exit();
    });
  }
}
