"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register_1 = __importDefault(require("./routes/register"));
const auth_1 = __importDefault(require("./routes/auth"));
const dbHealtCheck_1 = __importDefault(require("./config/dbHealtCheck"));
const app = (0, express_1.default)().use(body_parser_1.default.json());
app.use('/register', register_1.default);
app.use('/auth', auth_1.default);
app.use((0, cookie_parser_1.default)());
(0, dbHealtCheck_1.default)()
    .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log('Servidor corriendo en el puerto', PORT);
    });
})
    .catch((error) => {
    console.error("No se pudo iniciar el servidor debido a un error en la base de datos:", error);
});
