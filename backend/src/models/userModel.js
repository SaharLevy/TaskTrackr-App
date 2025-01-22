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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
userSchema.statics.signUp = function (fullName, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        //validation
        if (!email || !password) {
            throw Error("Email and password are required");
        }
        if (!fullName) {
            throw Error("Full name is required");
        }
        if (!validator_1.default.isEmail(email)) {
            throw Error("Email is not valid");
        }
        if (!validator_1.default.isStrongPassword(password)) {
            throw Error("Password is not strong enough");
        }
        const emailExists = yield this.findOne({ email });
        if (emailExists) {
            throw Error("Email already in use");
        }
        const saltRounds = 10;
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield this.create({ fullName, email, password: hashedPassword });
        return user;
    });
};
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password) {
            throw Error("Email and password are required");
        }
        const user = yield this.findOne({ email });
        if (!user) {
            throw Error("Incorrect email");
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw Error("Incorrect password");
        }
        return user;
    });
};
userSchema.statics.update = function (newFullName, newEmail, oldEmail, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!oldEmail) {
            throw Error("cant find user email in localstorage please login again");
        }
        const user = yield this.findOne({ email: oldEmail });
        if (!user) {
            throw Error("Incorrect email");
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw Error("Incorrect password");
        }
        const emailExists = yield this.findOne({ email: newEmail });
        if (emailExists && emailExists.email !== oldEmail) {
            throw Error("The email is already in use.");
        }
        let updatedUser;
        updatedUser = yield this.findOneAndUpdate({ email: oldEmail }, { email: newEmail, fullName: newFullName });
        return updatedUser;
    });
};
exports.default = (0, mongoose_1.model)("User", userSchema);
