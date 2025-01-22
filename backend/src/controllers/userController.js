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
exports.updateUser = exports.signupUser = exports.logingUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
//create token
const createToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, process.env.SECRET || "", { expiresIn: "3d" });
};
//login user
const logingUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.login(email, password);
        //create token
        const token = createToken(user.email);
        res.status(200).json({ user, token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            // Handle the case where error is not an Error object
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.logingUser = logingUser;
//signup user
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    try {
        const user = yield userModel_1.default.signUp(fullName, email, password);
        //create token
        const token = createToken(user.email);
        res.status(200).json({ user, token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            // Handle the case where error is not an Error object
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.signupUser = signupUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newFullName, newEmail, oldEmail, password } = req.body;
    try {
        const user = yield userModel_1.default.update(newFullName, newEmail, oldEmail, password);
        //create token
        const token = createToken(user.email);
        res.status(200).json({ user, token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            // Handle the case where error is not an Error object
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.updateUser = updateUser;
