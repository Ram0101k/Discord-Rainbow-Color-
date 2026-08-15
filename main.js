const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const http = require('http');

// Keep-alive HTTP server
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running');
}).listen(3000);

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  applyRainbowRoles();
});

const token = process.env.DISCORD_TOKEN || config.token;
client.login(token);

async function applyRainbowRoles() {
  const guildId = config.guildId; // Make sure the bot is in the server
  const roleId = config.roleId; // Make sure the bot can edit the role, is above the role and has permission to edit roles.
  const interval = config.interval // The time in milliseconds, 1 second = 1000ms 

  const guild = await client.guilds.fetch(guildId).catch(console.error)
  const role = await guild.roles.fetch(roleId).catch(console.error)

  setInterval(() => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    role.edit({ color: randomColor });
  }, interval);
}
