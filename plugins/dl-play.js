import fetch from 'node-fetch'
import ytdl from 'ytdl-core'
import yts from 'youtube-yts'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'

const streamPipeline = promisify(pipeline)

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  if (!text) throw `𝚂𝙴𝙻𝙴𝙲𝙸𝙾𝙽𝙴 𝚄𝙽 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝙿𝙰𝚁𝙰 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁𝙻𝙾 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: *${usedPrefix + command}* 𝙸 𝙰𝙼 𝙼𝙰𝙲𝙷𝙸𝙽𝙴`
  conn.remplay = conn.remplay ? conn.remplay : {}
  await conn.reply(m.chat, wait, m)
  const result = await searchAndDownloadMusic(text)
  const infoText = `✦ ──『 \`𝙿𝙻𝙰𝚈𝙻𝙸𝚂𝚃 𝚁𝙴𝙼\` 』── ⚝ \n\n [ ‹𝟹 𝚁𝚎𝚜𝚙𝚘𝚗𝚍𝚊 𝚎𝚜𝚝𝚎 𝚖𝚎𝚗𝚜𝚊𝚓𝚎 𝚌𝚘𝚗 𝚞𝚗 𝚗𝚞𝚖𝚎𝚛𝚘 𝚍𝚎 𝚕𝚊 𝚕𝚒𝚜𝚝𝚊 𝚍𝚎 𝚊𝚋𝚊𝚓𝚘 𝚙𝚊𝚛𝚊 𝚜𝚊𝚋𝚎𝚛 𝚜𝚞 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊]. \n\n`

  const orderedLinks = result.allLinks.map((link, index) => {
    const sectionNumber = index + 1
    const { title, url } = link
    return `*${sectionNumber}.* ${title}`
  })

  const orderedLinksText = orderedLinks.join('\n\n')
  const fullText = `${infoText}\n\n${orderedLinksText}`
  const { key } = await conn.reply(m.chat, fullText, m)
  conn.remplay[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key,
      })
      delete conn.remplay[m.sender]
    }, 150 * 1000),
  }
}

handler.before = async (m, { conn }) => {
  conn.remplay = conn.remplay ? conn.remplay : {}
  if (m.isBaileys || !(m.sender in conn.remplay)) return
  const { result, key, timeout } = conn.remplay[m.sender]

  if (!m.quoted || m.quoted.id !== key.id || !m.text) return
  const choice = m.text.trim()
  const inputNumber = Number(choice)
  if (inputNumber >= 1 && inputNumber <= result.allLinks.length) {
    const selectedUrl = result.allLinks[inputNumber - 1].url
    console.log('selectedUrl', selectedUrl)
    let title = generateRandomName()
    const audioStream = ytdl(selectedUrl, {
      filter: 'audioonly',
      quality: 'highestaudio',
    })

    const tmpDir = os.tmpdir()

    const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`)

    await streamPipeline(audioStream, writableStream)

    const doc = {
      audio: {
        url: `${tmpDir}/${title}.mp3`,
      },
      mimetype: 'audio/mpeg',
      ptt: false,
      waveform: [100, 0, 0, 0, 0, 0, 100],
      fileName: `${title}`,
    }

    await conn.sendMessage(m.chat, doc, { quoted: m })
  } else {
    m.reply(
      '𝙽𝚞𝚖𝚎𝚛𝚘 𝚒𝚗𝚟𝚊𝚕𝚒𝚍𝚘 𝚙𝚘𝚛 𝚏𝚊𝚟𝚘𝚛 𝚜𝚎𝚕𝚎𝚌𝚒𝚘𝚗𝚎 𝚞𝚗 𝚗𝚞𝚖𝚎𝚛𝚘 𝚟𝚊𝚕𝚒𝚍𝚘 𝚍𝚎 𝚕𝚊 𝚕𝚒𝚜𝚝𝚊.\n𝚍𝚎𝚕 𝟷 𝚊 ' +
        result.allLinks.length
    )
  }
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(play)$/i
handler.limit = true
export default handler

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

async function searchAndDownloadMusic(query) {
  try {
    const { videos } = await yts(query)
    if (!videos.length) return '𝙻𝚘 𝚜𝚒𝚎𝚗𝚝𝚘 𝚗𝚘 𝚜𝚎 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚘 𝚗𝚒𝚗𝚐𝚞𝚗 𝚛𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘.'

    const allLinks = videos.map(video => ({
      title: video.title,
      url: video.url,
    }))

    const jsonData = {
      title: videos[0].title,
      description: videos[0].description,
      duration: videos[0].duration,
      author: videos[0].author.name,
      allLinks: allLinks,
      videoUrl: videos[0].url,
      thumbnail: videos[0].thumbnail,
    }

    return jsonData
  } catch (error) {
    return 'Error: ' + error.message
  }
}

async function fetchVideoBuffer() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
    return await response.buffer()
  } catch (error) {
    return null
  }
}

function generateRandomName() {
  const adjectives = [
    'happy',
    'sad',
    'funny',
    'brave',
    'clever',
    'kind',
    'silly',
    'wise',
    'gentle',
    'bold',
  ]
  const nouns = ['cat', 'dog', 'bird', 'tree', 'river', 'mountain', 'sun', 'moon', 'star', 'cloud']

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

  return randomAdjective + '-' + randomNoun
}
