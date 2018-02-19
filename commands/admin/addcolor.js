module.exports= {
  common_names: ['addcolor'],
  handle: function(bot){
    if(bot.args[0] != undefined && bot.funct.isRole(bot.args)){
      bot.message.reply("This role will be set as a color role.");
      var color=bot.funct.returnRole(bot.args);
      console.log(color.id);
      bot.serverManager.update("color",color.id);
    }else{
      bot.message.reply("No role were given, please mention a proper role");
    }
  }
}
