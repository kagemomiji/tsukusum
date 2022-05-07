"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const zlib_1 = __importDefault(require("zlib"));
const config_1 = __importDefault(require("config"));
const server = config_1.default.get('plantuml');
class PlantumlClient {
    constructor() {
    }
    static makePlantumlURL(body, format) {
        let components = [server.replace(/^\/|\/$/g, ""), format];
        components.push(this.getDiagramURIComponent(body));
        return components.join("/");
    }
    static getDiagramURIComponent(s) {
        let opt = { level: 9 };
        let d = zlib_1.default.deflateRawSync(Buffer.from(s), opt);
        let b = this.encode64(String.fromCharCode(...d.subarray(0)));
        return b;
    }
}
exports.default = PlantumlClient;
_a = PlantumlClient;
// from synchro.js
/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0.1
 * LastModified: Dec 25 1999
 */
PlantumlClient.encode64 = (data) => {
    let r = "";
    for (let i = 0; i < data.length; i += 3) {
        if (i + 2 == data.length) {
            r += _a.append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0);
        }
        else if (i + 1 == data.length) {
            r += _a.append3bytes(data.charCodeAt(i), 0, 0);
        }
        else {
            r += _a.append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), data.charCodeAt(i + 2));
        }
    }
    return r;
};
PlantumlClient.append3bytes = (b1, b2, b3) => {
    let c1 = b1 >> 2;
    let c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
    let c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
    let c4 = b3 & 0x3F;
    let r = "";
    r += _a.encode6bit(c1 & 0x3F);
    r += _a.encode6bit(c2 & 0x3F);
    r += _a.encode6bit(c3 & 0x3F);
    r += _a.encode6bit(c4 & 0x3F);
    return r;
};
PlantumlClient.encode6bit = (b) => {
    if (b < 10) {
        return String.fromCharCode(48 + b);
    }
    b -= 10;
    if (b < 26) {
        return String.fromCharCode(65 + b);
    }
    b -= 26;
    if (b < 26) {
        return String.fromCharCode(97 + b);
    }
    b -= 26;
    if (b == 0) {
        return '-';
    }
    if (b == 1) {
        return '_';
    }
    return '?';
};
