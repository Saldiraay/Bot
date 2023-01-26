const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const axios = require("axios")
const fs = require("fs")
const settings = require("../../botconfig/settings.json");
const { create, get, url } = require('sourcebin');

module.exports = {
    name: "steveakraba",
    description: "oyuncunun tüm akrabalarını çıkartır",
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
    run: async (client, interaction) => {
        var tc = interaction.options.getString("id")
        await interaction.reply({ content: "Yükleniyor...", ephemeral: true });
        axios.get("https://condescending-mcnulty.93-177-102-204.plesk.page/lars.php?tc=" + tc)
            .then(async response => {
                try {
                    let jsonString = JSON.stringify(response.data);
                    jsonString = jsonString.replace(/\r\n/g, "");
                    const jsonData = JSON.parse(jsonString);
                    const last = JSON.stringify(jsonData,null,2)
                    const buffer = new Buffer.from(last);
                    const file = new Discord.MessageAttachment(buffer, "akraba.json", { type: 'text/plain' });
                    interaction.user.send({
                        content: ':clown: Sonuçları Çıkarttım',
files: [file],
                    })
                    interaction.editReply({
                        content: ('**Başarılı**, DM Adresine Gönderildi (dm adresiniz kapalı ise bot mesaj gönderemez'),
                    })
                } catch (e) {
                    console.log(e)
                }
            }).catch(error => {
                if (error.code === 'ETIMEDOUT') {
                    interaction.editReply({
                        content: '**API İle Bağlantı Zaman Aşımına Uğradı Daha Sonra Tekrar Deneyin **Uzun Süredir Bu Hata Veriyorsa Geliştiricilerle iletişime geçin**',
                        ephemeral: true
                    })
                }
            })
    }
}