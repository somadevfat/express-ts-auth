"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserEntity = createUserEntity;
const dateUtils_1 = require("../../../../utils/dateUtils");
function createUserEntity(props) {
    const now = (0, dateUtils_1.getCurrentISODate)();
    return {
        id: 0, // DBで自動採番されるため、一時的な値
        email: props.email,
        password: props.password,
        emailVerifiedAt: null,
        emailReissueToken: null,
        isAdmin: false,
        createdAt: now,
        updatedAt: now,
        createdBy: null, // 認証情報から設定するのが一般的
        updatedBy: null,
    };
}
