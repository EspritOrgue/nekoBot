module.exports = {
  common_names: ['setcolor','sc','setcolour'],
  handle: function(bot){
    var rList = bot.serverManager.getServer(bot.message.guild.id).color_roles;
    if(bot.args[0] == undefined){
      var list = "";
      var list_name = "";
      rList.forEach(function(value,key){
        list += bot.funct.returnRole(value)+"\n";
        list_name += rList.indexOf(value)+". "+bot.funct.returnRole(value).name+"\n";
      });

      var info = [bot.user.username,bot.user.avatarURL,"#fff",bot.message.guild.iconURL,"You can choose one of the following roles to change your color on the server."]; //[0] = author, [1] = avatar, [2] = color, [3] = thumbnail, [4] = description, [5] = Footer, [6] = image, [7] = Title, [8] = file
      var field = ["Color roles name",list_name,true,"Color roles example",list,true];
      var richEmbed = bot.funct.richEmbed(info, field);
      bot.message.channel.send({embed:richEmbed});
    }else{
      if(bot.funct.isRole(bot.args[0])){
        var ownOne = false;
        var role;
        rList.forEach(function(value,key){
          if(bot.message.member.roles.find('id',value)){
            ownOne = true;
            role = bot.funct.returnRole(value);
          }
        });
        if(ownOne){
          bot.message.reply("I will change your current role: "+role.name+" to "+bot.funct.returnRole(bot.args[0]).name);
          bot.message.member.removeRole(role);
          bot.message.member.addRole(bot.funct.returnRole(bot.args[0]));
        }else{
          bot.message.reply("I will add you the role: "+bot.funct.returnRole(rList[bot.args[0]]).name);
          bot.message.member.addRole(bot.funct.returnRole(bot.args[0]));
        }
      }else if(bot.funct.isRole(rList[bot.args[0]])){
        var ownOne = false;
        var role;
        rList.forEach(function(value,key){
          if(bot.message.member.roles.find('id',value)){
            ownOne = true;
            role = bot.funct.returnRole(value);
          }
        });
        if(ownOne){
          bot.message.reply("I will change your current role: "+role.name+" to "+bot.funct.returnRole(rList[bot.args[0]]).name);
          bot.message.member.removeRole(role);
          bot.message.member.addRole(bot.funct.returnRole(rList[bot.args[0]]));
        }else{
          bot.message.reply("I will add you the role: "+bot.funct.returnRole(rList[bot.args[0]]).name);
          bot.message.member.addRole(bot.funct.returnRole(rList[bot.args[0]]));
        }
      }else{
        bot.message.reply("The role you specificied seems to be incorrect.");
      }
    }
  }
}
