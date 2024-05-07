import { webp2mp4 } from '../lib/webp2mp4.js'
import { ffmpeg } from '../lib/converter.js'

let handler = async (m, { conn }) => {
    if (!m.quoted) throw '`𝚁𝚎𝚜𝚙𝚘𝚗𝚍𝚎 𝚊 𝚞𝚗 𝚜𝚝𝚒𝚔𝚎𝚛 𝚊𝚗𝚒𝚖𝚊𝚍𝚘`'
    let mime = m.quoted.mimetype || ''
    if (!/webp|audio/.test(mime)) throw '`𝚁𝚎𝚜𝚙𝚘𝚗𝚍𝚎 𝚊 𝚞𝚗 𝚜𝚝𝚒𝚔𝚎𝚛 𝚊𝚗𝚒𝚖𝚊𝚍𝚘`'
    let media = await m.quoted.download()
    let out = Buffer.alloc(0)
    if (/webp/.test(mime)) {
        out = await webp2mp4(media)
    } else if (/audio/.test(mime)) {
        out = await ffmpeg(media, [
            '-filter_complex', 'color',
            '-pix_fmt', 'yuv420p',
            '-crf', '51',
            '-c:a', 'copy',
            '-shortest'
        ], 'mp3', 'mp4')
    }
    await conn.sendFile(m.chat, out, 'tovid.mp4', '`𝙰𝚚𝚞𝚒 𝚝𝚒𝚎𝚗𝚎𝚜 :𝟹`' , m)
}
handler.help = ['tovid']
handler.tags = ['sticker']
handler.command = ['tovideo', 'tovid']

export default handler
