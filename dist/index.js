"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import router from "./router";
const PORT = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use("/api", router);
app.listen(PORT, () => {
    console.log(`[API] local:    http://localhost:${PORT}/api`);
});
