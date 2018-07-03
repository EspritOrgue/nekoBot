module.exports = {
  common_names: ['info','userinfo'],
  title: "Info",
  description: "It will display the info about you or the user you mentionned.",
  example: "!info <optional:user tag>",
  handle: function(bot){
    if(bot.message.mentions.everyone){
      bot.message.reply("You mentionned everyone, I cannot get everyone's info at once. -_-''");
    }else{
      var member, fet;
      if(bot.message.mentions.users.size == 0){
        member = bot.message.member;
      }else{
        member = bot.message.mentions.members.array()[0]
      }

      var role = member.roles;
      /*role.forEach(function(value, key, map){
        if(discord.helper.hasColor(value)){
          fet += value.name+", ";
        }
      });*/

      var memberData = bot.memberManager.getMember(member.id);
      if(memberData != undefined && memberData.joinDate!=""){
          var cur = new Date();
          var memDate = new Date(memberData.joinDate);
          var nDate = new Date(memDate).setUTCFullYear(cur.getUTCFullYear(),memDate.getUTCMonth()+6,memDate.getUTCDate()-2);

          var curr = cur.getTime();
          var mDate = memDate.getTime();
          var ms = (curr - mDate);
          var D = ms/(1000*60*60*24);
          var Y = ms/(1000*60*60*24*30*12)+0.5;

          var diff = nDate - curr;
                if(diff<0){
              nDate = new Date(memDate).setUTCFullYear(cur.getUTCFullYear()+1,memDate.getUTCMonth()+6,memDate.getUTCDate()-2);
              diff = nDate - curr;
          }
          var remD = diff/(1000*60*60*24);
      }
      console.log(fet);
      var infoRE = [(member.nickname != undefined)?member.nickname+" ("+member.user.tag+")":member.user.tag,member.user.avatarURL,member.displayHexColor,member.user.avatarURL,(memberData!=undefined)?"G+ username: "+memberData.gAccount+"\nurl: "+memberData.url:"unknown",member.presence.status+" | playing *"+((member.presence.game!=null)?member.presence.game.name:"nothing")+"* | "+member.id];
      var field = [
      "Rank",member.hoistRole,true,
      "Color",member.colorRole,true,
      "Joined LPFG",(memberData!=undefined)?(memberData.joinDate!="")?memberData.joinDate.split("+")[0]:"unknown":"unknown",true,
      "Joined the server",member.joinedAt.toUTCString(), true,
      "Registered since",member.user.createdAt.toUTCString(), true,
      "Member for",(D!=undefined)?Math.floor(D)+" days":"unkown",true,
      "Next Veteran Rank",(Y!=undefined)?"Veteran "+Math.ceil(Y):"unkown",true,
      "Next Veteran Rank in",(remD!=undefined)?(Math.floor(remD)+1)+" days":"unkown",true,
      "Fetishes",(fet == "undefined")?"None":fet, true
      ];

      var emb = bot.funct.richEmbed(infoRE,field);
      bot.message.channel.send({embed: emb});
    }
  }
}
