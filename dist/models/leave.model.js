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
let Leave = class Leave extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
    static validate(leave) {
        const schema = {
            employeeId: joi_1.default.string().required(),
            approverId: joi_1.default.string().required(),
            startDate: joi_1.default.date().iso().required(),
            endDate: joi_1.default.date().iso().required(),
            leaveType: joi_1.default.string().required(),
            halfDay: joi_1.default.boolean().required(),
            status: joi_1.default.string().required(),
            message: joi_1.default.string(),
            description: joi_1.default.string(),
        };
        return joi_1.default.validate(leave, schema);
    }
    static validStatus(leaveStatus) {
        const schema = joi_1.default.string().valid(['approved', 'rejected']);
        return joi_1.default.validate(leaveStatus, schema);
    }
};
__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    __metadata("design:type", String)
], Leave.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Leave.prototype, "employeeId", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Leave.prototype, "approverId", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Leave.prototype, "firstName", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Leave.prototype, "lastName", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Leave.prototype, "startDate", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Leave.prototype, "endDate", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    __metadata("design:type", Number)
], Leave.prototype, "daysCount", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Leave.prototype, "leaveType", void 0);
__decorate([
    repository_1.property({
        type: 'boolean',
        required: true,
    }),
    __metadata("design:type", Boolean)
], Leave.prototype, "halfDay", void 0);
__decorate([
    repository_1.property({
        type: 'string',
    }),
    __metadata("design:type", String)
], Leave.prototype, "description", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Leave.prototype, "status", void 0);
__decorate([
    repository_1.property({
        type: 'string',
    }),
    __metadata("design:type", String)
], Leave.prototype, "message", void 0);
Leave = __decorate([
    repository_1.model(),
    __metadata("design:paramtypes", [Object])
], Leave);
exports.Leave = Leave;
//# sourceMappingURL=leave.model.js.map