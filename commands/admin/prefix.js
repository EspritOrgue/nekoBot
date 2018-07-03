module.exports= {
  common_names: ['prefix','pre'],
  description: "A command for the admin(s) to change the prefix for the server.",
  title: "Prefix",
  example: "!prefix <new prefix>",
  handle: function(bot){
    if(bot.args[0] != undefined && bot.args.length == 1){
      bot.message.reply("I wil change the role for "+bot.args[0]);
      bot.serverManager.update("prefix",bot.args[0]);
    }else{
      bot.message.reply("No prefix or several one were given.");
    }
  }
}
