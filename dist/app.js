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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleAuth_1 = __importDefault(require("./auth/googleAuth"));
const outlookAuth_1 = __importDefault(require("./auth/outlookAuth"));
const taskScheduler_1 = require("./tasks/taskScheduler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(googleAuth_1.default);
app.use(outlookAuth_1.default);
app.post('/send-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    yield (0, taskScheduler_1.addEmailToQueue)(content);
    res.send('Email added to queue for processing');
}));
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
