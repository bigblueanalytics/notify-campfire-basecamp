
const core = require("@actions/core");
const axios = require("axios")

async function run() {
    try {
        const basecamp_token = process.env.BASECAMP_CHATBOT_SECRET
        const account_id = core.getInput('account_id')
        const bucket_id = core.getInput('bucket_id')
        const chat_id = core.getInput('chat_id')
        const message = core.getInput('message')

        if (!basecamp_token) {
            console.log("WHATTT")
            throw Error('Missing BASECAMP_CHATBOT_SECRET environment variable. Eg: \nenv:\n\tBASECAMP_CHATBOT_SECRET: ${{ secrets.BASECAMP_CHATBOT_KEY }}\n')
        }

        const instance = axios.create({
          baseURL: 'https://3.basecamp.com',
          timeout: 1000,
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const chatLines = `/${account_id}/integrations/${basecamp_token}/buckets/${bucket_id}/chats/${chat_id}/lines.json`

        await instance.post(chatLines, { content: `<p>${message}</p>` })

      } catch (error) {
        core.setFailed(error.message);
      }
}

module.exports = run;
