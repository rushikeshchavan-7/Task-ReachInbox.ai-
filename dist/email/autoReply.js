"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReply = generateReply;
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
function generateReply(category) {
    return __awaiter(this, void 0, void 0, function* () {
        let prompt;
        if (category === 'Interested') {
            prompt = 'Write a reply asking to schedule a demo call with suggested time slots.';
        }
        else if (category === 'Not Interested') {
            prompt = 'Write a polite thank you for the email, expressing understanding.';
        }
        else if (category === 'More Information') {
            prompt = 'Write a reply asking for more details and offering to schedule a meeting.';
        }
        const response = yield openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 150,
        });
        const reply = response.data.choices[0].text.trim();
        return reply;
    });
}
