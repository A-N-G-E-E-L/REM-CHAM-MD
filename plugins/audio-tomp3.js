import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
   /* let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `✳️ Reply to the video or voice note you want to convert to mp3 with the command :\n\n*${usedPrefix + command}*`*/
    let media = await q.download?.()
    if (!media) throw '𝚎𝚛𝚛𝚘𝚛 :('
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw '𝙾𝚌𝚞𝚛𝚛𝚒𝚘 𝚞𝚗 𝚎𝚛𝚛𝚘𝚛 𝚊𝚕 𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚒𝚛 𝚎𝚗 𝚖𝚙𝟹 :('
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
}
handler.help = ['tomp3']
handler.tags = ['fun']
handler.command = /^to(mp3|a(udio)?)$/i

export default handler
