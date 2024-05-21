import parImages from '../lib/parImages.js'; 

let handler = async (m, { conn }) => {
    try {
        const { male, female } = parImages.default[Math.floor(Math.random() * parImages.default.length)]; 
        
        
        await conn.sendFile(m.chat, male, 'male.jpg', '😺 *Ｃｈｉｃｏ*\n\n`𝚁𝙴𝙼-𝙱𝙾𝚃 𝚋𝚢 𝚌𝚞𝚛𝚒`', m);
        
        
        await conn.sendFile(m.chat, female, 'female.jpg', '🐢 *Ｃｈｉｃａ*\n\n`𝚁𝙴𝙼-𝙱𝙾𝚃 𝚋𝚢 𝚌𝚞𝚛𝚒`', m);
    } catch (error) {
        console.error(error);
    }
};

handler.help = ['ppcouple'];
handler.tags = ['img'];
handler.command = ['ppcouple', 'par'];
handler.register = true;

export default handler;
