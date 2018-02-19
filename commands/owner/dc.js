module.exports= {
  common_names: ['disconnect','dc'],
  handle: function(bot){
    bot.message.reply(bot.dialog[bot.neko].goodbye).then(function(){
        bot.destroy().catch(err => {console.log({err});});
        process.exit();
    });
  }
}
