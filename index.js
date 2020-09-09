const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const prefix = process.env.prefix;

function between(min, max) {return Math.floor(Math.random() * (max - min) + min)}
function newStatus() {
var id=between(0,9);
if(id===0){client.user.setActivity(`${prefix}poll | ${client.users.cache.size} poll makers`, { type: 'PLAYING' });}
if(id===1){client.user.setActivity(`${prefix}trivia | ${client.guilds.cache.size} servers`, { type: 'WATCHING' });}
if(id===2){client.user.setActivity(`${prefix}fact | ${client.users.cache.size} fact makers in ${client.channels.cache.size} channels`, { type: 'WATCHING' });}
if(id===3){client.user.setActivity(`${prefix}ping - Changes the ping settings | ${client.users.cache.size} users found`, { type: 'LISTENING' });}
if(id===4){client.user.setActivity(`${prefix}dmuser - Send a DM to a user | ${client.guilds.cache.size} servers using me`, { type: 'PLAYING' });}
if(id===5){client.user.setActivity(`${prefix}sendserver - Send a message to a server | ${client.users.cache.size} users to listen`, { type: 'LISTENING' });}
if(id===6){client.user.setActivity(`${prefix}id - Get someone's user ID | ${client.channels.cache.size} channels to listen`, { type: 'WATCHING' });}
if(id===7){client.user.setActivity(`${prefix}typing - Toggle typing in a channel | I know ${client.guilds.cache.size} servers`, { type: 'WATCHING' });}
if(id===8){client.user.setActivity(`${prefix}del - Delete an amount of messages | ${client.channels.cache.size} channels discovered`, { type: 'WATCHING' });}
if(id===9){client.user.setActivity(`${prefix}help - Get help/list of commands | ${client.users.cache.size} users discovered`, { type: 'WATCHING' });}
}
client.once("ready",()=>{
console.log("Ready!");
client.user.setActivity(`${prefix}help | ${client.users.cache.size} users using me in ${client.guilds.cache.size} servers`, { type: 'WATCHING' });
setInterval(function(){client.user.setActivity(`${prefix}help | ${client.users.cache.size} users using me in ${client.guilds.cache.size} servers`, { type: 'WATCHING' });},10000);
//newStatus();
//setInterval(newStatus,10000);
});

