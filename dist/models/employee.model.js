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
const models_1 = require("../models");
let Employee = class Employee extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
    static validate(employeeRequest) {
        const objectSchema = joi_1.default.object({
            type: joi_1.default.string().min(1).required(),
            total: joi_1.default.number().required(),
            applied: joi_1.default.number().required(),
            availed: joi_1.default.number().required(),
            available: joi_1.default.number().required()
        });
        const schema = {
            firstName: joi_1.default.string().min(3).max(50).required(),
            middleName: joi_1.default.string().min(0).max(255).allow(""),
            lastName: joi_1.default.string().min(3).max(255).required(),
            email: joi_1.default.string().min(5).max(255).email(),
            empId: joi_1.default.number().min(1),
            doj: joi_1.default.string().min(5).max(255).required(),
            gender: joi_1.default.string().valid("male", "female", "other"),
            status: joi_1.default.string(),
            role: joi_1.default.string().min(5).max(255).required(),
            approver: joi_1.default.string().required().allow(""),
            password: joi_1.default.string().min(5).max(1024).required(),
            leaves: joi_1.default.array().items(objectSchema)
        };
        return joi_1.default.validate(employeeRequest, schema);
    }
};
__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "firstName", void 0);
__decorate([
    repository_1.property({
        type: 'string',
    }),
    __metadata("design:type", String)
], Employee.prototype, "middleName", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "lastName", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    repository_1.property({
        type: 'number',
    }),
    __metadata("design:type", String)
], Employee.prototype, "empId", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "doj", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "role", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        default: "",
    }),
    __metadata("design:type", String)
], Employee.prototype, "approver", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        default: "active"
    }),
    __metadata("design:type", String)
], Employee.prototype, "status", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "gender", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "password", void 0);
__decorate([
    repository_1.property.array(models_1.LeaveType),
    __metadata("design:type", Array)
], Employee.prototype, "leaves", void 0);
Employee = __decorate([
    repository_1.model(),
    __metadata("design:paramtypes", [Object])
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=employee.model.js.map