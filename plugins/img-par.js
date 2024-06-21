import parImages from '../lib/parImages.js'; 

let handler = async (m, { conn }) => {
    try {
        const { male, female } = parImages.default[Math.floor(Math.random() * parImages.default.length)]; 
        
        
        await conn.sendFile(m.chat, male, 'male.jpg', '😺 *Ｃｈｉｃｏ*\n\n`𝐑𝐄𝐌 -𝐁𝐎𝐓 - 𝐁𝐘 - 𝐂𝐔𝐑𝐈`', m, null, rcanal);
        
        
        await conn.sendFile(m.chat, female, 'female.jpg', '🐢 *Ｃｈｉｃａ*\n\n`𝐑𝐄𝐌 -𝐁𝐎𝐓 - 𝐁𝐘 - 𝐂𝐔𝐑𝐈`', m, null, rcanal);
    } catch (error) {
        console.error(error);
    }
};

handler.help = ['ppcouple'];
handler.tags = ['img'];
handler.command = ['ppcouple', 'par'];
handler.register = true;

export default handler;
