"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./src/routes/express"));
const port = process.env.PORT || 5000;
express_1.default.listen(port, () => {
    console.log(`Server has started listining on ${port}`);
});
