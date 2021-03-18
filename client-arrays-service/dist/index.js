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
const cors_1 = __importDefault(require("cors"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = __importDefault(require("./config"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
const port = config_1.default.CLIENT_ARRAYS_PORT;
const logServiceURL = `http://${config_1.default.LOG_HOST}:${config_1.default.LOG_PORT}/`;
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const num = req.body.number || 0;
    const result = [];
    console.log(`Received a POST request with the following number: ${num}`);
    if (num > 1 && num < 1000) {
        for (let i = num - 1; i > 0; i--) {
            result.push(i);
        }
    }
    yield node_fetch_1.default(logServiceURL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ array: result })
    });
    res.send(result);
}));
app.listen(port, () => {
    console.log(`Client Array Service is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map