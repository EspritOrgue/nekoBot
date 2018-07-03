module.exports = {
  common_names: ['setfetishes','sf'],
  title: "Set Fetishes",
  description: "It will display the fetishes list or set or remove the fetishes you chose.",
  example: "\nTo get the fetishes list: !setfetishes\n To set/remove a fetishes: !setfetishes <optional:role name>",
  handle: function(bot){
    var rList = bot.serverManager.getServer(bot.message.guild.id).fetishes_roles;
    if(bot.args[0] == undefined){
      var list = "";
      var list_name = "";
      rList.forEach(function(value,key){
        list += bot.funct.returnRole(value)+"\n";
        list_name += rList.indexOf(value)+". "+bot.funct.returnRole(value).name+"\n";
      });

      var info = [bot.user.username,bot.user.avatarURL,"#fff",bot.message.guild.iconURL,"You can choose one of the following roles to change your color on the server."]; //[0] = author, [1] = avatar, [2] = color, [3] = thumbnail, [4] = description, [5] = Footer, [6] = image, [7] = Title, [8] = file
      var field = ["Fetishes roles name",list_name,true,"Fetishes roles example",list,true];
      var richEmbed = bot.funct.richEmbed(info, field);
      bot.message.channel.send({embed:richEmbed});
    }else{
      if(bot.funct.isRole(bot.args[0])){
        var role = bot.funct.returnRole(bot.args[0]);

        if(bot.message.member.roles.find('id',role.id)){
          bot.message.reply("I will remove the role: "+role.name);
          bot.message.member.removeRole(role);
        }else{
          bot.message.reply("I will add you the role: "+role.name);
          bot.message.member.addRole(role);
        }
      }else if(bot.funct.isRole(rList[bot.args[0]])){
        var role = bot.funct.returnRole(rList[bot.args[0]]);

        if(bot.message.member.roles.find('id',role.id)){
          bot.message.reply("I will remove the role: "+role.name);
          bot.message.member.removeRole(role);
        }else{
          bot.message.reply("I will add you the role: "+role.name);
          bot.message.member.addRole(role);
        }
      }else{
        bot.message.reply("The role you specificied seems to be incorrect.");
      }
    }
  }
}
