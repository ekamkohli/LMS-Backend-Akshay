"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const joi_1 = __importDefault(require("joi"));
let LeaveType = class LeaveType extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
    static validate(leaveType) {
        const schema = joi_1.default.object({
            total: joi_1.default.number().min(0).required(),
            available: joi_1.default.number().min(0).required(),
            availed: joi_1.default.number().min(0).required(),
            applied: joi_1.default.number().min(0).required()
        }).unknown(true);
        return joi_1.default.validate(leaveType, schema);
    }
};
__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: false,
        required: true,
    }),
    __metadata("design:type", String)
], LeaveType.prototype, "type", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    __metadata("design:type", Number)
], LeaveType.prototype, "total", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        default: 0
    }),
    __metadata("design:type", Number)
], LeaveType.prototype, "applied", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        default: 0
    }),
    __metadata("design:type", Number)
], LeaveType.prototype, "availed", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        default: 0
    }),
    __metadata("design:type", Number)
], LeaveType.prototype, "available", void 0);
LeaveType = __decorate([
    repository_1.model(),
    __metadata("design:paramtypes", [Object])
], LeaveType);
exports.LeaveType = LeaveType;
//# sourceMappingURL=leave-type.model.js.map