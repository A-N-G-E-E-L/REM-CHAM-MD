let handler = async(m, { conn, usedPrefix, command }) => {

    let don = `
╭────═[ *_𝘾𝙍𝙀𝘼𝘿𝙊𝙍_* ]═─────⋆
│╭───────────────···
┴│✯ *🗳️ ɴᴏᴍʙʀᴇ* : ᴄᴜʀɪ
✩│✯  𝙉𝙧𝙤 : 
✯│✯ wa.me/51913091648
✩│✯  𝙀𝙡 𝙚𝙨 𝙢𝙞 𝙘𝙧𝙚𝙖𝙙𝙤𝙧 :3
┬ʀᴇᴄᴜᴇʀᴅᴀ ɴᴏ ᴅᴇʙᴇꜱ
│ᴇꜱᴄʀɪʙɪʀʟᴇ ᴀ ᴍɪ ᴄʀᴇᴀᴅᴏʀ ᴀ
│ᴍᴇɴᴏꜱ Qᴜᴇ ꜱᴇᴀ ᴅᴇ ᴍᴜᴄʜᴀ
│ᴜʀɢᴇɴᴄɪᴀ.
╰───────────═┅═──────

`
let img = 'https://telegra.ph/file/c775e80b9043a37191b98.png'
conn.sendFile(m.chat, img, 'img.png', don, m, null, rpyp)
//conn.sendPayment(m.chat, '2000', 'USD', don, m.sender, m)
}

handler.help = ['donate']
handler.tags = ['main']
handler.command = ['creador', 'dueño', 'owner'] 

export default handler
