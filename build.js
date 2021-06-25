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
const fs_extra_1 = __importDefault(require("fs-extra")); // npm install @types/fs-extra
const child_process_1 = __importDefault(require("child_process"));
const log_1 = __importDefault(require("./src/log"));
function remove(loc) {
    return new Promise((res, rej) => fs_extra_1.default.remove(loc, (err) => (err ? rej(err) : res())));
}
function copy(src, dest) {
    return new Promise((res, rej) => fs_extra_1.default.copy(src, dest, (err) => (err ? rej(err) : res())));
}
function exec(cmd, loc) {
    return new Promise((res, rej) => child_process_1.default.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
        if (stdout) {
            log_1.default.info(stdout);
        }
        if (stderr) {
            log_1.default.warn(stderr);
        }
        return (err ? rej(err) : res());
    }));
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Remove current build
        yield remove('./build/');
        // Copy front-end files
        yield copy('./src/public/views', './build/public/views'); //need to change to fit my folder structure
        yield copy('./src/public/css', './build/public/css');
        // Copy back-end files
        yield exec('tsc', './');
    }
    catch (err) {
        log_1.default.error(err);
    }
}))();
