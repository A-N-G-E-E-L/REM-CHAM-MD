let handler = async(m, { conn, usedPrefix, command }) => {

    let don = `
╭────═[ *𝘾𝙍𝙀𝘼𝘿𝙊𝙍* ]═─────⋆
│╭───────────────···
┴│✯ *🗳️ ɴᴏᴍʙʀᴇ* : ᴄᴜʀɪ
✩│✯  𝙉𝙧𝙤 : 
✯│✯ wa.me/51913091648
✩│✯  𝙀𝙡 𝙚𝙨 𝙢𝙞 𝙘𝙧𝙚𝙖𝙙𝙤𝙧 :3
┬│✯ 💫 ᴇꜱᴄʀɪʙɪʀ ꜱᴏʟᴏ 
││✯     ꜱɪ ᴇꜱ ɴᴇᴄᴇꜱᴀʀɪᴏ
│╰────────────────···
╰───────────═┅═──────────
`
let img = 'https://telegra.ph/file/068ad375f7c4b256bd786.jpg'
conn.sendFile(m.chat, img, 'img.jpg', don, m, null, rpyp)
//conn.sendPayment(m.chat, '2000', 'USD', don, m.sender, m)
}

handler.help = ['donate']
handler.tags = ['main']
handler.command = ['creador', 'dueño', 'owner'] 

export default handler