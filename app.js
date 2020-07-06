const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');

const wc = new WebClient(process.env.SLACK_TOKEN);
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

const downvote = async (channel, ts) => {
    await wc.reactions.add({
        token: process.env.USER_TOKEN,
        channel: channel,
        name: 'downvote',
        timestamp: ts
    })
}


slackEvents.on('message', async event => {
    if (event.text.match(/(?:cln.sh)|(?:zootopia)/gi) && !event.text.includes('sucks')) {
        await downvote(
            event.channel,
            event.ts
        )
    }
});

slackEvents.start(3000).then(() => {
    console.log('starting server!');
})
