# Campfire Notification Action - Basecamp

This action allows GitHub workflows to send messages directly to a Basecamp-Campfire chat. It leverages Basecamp's bot chat functionality, thereby eliminating the need for OAuth authentication. It's perfect for teams looking to enhance their workflows with real-time GitHub updates in their Basecamp-Campfire chats.

## Instructions

1. Create a chatbot on your basecamp follows this [article](https://3.basecamp-help.com/article/160-chatbots-and-webhooks)

2. Find your chatbot "Create line" url at your at your <kbd>Campfire</kbd> > <kbd>Configure chatbots</kbd> section.

![Configure Chatbots Section](./images/Configure%20Chatbots%20Section.png)

![Toggle create line URL](./images/Create%20Line%20URL.png)

*reference:* `https://3.basecampapi.com/ACCOUNT_ID/integrations/BASECAMP_CHATBOT_SECRET/buckets/BUCKET_ID/chats/CHAT_ID/lines.json`

Now add your chatbot key as a github secret `BASECAMP_CHATBOT_SECRET`. Click on <kbd>Settings</kbd> > <kbd>Secrets</kbd>

Collect your campfire bot `ACCOUNT_ID`, `BUCKET_ID` and `CHAT_ID`. Finally follow the [example usage](#example-usage).

## Example usage

```yaml
uses: actions/campfire-notification-action-basecamp@{commit}
env:
  BASECAMP_CHATBOT_SECRET: ${{ secrets.BASECAMP_CHATBOT_KEY }}
with:
  account_id: 'your-account-id'
  bucket_id: 'your-bucket-id'
  chat_id: 'your-chat-id'
  message: 'A new commit has been pushed 🔄'
```

## Inputs

### `account_id`

**Required** The ID of your Basecamp account. 

### `bucket_id`

**Required** The ID of your Basecamp bucket. 

### `chat_id`

**Required** The ID of the Basecamp-Campfire chat where the message will be sent.

### `message`

**Required** The message to be sent to the Basecamp-Campfire chat.

## Roadmap

- [ ] Add tests
- [ ] Include HTML example messages
- [ ] Add interactive buttons

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Credits

This GitHub action was created by [Yann Torres](https://github.com/onedesert) at [BigBlueAnalytics](https://github.com/bigblueanalytics). 

Your contributions to improve this GitHub action are welcomed. Please make sure to read the [contributing guidelines](CONTRIBUTING.md) before making a pull request.
