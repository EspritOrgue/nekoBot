module.exports={
  common_names: ['changecolor','cc'],
  description: "Allow admins to change the colors of their own color role if they have a specific one",
  title: "Change color",
  example: "!changecolor <hexadecimal color>",
  handle: function(bot){
   if(bot.args[0] != undefined && bot.guild_info.admin.indexOf(bot.message.member.colorRole.id) == -1){
     bot.message.reply("I will change your color role");
     bot.message.member.colorRole.setColor(bot.args[0]);
   }else{
     bot.message.reply("Your color role is the default admin one, I cannot change it");
   }
  }
}