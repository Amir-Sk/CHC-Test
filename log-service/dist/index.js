"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 8082;
app.post('/', (req, res) => {
    const arr = req.body.array;
    console.log('recieved array', arr);
    res.send(true);
});
app.listen(port, () => {
    console.log(`Log Service is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map