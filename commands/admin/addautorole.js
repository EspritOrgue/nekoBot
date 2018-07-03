module.exports= {
  common_names: ['autorole'],
  description: "A command for the admin(s) to add a role that will be given automatically to new joined memvber (max 1).",
  title: "Autorole",
  example: "!autorole <role name>",
  handle: function(bot){
    if(bot.args[0] != undefined && bot.funct.isRole(bot.args)){
      bot.message.reply("This role will be set as a color role.");
      var color=bot.funct.returnRole(bot.args);
      console.log(color.id);
      bot.serverManager.update("autorole",color.id);
    }else{
      bot.message.reply("No role were given, please mention a proper role");
    }
  }
}
