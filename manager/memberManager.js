function memberManager(bot){
	this.memberList = {};
	this.bot = bot;
}

memberManager.prototype.load = function(){
	let fs = require('fs');
	var that = this;
	fs.readFile(that.bot.file_path+"member.json", 'utf8', function (err, data){
        if (err) { console.log(err); return; }

        try {
            that.memberList = JSON.parse(data);
            that.getList();
        }
        catch (err) {
            console.log(err);
        }
    });
}
memberManager.prototype.createEmptyPlayer = function(id){
    var that = this;
    var txt = that.memberList[id] = {
        id: id,
        gAccount: "",
        joinDate: "",
        url: "",
        hg:{
            district: 0,
            status: "alive",
            win: 0,
            lose: 0,
            game: 0,
            maxKill: 0,
            totalKill: 0
        },
        rpg:{
            current: "none",
            gold: 0,
            weapon: 1,
            armor: 1,
            accessory: 1,
            classList:{
                Archer:{
                    lvl: 0,
                    exp: 0
                },
                Cleric:{
                    lvl: 0,
                    exp: 0
                },
                Figther:{
                    lvl: 0,
                    exp: 0
                },
                Mage:{
                    lvl: 0,
                    exp: 0
                },
                Rogue:{
                    lvl: 0,
                    exp: 0
                },
                Ronin:{
                    lvl: 0,
                    exp: 0
                },
                Soldier:{
                    lvl: 0,
                    exp: 0
                },
                Warrior:{
                    lvl: 0,
                    exp: 0
                },
            },
            inventory:{
                item:{},
                weapon:{},
                armor:{},
                accessory:{}
            },
            partner:{
                id: 0,
                lvl: 0,
                exp: 0
            },
            status:{
                name: "",
                time: 0
            }
        }
    };
}
memberManager.prototype.save = function(msg,txt){
	let fs = require('fs');
	var that = this;
	var json = JSON.stringify(that.memberList);
    //console.log(json);
	fs.writeFile("member.json", json, function(err) {
        if(err) {
            console.log(err);
            return;
        }
        if(txt != undefined && msg != undefined && msg.mentions.members.array()[0]!=undefined){
        	var curr = new Date().getTime();
            var mDate = new Date(txt).getTime();
            console.log(curr);
            console.log(mDate);
            var diff = (curr - mDate)/(1000*60*60*24*30*12);
            console.log(diff);
            var vet = "LPFG Veteran:Year "+Math.round(diff);
        	msg.channel.send("<@"+msg.mentions.members.array()[0].id+"> has been a member of LPFG for "+diff.toFixed(1)+" years.");
        	if(Math.round(diff)>=1){
        		msg.mentions.members.array()[0].addRole(msg.guild.roles.find("name",vet)).then(output => {
            		msg.reply("Role: "+vet+" added.");
            	}).catch(err => {
            		console.log(err);
            		msg.reply("Sorry, I couldn't add this role.");
				});
        	}

        }
        else{
            msg.channel.send("Everything was saved correctly.")
                .then(function(){msg.channel.stopTyping(true);});
        }
    });
}

memberManager.prototype.getList = function(){
	var that = this;
	return that.memberList;
}

memberManager.prototype.getMember = function(userId){
	var that = this;
	return that.memberList[userId];
}

memberManager.prototype.addJoin = function(msg,txt){
	var that = this;
	let mention = msg.mentions.members.array()[0];
    var date = new Date(txt+" 00:00:00 GMT+0").toUTCString();
	if(mention != undefined && date.valueOf() != "Invalid Date"){
        for(member in that.memberList){
       	 	if(mention.id == member){
                msg.reply("I'll add the join date of this user.")
                    .then(function(){msg.channel.stopTyping(true);});
            	that.memberList[member].joinDate = date;
                that.save(msg,txt);
                console.log(that.memberList);
            	return;
            }
        }
        msg.reply("This member doesn't seem to have created his/her data, I'll create them now, nyaaa.~")
            .then(function(){msg.channel.stopTyping(true);});
        that.createEmptyPlayer(mention.id);
        that.memberList[mention.id].joinDate = date;
        that.save(msg,txt);
    }
    else{
        msg.reply("I don't know which member I need to add.")
            .then(function(){msg.channel.stopTyping(true);});
    }
}

