"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const errors_1 = require("../errors");
const requireAuth = (req, res, next) => {
    if (!req.user) {
        throw new errors_1.UnauthorizedError('Not authenticated');
    }
    next();
};
exports.requireAuth = requireAuth;