client.on('message', async message =>{
if (message.content.startsWith(prefix)===true&&message.author.bot===false) {
const command = message.content.substring(prefix.length,message.content.length);

if (command.startsWith("hel")===true) {
const embed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle(`:information_source: | Help`)
.setDescription(`Here's some commands that you can use`)
.addFields(
{name:`:speech_balloon: | Messaging`,value:`dmuser, sendserver`,inline:true},
{name:`:grin: | Fun`,value:`poll, trivia, fact`,inline:true},
{name:`:gear: | Utility`,value:`ping [polls/trivias/facts], id <user mention>, typing <start/stop>, help, delete <amount>`},
{name:`\u200B`,value:` - Values in [] signs are optional parameters\r\n - Values in <> signs are required parameters\r\n - Some commands should require multiple parameters, to get help just type that command name`},
);
message.channel.send(`||${message.author}||`,[embed]);
}

if (command.startsWith("del ")===true){
var args = message.content.split(' ');
if (args[1] == null) {message.channel.send(":x: | Please provide an amout in numbers");} else 
{if (args[1]+1 < 100 && args[1] > 0){message.channel.bulkDelete(args[1]+1,true);} else {message.channel.send(":x: | Please provide an amout between 1 and 99");}}
}

if (command.startsWith("dmuser")===true) {
const args = command.split(":");
if (args[1]!=null&&args.length>1) {
message.delete();
const embed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle(":envelope_with_arrow: | New message")
.setAuthor("You've got a message")
.addFields(
{name:`:person_pouting: | Sender`,value:`${message.author.tag} (${message.author.id})`},
{name:`:envelope: | Message`,value:command.substring(command.indexOf(args[2]),command.length)}
);
const user = client.users.cache.get(args[1]);
user.send("New message!",[embed]);
message.author.send(`:incoming_envelope: | Successfully sent a message to: **${user.tag}**`);
}else{
message.author.send(`:x: | Incorrect command syntax\r\nType the ID of the user you want to send message to\r\nAnd then type the message\r\nExample: _${prefix}dmuser <user id>:<message>_\r\nNote: Your message should not contain collin signs (:), else it will be cropped.`);
}}

if (command.toLowerCase().startsWith("sendserver")===true&&message.channel.name==="chatting-within-servers") {
var args = command.substring(5,command.length).split(":");
console.log(args);
if (args[1]!=null){
const embed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle(`Message received`)
.setDescription(`${message.author.tag} sent a message to this server!`)
.addFields(
{name:`Guild`,value:`${message.guild.name} (${message.guild.id})`},
{name:`Message`,value:args[1]},
{name:`How to reply?`,value:`Type the following:\r\n${prefix}sendserver ${message.guild.id}:<Your message>\r\nNote: Your message should not contain collin signs (:), else it will be cropped.`}
);
if(!client.guilds.cache.get(args[0])){
message.reply(`please specify a valid server id.`);
}else{
const channel = client.guilds.cache.get(args[0]).channels.cache.find(ch=>ch.name==="chatting-within-servers");
if(channel){
channel.send(embed);
message.reply(`sent **${args[1]}** to **${client.guilds.cache.get(args[0]).name}** server.`);
}}
}}else{
const channel=message.guild.channels.cache.find(channel=>channel.name==="chatting-within-servers")
if (!channel) {message.reply("you should be in the channel with name ${channel} to send messages to other servers.");}
else {message.reply("the server should have a channel named 'chatting-within-servers' to send messages.");}
}

if (command.startsWith("id")===true) {
if (message.mentions.members.first()!=null) {
var args = command.split(" ");
var user = message.guild.members.cache.get(message.mentions.members.first().id);
message.reply(`here's **${user.user.username}**'s user's ID: ${user.id} | :card_box:`);}else{message.reply("please mention a user to get his ID | :x:");}
}

if (command.toLowerCase().startsWith("typing")===true) {
message.delete();
const args = command.toLowerCase().split(" ");
if (args[1]==="start") {message.channel.startTyping();} else {
if (args[1]==="stop") {message.channel.stopTyping();} else {
message.reply(`you should specify the right parameter: stop or start`);
}}}

if(command.toLowerCase().startsWith("poll")===true){
const string=command.substring(5,command.length);
const args=string.split(",");
if(args.length<5){
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Poll**")
.setDescription(`**${message.author.tag}**, please enter the main question 4 options divided by the comma sign (,).\r\nExample: _${prefix}poll Would you rather, Eat fruits, Eat vegetables, Eat fast-food, or Drink smoothie_`);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
const member = message.guild.members.cache.get(message.author.id);
if (member.roles.cache.some(role=>role.name==='Poll maker')) {
let role=message.guild.roles.cache.find(x=>x.name==="Poll ping");
if(!role){var ping="";}else{var ping=`||${role}||`;}
var embed=new Discord.MessageEmbed()
.setColor("#006aff")
.setTitle("**Poll**")
.setDescription(`**This poll was made by: ${message.author.tag}**\r\n_It's a poll!_\r\n_You should choose and react your answer!_\r\n__**${args[0]}**__`)
.addFields(
{name:`:one: | ${args[1]}`,value:"\u200B"},
{name:`:two: | ${args[2]}`,value:"\u200B"},
{name:`:three: | ${args[3]}`,value:"\u200B"},
{name:`:four: | ${args[4]}`,value:"\u200B"},
);
const channel=message.guild.channels.cache.find(channel=>channel.name==="polls")
if(!channel){
message.channel.bulkDelete(1);
message.channel.send(ping,[embed])
.then(function(message) {
message.react("1️⃣");
message.react("2️⃣");
message.react("3️⃣");
message.react("4️⃣");
}).catch(function(){});
}else{
message.channel.bulkDelete(1);
message.channel.send(`||${message.author}||\r\n:white_check_mark: | Successfully sent a new poll in **${channel}**\r\n:grey_question: | Question: **${args[0]}**\r\n:person_pouting: | Author: **${message.author.tag}**`);
channel.send(ping,[embed])
.then(function(message) {
message.react("1️⃣");
message.react("2️⃣");
message.react("3️⃣");
message.react("4️⃣");
}).catch(function(){});
}}else{
let roleName="Poll maker";
let role=message.guild.roles.cache.find(x=>x.name===roleName);
if (!role) {
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Poll**")
.setDescription(`**${message.author.tag}**, the server should have a role called\r\n`+"`Poll maker`"+`\r\nElse, nobody can post polls.`);
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Poll**")
.setDescription("**"+message.author.tag+"**, you don't have permissions to send polls.\r\nYou can only send polls if you have the `Poll maker` role.");
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}}}}

if(command.toLowerCase().startsWith("trivia")===true){
const string=command.substring(7,command.length);
const args=string.split(",");
if(args.length<6){
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Trivia**")
.setDescription(`**${message.author.tag}**, please enter the main question 4 options divided by the comma sign (,) and an answer for the question.\r\nExample: _${prefix}trivia Who is the creator of the bot?,TheRobloxCommunist#4530,Wumpus#0001,KimPlayz4LK#3433,Someone else,3_`);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
const member = message.guild.members.cache.get(message.author.id);
if (member.roles.cache.some(role=>role.name==='Trivia maker')) {
let role=message.guild.roles.cache.find(x=>x.name==="Trivia ping");
if(!role){var ping="";}else{var ping=`||${role}||`;}
var embed=new Discord.MessageEmbed()
.setColor("#006aff")
.setTitle("**Trivia**")
.setDescription(`**This trivia was made by: ${message.author.tag}**\r\n_It's a trivia!_\r\n_You should choose the right answer and react!_\r\n__**${args[0]}**__\r\n*Answer: ||${args[5]}||*`)
.addFields(
{name:`:one: | ${args[1]}`,value:"\u200B"},
{name:`:two: | ${args[2]}`,value:"\u200B"},
{name:`:three: | ${args[3]}`,value:"\u200B"},
{name:`:four: | ${args[4]}`,value:"\u200B"},
);
const channel=message.guild.channels.cache.find(channel=>channel.name==="trivias")
if(!channel){
message.channel.bulkDelete(1);
message.channel.send(ping,[embed])
.then(function(message) {
message.react("1️⃣");
message.react("2️⃣");
message.react("3️⃣");
message.react("4️⃣");
}).catch(function(){});
}else{
message.channel.bulkDelete(1);
message.channel.send(`||${message.author}||\r\n:white_check_mark: | Successfully sent a new trivia quiz in **${channel}**\r\n:grey_question: | Question: **${args[0]}**\r\n:person_pouting: | Author: **${message.author.tag}**`);
channel.send(ping,[embed])
.then(function(message) {
message.react("1️⃣");
message.react("2️⃣");
message.react("3️⃣");
message.react("4️⃣");
}).catch(function(){});
}}else{
let roleName="Trivia maker";
let role=message.guild.roles.cache.find(x=>x.name===roleName);
if (!role) {
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Trivia**")
.setDescription(`**${message.author.tag}**, the server should have a role called\r\n`+"`Trivia maker`"+`\r\nElse, nobody can post new trivia quizzes.`);
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Trivia**")
.setDescription("**"+message.author.tag+"**, you don't have permissions to send new trivias.\r\nYou can only send trivias if you have the `Trivia maker` role.");
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}}}}

if(command.toLowerCase().startsWith("fact")===true){
    var fact = command.substring(5,command.length);
    var args = command.split(" ");
    if(fact===""){
    var embed=new Discord.MessageEmbed()
    .setColor("#ba0000")
    .setTitle(":x: | **Fact**")
    .setDescription(`**${message.author.tag}**, please enter a fact to share!\r\nThe fact could be anything, something that gives information, or knowledge about something.\r\nIt can be **anything**!!!`);
    message.channel.send(`||<@${message.author.id}>||`,[embed]);
    }else{
    const member = message.guild.members.cache.get(message.author.id);
    if (member.roles.cache.some(role=>role.name==='Fact maker')) {
    let role=message.guild.roles.cache.find(x=>x.name==="Fact ping");
    if(!role){var ping="";}else{var ping=`||${role}||`;}
    var embed=new Discord.MessageEmbed()
    .setColor("#006aff")
    .setTitle("**Fact**")
    .setDescription(`**${message.author}** have posted a fact!`)
    .addFields({name:`:bulb: | Fact`,value:`**__${fact}__**`},)
    const channel=message.guild.channels.cache.find(channel=>channel.name==="facts")
    if(!channel){
    message.channel.bulkDelete(1);
    message.channel.send(ping,[embed]).then(function(message){message.react("✅");message.react("👍");message.react("👎");}).catch(function(){});
    }else{
    message.channel.bulkDelete(1);
    message.channel.send(`||${message.author}||\r\n:white_check_mark: | Successfully sent a new fact in **${channel}**\r\n:person_pouting: | Author: **${message.author.tag}**`);
    channel.send(ping,[embed]).then(function(message){message.react("✅");message.react("👍");message.react("👎");}).catch(function(){});
    }}else{
    let roleName="Fact maker";
    let role=message.guild.roles.cache.find(x=>x.name===roleName);
    if (!role) {
    var embed=new Discord.MessageEmbed()
    .setColor("#ba0000")
    .setTitle(":x: | **Fact**")
    .setDescription(`**${message.author.tag}**, the server should have a role called\r\n`+"`Fact maker`"+`\r\nElse, nobody can post facts.`);
    message.channel.bulkDelete(1);
    message.channel.send(`||<@${message.author.id}>||`,[embed]);
    }else{
    var embed=new Discord.MessageEmbed()
    .setColor("#ba0000")
    .setTitle(":x: | **Fact**")
    .setDescription("**"+message.author.tag+"**, you don't have permissions to send new facts.\r\nYou can only send polls if you have the `Fact maker` role.");
    message.channel.bulkDelete(1);
    message.channel.send(`||<@${message.author.id}>||`,[embed]);
    }}}}

if(command.toLowerCase().startsWith("ping")===true){
const args = command.toLowerCase().split(" ");
var cmds=['po','tr','fa'];
if(args[1].length<2||args[1]==null){
const m = await message.channel.send("Ping speed results ||pong!||");
var embed = new Discord.MessageEmbed()
.setColor('#f5cc00')
.setTitle(':ping_pong: | Ping')
.setDescription(`${message.author}, here's the bot's ping speed information`)
.addField("Latency",m.createdTimestamp - message.createdTimestamp + "ms")
.addField("API Latency",Math.round(client.ws.ping) + "ms")
.addField("\u200B","\u200B")
.addField("Poll & Trivia pings","You can toggle pings for `trivias`, `polls` or `facts`. To toggle it, just type any of these options.\r\nExample: "+prefix+" ping <option>");
m.edit(embed);
}else{
if(cmds.includes(args[1].substring(0,2))===false){
message.reply("please specify which ping setting would you like to toggle:\r\n- polls\r\n- trivias\r\n- facts");
}else{
if (args[1].startsWith("po")===true) {
let role=message.guild.roles.cache.find(x=>x.name==="Poll ping");
if(role){
const member = message.guild.members.cache.get(message.author.id);
if(member.roles.cache.some(x=>x.name==="Poll ping")){member.roles.remove(role);message.reply("**you will not** receive pings of new polls. | :x:");}
else{member.roles.add(role);message.reply("**you will** receive pings of new polls. | :white_check_mark:");}
}else{message.reply("the server should have the role named `Poll ping` to receive pings about new polls. | :x:");}
}else{
if (args[1].startsWith("tr")===true) {
let role=message.guild.roles.cache.find(x=>x.name==="Trivia ping");
if(role){
const member = message.guild.members.cache.get(message.author.id);
if(member.roles.cache.some(x=>x.name==="Trivia ping")){member.roles.remove(role);message.reply("**you will not** receive pings of new trivia quizzes. | :x:");}
else{member.roles.add(role);message.reply("**you will** receive pings of new trivia quizzes. | :white_check_mark:");}
}else{message.reply("the server should have the role named `Trivia ping` to receive pings about new trivia quizzes. | :x:");}
}else{
let role=message.guild.roles.cache.find(x=>x.name==="Fact ping");
if(role){
const member = message.guild.members.cache.get(message.author.id);
if(member.roles.cache.some(x=>x.name==="Fact ping")){member.roles.remove(role);message.reply("**you will not** receive pings of new facts. | :x:");}
else{member.roles.add(role);message.reply("**you will** receive pings of new facts. | :white_check_mark:");}
}else{message.reply("the server should have the role named `Fact ping` to receive pings about new facts. | :x:");}
}}}}}

}});

client.on('message',async message=>{
if (message.author.bot===false) {
if (message.guild!=null) {
console.log(`____`);
console.log(`Server name: ${message.guild.name} | Channel name: ${message.channel.name}`);
console.log(`${message.author.tag}: ${message.content}`);
message.channel.createInvite()
.then(invite => console.log(`Invite code: ${invite.code}, Guild name: ${message.guild.name}, Channel name: ${message.channel.name}, Message author: ${message.author.tag}`))
.catch(console.error);
} else {
const embed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle(":envelope_with_arrow: | DM Message")
.setAuthor("New DM received!")
.addFields(
{name:`:person_pouting: | Sender`,value:`${message.author.tag} (${message.author.id})`},
{name:`:envelope: | Message`,value:`\`${message.content}\``}
);
const user = client.users.cache.get("748531954391056445");
user.send(`${message.author.tag} DMed me!`,[embed]);
}}});

client.login(process.env.token);