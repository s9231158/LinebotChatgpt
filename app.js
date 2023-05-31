// 引用linebot SDK
var linebot = require('linebot');
//chat
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: ""
});
const openai = new OpenAIApi(configuration);

// 填入辨識Line Channel的資訊
var bot = linebot({
    channelId: '',
    channelSecret: '',
    channelAccessToken: ''
});

// 當有人傳送訊息給Bot時
bot.on('message', async function (event) {
    //gpt接收line傳入訊息
    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: event.message.text,
            max_tokens: 200
        });
        //輸出訊息
            const reply = completion.data.choices[0].text.trim();
            event.reply(reply).then(function (data) {
              
            }).catch(function (error) {
                console.error('Error:', error);
            });
        }
     catch (error) {
        console.error('Error:', error);
    }
});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
});
