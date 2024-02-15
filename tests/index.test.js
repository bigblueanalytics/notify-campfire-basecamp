
const run = require('../src/index');
const core = require('@actions/core');
const axios = require('axios');
jest.mock('@actions/core');
jest.mock('axios');

describe('run function', () => {
    beforeEach(() => {
        // Mock environment variables
        process.env.BASECAMP_CHATBOT_SECRET = 'test-secret';

        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('should call axios.post with correct parameters', async () => {
        // Setup
        const mockPost = jest.fn().mockResolvedValue({});
        axios.create = jest.fn().mockReturnValue({ post: mockPost });
        core.getInput = jest.fn((inputName) => {
            switch (inputName) {
                case 'account_id': return '123';
                case 'bucket_id': return '456';
                case 'chat_id': return '789';
                case 'message': return 'Test message';
                default: return null;
            }
        });

        // Execute
        await run();

        // Assert
        expect(axios.create).toBeCalledWith({
            baseURL: 'https://3.basecamp.com',
            timeout: 1000,
            headers: { 'Content-Type': 'application/json' },
        });
        expect(mockPost).toBeCalledWith(
            '/123/integrations/test-secret/buckets/456/chats/789/lines.json',
            { content: '<p>Test message</p>' }
        );
    });

    it('should throw error when BASECAMP_CHATBOT_SECRET is missing', async () => {
        // Setup
        process.env.BASECAMP_CHATBOT_SECRET = "";
        // Mock `setFailed` to track its calls
        core.setFailed = jest.fn();

        // Execute
        await run();

        // Assert
        expect(core.setFailed).toHaveBeenCalledWith('Missing BASECAMP_CHATBOT_SECRET environment variable. Eg: \nenv:\n\tBASECAMP_CHATBOT_SECRET: ${{ secrets.BASECAMP_CHATBOT_KEY }}\n');

    });
});
