"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
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
app_1.default.use((0, express_session_1.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
}));
// Initialize Passport
app_1.default.use(passport_1.default.initialize());
app_1.default.use(passport_1.default.session());
app_1.default.use("/api/user", userRoutes_1.default);
app_1.default.use(taskRoutes_1.default);
app_1.default.use((req, res, next) => {
    next(Error("Route not found"));
});
app_1.default.use(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(error, req, res, next) => {
    console.log(error);
    let errorMessage = "an unknown error occurred";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
});
