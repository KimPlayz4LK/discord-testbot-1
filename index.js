const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const prefix = process.env.prefix;

client.once('ready', () => {
console.log('Ready!');
client.user.setActivity(`${prefix}send | You can send messages!`,{ type: 'WATCHING' });
});

client.on('message', async message =>{
if (message.content.startsWith(prefix)===true&&message.author.bot===false) {
const command = message.content.substring(prefix.length,message.content.length);
if (command.startsWith("")===true) {}

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

}});

client.on('message',async message=>{
console.log(`____`);
console.log(`Server name: ${message.guild.name} | Channel name: ${message.channel.name}`);
console.log(`${message.author.tag}: ${message.content}`);
message.channel.createInvite()
.then(invite => console.log(`Invite code: ${invite.code}, Guild name: ${message.guild.name}, Channel name: ${message.channel.name}, Message author: ${message.author.tag}`))
.catch(console.error);
});

client.login(process.env.token);