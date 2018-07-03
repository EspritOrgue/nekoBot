module.exports= {
  common_names: ['addvote','addv'],
  description: "A command for the admin(s) to add a role which the color will be changeable by members.",
  title: "Add Vote color",
  example: "!addv <role name>",
  handle: function(bot){
    if(bot.args[0] != undefined && bot.funct.isRole(bot.args)){
      bot.message.reply("This role will be set as a color role.");
      var color=bot.funct.returnRole(bot.args);
      console.log(color.id);
      bot.serverManager.update("votecolor",color.id);
    }else{
      bot.message.reply("No role were given, please mention a proper role");
    }
  }
}
