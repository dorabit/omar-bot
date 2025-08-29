module.exports.config = {
  name: "dev",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "حمودي سان 🇸🇩",
  description: "عرض معلومات المطور",
  commandCategory: "معلومات",
  usages: "{prefix}dev",
  cooldowns: 3
};

module.exports.run = async function({ api, event }) {
  return api.sendMessage(
    "👑 مطور البوت 👑\n\n" +
    "الاسم: حمودي سان 🇸🇩\n" +
    "الفيسبوك: https://www.facebook.com/babasnfor80\n\n" +
    "✨ شكراً لاستخدامك بوت دورا ✨",
    event.threadID,
    event.messageID
  );
};
