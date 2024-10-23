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
exports.addEmailToQueue = addEmailToQueue;
const bullmq_1 = require("bullmq");
const openaiHelper_1 = require("../email/openaiHelper");
const autoReply_1 = require("../email/autoReply");
const emailQueue = new bullmq_1.Queue('email-processing');
function addEmailToQueue(content) {
    return __awaiter(this, void 0, void 0, function* () {
        yield emailQueue.add('process-email', { content });
    });
}
emailQueue.process((job) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = job.data;
    const category = yield (0, openaiHelper_1.categorizeEmail)(content);
    const reply = yield (0, autoReply_1.generateReply)(category);
    // Logic to send the reply via email (Gmail/Outlook API)
}));
