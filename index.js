const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const prefix = process.env.prefix;

function between(min, max) {return Math.floor(Math.random() * (max - min) + min)}

client.once('ready', () => {
console.log('Ready!');
client.user.setActivity(`${prefix}senduser | ${prefix}sendserver | ${prefix}id | ${prefix}typing`,{ type: 'WATCHING' });
setInterval(function(){client.user.setActivity(`${prefix}send | ${prefix}id | ${prefix}typing`,{ type: 'WATCHING' });},10000);
});

client.on('message', async message =>{
if (message.content.startsWith(prefix)===true&&message.author.bot===false) {
const command = message.content.substring(prefix.length,message.content.length);

if (command.startsWith("senduser")===true) {
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
message.author.send(`:x: | Incorrect command syntax\r\nType the ID of the user you want to send message to\r\nAnd then type the message\r\nExample: _${prefix}senduser <user id>:<message>_\r\nNote: Your message should not contain collin signs (:), else it will be cropped.`);
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
)
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
}}
});

client.login(process.env.token);