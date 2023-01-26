const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const axios = require("axios")
const fs = require("fs")
const settings = require("../../botconfig/settings.json");
const { create, get, url } = require('sourcebin');

module.exports = {
    name: "stevevesika",
    description: "oyuncunun fotoğrafını çıkartır",
    cooldown: 1.5,
    memberpermissions: [],
    requiredroles: [
        "1063329129174405143" // paralı pre
    ],
    alloweduserids: [],
    options: [
        {

            "String":
            {
                name: "id",
                description: "oyuncunun id",
                required: true,
            },
        },
    ],
    async run(client, interaction, args, timeCooldowns) {
        var tc = interaction.options.getString("id")
        await interaction.reply({ content: "Yükleniyor...", ephemeral: true });
        // client.channels.cache.get('1065382972183822439').send(`${interaction.user} tarafından ${tc} tc'sinin vesikası sorgulandı.`)
        axios.get("https://ajexnetwork.com.tr/api/vesika?auth=1232y%C4%B1k%C4%B1lmazapi@5363&tc=" + tc)
            .then(async response => {
                var image = response.data.data.image
                const embed = new Discord.EmbedBuilder().setTitle('Sonuç Yok').setImage("https://media.discordapp.net/attachments/1063758992461025351/1064595052178972734/sonucyok.jpg");
                if (response.data.data.okulnumara === null) return await interaction.followUp({ embeds: [embed], ephemeral: true });
                var data = image.replace(/^data:image\/\w+;base64,/, '');
                fs.writeFile(`./${tc}.webp`, data, { encoding: 'base64' }, async function (err) {
                    if (err) return console.log(err)
                    const embed = new Discord.EmbedBuilder().setTitle('352 Finder').setImage(`attachment://${tc}.webp`);
                    try {
                        await interaction.followUp({ embeds: [embed], files: [`./${tc}.webp`], ephemeral: true });
                        fs.unlink(`./${tc}.webp`)
                    } catch (e) {
                        await interaction.followUp({
                            content: "Mesaj Gönderilirken Bir Hata Oluştu!\n\nHata:" + e,
                            ephemeral: true
                        })
                    }
                });

            }).catch(async error => {
                if (error.code === 'ETIMEDOUT') {
                    await interaction.editReply({
                        content: `API İle Bağlantı Zaman Aşımına Uğradı Daha Sonra Tekrar Deneyin **Uzun Süredir Bu Hata Veriyorsa Geliştiricilerle iletişime geçin**`,
                        ephemeral: true
                    })
                }
            })
    }
}