function serverManager(bot){
	this.serverList = {};
	this.bot = bot;
}

serverManager.prototype.load = function(){
	let fs = require('fs');
	var that = this;
	fs.readFile(that.bot.file_path+"server.json", 'utf8', function (err, data){
        if (err) { console.log(err); return; }

        try {
            that.serverList = JSON.parse(data);
            that.getList();
        }
        catch (err) {
            console.log(err);
        }
    });
}
serverManager.prototype.createEmptyServer = function(server){
    var that = this;
    var txt = that.serverList[server.id] = {
        id: server.id,
        server_owner: server.ownerID,
        admin: [],
        mods: [],
        roles: [],
        color_roles: [],
        fetishes_roles:[],
        main_channel_id: server.systemChannelID,
        music_channel_id: "",
        nsfw_channel_id: "",
        edit_log_channel_id: "",
        mangement_log_channel_id: "",
        vocal_log_channel_id: "",
        join_log_channel_id: "",
        ignored_channels: [],
				prefix: "!"
    };
}
serverManager.prototype.save = function(msg = ''){
	let fs = require('fs');
	var that = this;
	var json = JSON.stringify(that.serverList);
  console.log(json);
	fs.writeFile("server.json", json, function(err) {
        if(err) {
            console.log(err);
            return;
        }
				if(msg != ''){
					msg.channel.send("Everything was saved correctly.")
	          .then(function(){msg.channel.stopTyping(true);});
				}
				console.log("Successfully saved");
    });
}

serverManager.prototype.getList = function(){
	var that = this;
	return that.serverList;
}

serverManager.prototype.getServer = function(userId){
	var that = this;
	return that.serverList[userId];
}

serverManager.prototype.update = function(option,value){
	var that = this;
	if(option != undefined && value != undefined){
		switch(option){
			case "admin":
				that.getServer(that.bot.message.guild.id).admin.push(value);
				that.save();
				break;
			case "autorole":
				that.getServer(that.bot.message.guild.id).autorole = value;
				that.save();
				break;
			case "color":
				if(that.getServer(that.bot.message.guild.id).color_roles.indexOf(value)==-1){
					that.getServer(that.bot.message.guild.id).color_roles.push(value);
					console.log(that.serverList);
					that.save();
				}else{
					that.bot.message.reply("This role was already added.");
				}
				break;
				case "fetishes":
					if(that.getServer(that.bot.message.guild.id).fetishes_roles.indexOf(value)==-1){
						that.getServer(that.bot.message.guild.id).fetishes_roles.push(value);
						console.log(that.serverList);
						that.save();
					}else{
						that.bot.message.reply("This role was already added.");
					}
					break;
				case "prefix":
					that.getServer(that.bot.message.guild.id).prefix = value;
					console.log(that.serverList);
					that.save();
				break;
				case "votecolor":
					that.getServer(that.bot.message.guild.id).voterole = value;
					that.save();
					break;
			default:
				console.log("The option is not correct.");
				break;
		}
	}else{
		console.log("No option were assigned");
	}
}

module.exports = serverManager;
