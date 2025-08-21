"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJwtPayload = void 0;
const isJwtPayload = (value) => {
    return (typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "email" in value &&
        "isAdmin" in value);
};
exports.isJwtPayload = isJwtPayload;
