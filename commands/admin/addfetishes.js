module.exports= {
  common_names: ['addfetishes','af'],
  description: "A command for the admin(s) to add a fetishes role to the list of the server it is run on.",
  title: "Add Fetishes",
  example: "!addfetishes <role name>",
  handle: function(bot){
    if(bot.args[0] != undefined && bot.funct.isRole(bot.args)){
      bot.message.reply("This role will be set as a fetishes role.");
      var color=bot.funct.returnRole(bot.args);
      console.log(color.id);
      bot.serverManager.update("fetishes",color.id);
    }else{
      bot.message.reply("No role were given, please mention a proper role");
    }
  }
}
