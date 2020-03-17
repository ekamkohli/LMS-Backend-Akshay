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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const joi_1 = __importDefault(require("joi"));
let AuthController = class AuthController {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
        this.validate = (authRequest) => {
            const schema = {
                email: joi_1.default.string().min(5).max(255).email(),
                password: joi_1.default.string().min(5).max(255).required()
            };
            return joi_1.default.validate(authRequest, schema);
        };
    }
    async create(authRequest) {
        try {
            await this.validate(authRequest);
            let employee = await this.employeeRepository.findOne({ where: { email: authRequest.email } });
            if (!employee)
                throw new Error("No employee with the provided email id");
            let isValidUser = authRequest.password === employee.password;
            if (!isValidUser)
                throw new Error("Invalid username or password");
            //const token = jwt.sign({ _id: employee._id, name: employee.name, email: employee.email }, "jsonPrivateKey")
            const token = {
                _id: employee.id,
                name: `${employee.firstName} ${employee.lastName}`,
                email: employee.email,
                role: employee.role
            };
            return token;
        }
        catch (err) {
            console.log(err.toString());
            throw { status: 400, message: err.toString() };
        }
    }
};
__decorate([
    rest_1.post('/auth', {
        responses: {
            '200': {
                description: 'Employee model instance',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                name: { type: 'string' },
                                email: { type: 'string' },
                                role: { type: 'string' },
                            }
                        }
                    }
                },
            },
        }
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: { type: 'string' },
                        password: { type: 'string' }
                    }
                },
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
AuthController = __decorate([
    __param(0, repository_1.repository(repositories_1.EmployeeRepository)),
    __metadata("design:paramtypes", [repositories_1.EmployeeRepository])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map