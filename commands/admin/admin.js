module.exports= {
  common_names: ['admin'],
  handle: function(bot){
    if(bot.args[0] != undefined && bot.funct.isRole(bot.args.substring(3,bot.args.length-1))){
      bot.message.reply("This role will be set as the admin role.");
      bot.serverManager.update("admin",bot.args.substring(3,bot.args.length-1));
    }else{
      bot.message.reply("No role were given, please mention a proper role");
    }
  }
}
