let handler = async(m, { conn, usedPrefix, command }) => {

    let don = `
╭────═[ *𝘾𝙍𝙀𝘼𝘿𝙊𝙍* ]═─────⋆
│╭───────────────···
┴│✯ *🗳️ ɴᴏᴍʙʀᴇ* : ᴄᴜʀɪ
✩│✯  𝙉𝙧𝙤 : 
✯│✯ wa.me/51913091648
✩│✯  𝙀𝙡 𝙚𝙨 𝙢𝙞 𝙘𝙧𝙚𝙖𝙙𝙤𝙧 :3
┬ʀᴇᴄᴜᴇʀᴅᴀ ɴᴏ ᴅᴇʙᴇꜱ
│ᴇꜱᴄʀɪʙɪʀʟᴇ ᴀ ᴍɪ ᴄʀᴇᴀᴅᴏʀ ᴀ
│ᴍᴇɴᴏꜱ Qᴜᴇ ꜱᴇᴀ ᴅᴇ ᴍᴜᴄʜᴀ
│ᴜʀɢᴇɴᴄɪᴀ ꜱɪ Qᴜɪᴇʀᴇ ʜᴀʙʟᴀʀ ᴇꜱ
│ᴄᴏɴ ᴍɪ ᴍᴏᴅᴇʀᴀᴅᴏʀᴀ ᴄᴏɴ ᴇʟ
│ᴄᴏᴍᴀɴᴅᴏ 
│✯ .𝘮𝘰𝘥𝘦𝘳𝘢𝘥𝘰𝘳𝘢 , .𝘮𝘰𝘥
╰───────────═┅═──────

`
let img = 'https://telegra.ph/file/ea6467f35579c3eaf0a09.png'
conn.sendFile(m.chat, img, 'img.png', don, m, null, rpyp)
//conn.sendPayment(m.chat, '2000', 'USD', don, m.sender, m)
}

handler.help = ['donate']
handler.tags = ['main']
handler.command = ['creador', 'dueño', 'owner'] 

export default handler
