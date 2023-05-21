import { getInput, setFailed } from '@actions/core';
import axios from 'axios';

export async function runAction() {

  try {
    const basecamp_token = process.env.BASECAMP_CHATBOT_SECRET
    const account_id = getInput('account_id')
    const bucket_id = getInput('bucket_id')
    const chat_id = getInput('chat_id')
    const message = getInput('message')

    if (!basecamp_token) {
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
    setFailed(error.message);
  }
}

if (import.meta.main) {
  runAction();
}