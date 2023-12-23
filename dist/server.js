"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const todos_1 = __importDefault(require("./backend/routes/todos"));
app_1.default.use(body_parser_1.default.json());
const port = validateEnv_1.default.Port;
console.log(port);
mongoose_1.default
    .connect(validateEnv_1.default.MongoConnectionString)
    .then(() => {
    console.log("Mongoose Connected!");
    app_1.default.listen(port);
})
    .catch((err) => {
    console.log(err);
});
app_1.default.use(todos_1.default);
