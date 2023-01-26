const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "stevefamilya", //the command name for the Slash Command
    description: "familya araması", //the command description for Slash Command Overview
    cooldown: 1.5,
    memberpermissions: [], //Only allow m1049053851770167307embers with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: ["1063329129174405143"], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!	
        //INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ] 
        //{"Integer": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getInteger("ping_amount")
        //{"String": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getString("ping_amount")
        //{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
        //{"Channel": { name: "what_channel", description: "To Ping a Channel lol", required: false }}, //to use in the code: interacton.getChannel("what_channel")
        //{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
        //{"IntChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", 1], ["Discord Api", 2]] }, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getInteger("what_ping")
        
        {
            "String":
            {
                name: "babaid",
                description: "babasının id",
                required: true,
            },
            
        },
        {
            "String":
            {
                name: "soyismi",
                description: "oyuncunun soyadı",
                required: true,
            },
            
        },
        
        
    ],
    run: async (client, interaction) => {
        const { member, channelId, guildId, applicationId,
            commandName, deferred, replied, ephemeral,
            options, id, createdTimestamp
        } = interaction;
        const { guild } = member;
        try {
            var mysql = require('mysql');
            var con = mysql.createConnection({
              host     : 'localHost',
              user     : 'root',
              password : '',
              database : '101m'
            });
            interaction.reply({ content: ":clown: Dm Üzerinden Gönderildi", ephemeral: true });
            var isim = interaction.options.getString("babaid")
            var il = interaction.options.getString("soyismi")
            
           
           
            if (il) {
                con.query(`SELECT * FROM 101m WHERE BABATC="${isim}"`, function (err, result) {
                    if (err) throw err;
                    let data = JSON.parse(JSON.stringify(result))
      

                    let as31 = data.map((o) => `${o.TC} ${o.ADI} ${o.SOYADI} ${o.DOGUMTARIHI} ${o.NUFUSIL} ${o.NUFUSILCE} ${o.ANNEADI} ${o.ANNETC} ${o.BABAADI} ${o.BABATC} ${o.UYRUK}`).join('\n')
                   interaction.member.send(`<:haha:1061593547830202398> ${il} ailesinde **${data.length}** kişi bulundu.`)
                    let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `sonuc.json`);
                    interaction.member.send({ content: `<:haha:1061593547830202398> ${il} ailesinde **${data.length}** kişi bulundu.`, files: [ dosyahazırla ], ephemeral: false });
                    
                  }); 
                } else { 
                  con.query(`SELECT * FROM 101m WHERE ANNEADI="${isim}" AND SOYADI="${il}"`, function (err, result) {
                    if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))


                    let as31 = data.map((o) => `${o.TC} ${o.ADI} ${o.SOYADI} ${o.DOGUMTARIHI} ${o.NUFUSIL} ${o.NUFUSILCE} ${o.ANNEADI} ${o.ANNETC} ${o.BABAADI} ${o.BABATC} ${o.UYRUK}`).join('\n')
                    //interaction.channel.send(`<:haha:1061593547830202398> ${isim} ${soyisim} isminde **${data.length}** kişi bulundu.`)
                    let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `sonuc.json`);
              //interaction.channel.send({ files: [ dosyahazırla ] })
             interaction.member.send({ content: ` ${il} ailesinde **${data.length}** kişi bulundu.`, files: [ dosyahazırla ], ephemeral: false });

           
                  }); 
            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}