memberManager.prototype.createMember = function(msg,text){
    var that = this;
    var id = msg.member.id;

    text = text.split(", ");
    if(text.length!=2){msg.reply("An error occured.");return;}

    for(member in that.memberList){
        if(id == member && that.memberList[member].gAccount == "" && that.memberList[member].url == ""){
            that.memberList[member].gAccount = text[0];
            that.memberList[member].url = text[1];
            console.log(that.memberList);
            msg.reply("I'll add the following data for you:"+text)
                .then(function(){msg.channel.stopTyping(true);});
            that.save(msg,text);
            return;
        }else if(id == member){
            msg.reply("Your profile already exists, please use !edit.");
            return;
        }
    }

    that.createEmptyPlayer(id);
    that.memberList[id].gAccount = text[0];
    that.memberList[id].url = text[1];
    console.log(that.memberList);
    msg.reply("I'll add the following data for you:"+text)
        .then(function(){msg.channel.stopTyping(true);});
    that.save(msg,text);
}
memberManager.prototype.editMember = function(msg,text){
    var that = this;
    var id = msg.member.id;
    for(member in that.memberList){
        console.log("The user: "+that.memberList[member]);
        if(id == member){
            if(msg.content.toLowerCase().search("username") != -1){
                msg.reply("I will change the username.");
                var txt = text.substring(9);
                that.memberList[member].gAccount = txt;
            }else if(msg.content.toLowerCase().search("url") != -1){
                var txt = text.substring(4);
                that.memberList[member].url = txt;
            }else{
                msg.channel.stopTyping(true);
                return;
            }
            console.log(that.memberList);
            that.save(msg,txt);
            msg.reply("I changed your data successfully")
                .then(function(){msg.channel.stopTyping(true);});
            return;
        }
    }
    msg.reply("You don't have any data to edit, baka...")
        .then(function(){msg.channel.stopTyping(true);});
}
memberManager.prototype.updateMember = function(msg){
    var that = this;
    for(member in that.memberList){
            that.memberList[member].rpg = {
                current: "none",
                gold: 0,
                weapon: 1,
                armor: 1,
                accessory: 1,
                classList:{
                    Archer:{
                        lvl: 0,
                        exp: 0
                    },
                    Cleric:{
                        lvl: 0,
                        exp: 0
                    },
                    Figther:{
                        lvl: 0,
                        exp: 0
                    },
                    Mage:{
                        lvl: 0,
                        exp: 0
                    },
                    Rogue:{
                        lvl: 0,
                        exp: 0
                    },
                    Ronin:{
                        lvl: 0,
                        exp: 0
                    },
                    Soldier:{
                        lvl: 0,
                        exp: 0
                    },
                    Warrior:{
                        lvl: 0,
                        exp: 0
                    },
                },
                inventory:{
                    item:{},
                    weapon:{},
                    armor:{},
                    accessory:{}
                },
                partner:{
                    id: 0,
                    lvl: 0,
                    exp: 0
                },
                status:{
                    name: "",
                    time: 0
                }
            };
    }
    console.log(that.memberList);
    msg.reply("I will update the data")
        .then(function(){msg.channel.stopTyping(true);});
    that.save(msg);
}
/*HG Funct*/
memberManager.prototype.updateDistrict = function(id,dis,msg){
    var that = this;
    var mem = that.getMember(id);
    mem.hg.district = dis;
    msg.reply("<@"+id+"> will be added to the district "+dis+".");
}
module.exports = memberManager;
