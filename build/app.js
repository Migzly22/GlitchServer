"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const SeverUtil_1 = __importDefault(require("./utils/SeverUtil"));
dotenv_1.default.config();
SeverUtil_1.default.init(6000);
