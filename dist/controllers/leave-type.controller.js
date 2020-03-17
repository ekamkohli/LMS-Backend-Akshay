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
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let LeaveTypeController = class LeaveTypeController {
    constructor(leaveTypeRepository, employeeRepository) {
        this.leaveTypeRepository = leaveTypeRepository;
        this.employeeRepository = employeeRepository;
    }
    async create(leaveTypeRequest) {
        try {
            await models_1.LeaveType.validate(leaveTypeRequest);
            if (leaveTypeRequest.available + leaveTypeRequest.applied + leaveTypeRequest.availed != leaveTypeRequest.total)
                throw new Error("Sum of Available, Applied and Availed leaves should be equal to Total");
            const leaveType = await this.leaveTypeRepository.findOne({ where: { type: leaveTypeRequest.type } });
            if (leaveType)
                throw new Error("Leave Type Already exists");
            const createdLeaveType = await this.leaveTypeRepository.create(leaveTypeRequest);
            const employees = await this.employeeRepository.find();
            employees.forEach(async (employee) => {
                employee.leaves.push(createdLeaveType);
                await this.employeeRepository.updateById(employee.id, employee);
            });
            return createdLeaveType;
        }
        catch (err) {
            console.log(err.stack);
            console.log(err.toString());
            throw { status: 400, message: err.toString() };
        }
    }
    async count(where) {
        return this.leaveTypeRepository.count(where);
    }
    async find(filter) {
        return this.leaveTypeRepository.find(filter);
    }
    async updateAll(leaveType, where) {
        return this.leaveTypeRepository.updateAll(leaveType, where);
    }
    async findById(id, filter) {
        return this.leaveTypeRepository.findById(id, filter);
    }
    async updateById(id, leaveType) {
        await this.leaveTypeRepository.updateById(id, leaveType);
    }
    async replaceById(id, leaveType) {
        await this.leaveTypeRepository.replaceById(id, leaveType);
    }
    async deleteById(id) {
        await this.leaveTypeRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/leave-types', {
        responses: {
            '200': {
                description: 'LeaveType model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.LeaveType) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.LeaveType, {
                    title: 'NewLeaveType',
                }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.LeaveType]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "create", null);
__decorate([
    rest_1.get('/leave-types/count', {
        responses: {
            '200': {
                description: 'LeaveType model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.LeaveType))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "count", null);
__decorate([
    rest_1.get('/leave-types', {
        responses: {
            '200': {
                description: 'Array of LeaveType model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.LeaveType, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.LeaveType))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "find", null);
__decorate([
    rest_1.patch('/leave-types', {
        responses: {
            '200': {
                description: 'LeaveType PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.LeaveType, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.LeaveType))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.LeaveType, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/leave-types/{id}', {
        responses: {
            '200': {
                description: 'LeaveType model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.LeaveType, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.LeaveType))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "findById", null);
__decorate([
    rest_1.patch('/leave-types/{id}', {
        responses: {
            '204': {
                description: 'LeaveType PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.LeaveType, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.LeaveType]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "updateById", null);
__decorate([
    rest_1.put('/leave-types/{id}', {
        responses: {
            '204': {
                description: 'LeaveType PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.LeaveType]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/leave-types/{id}', {
        responses: {
            '204': {
                description: 'LeaveType DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "deleteById", null);
LeaveTypeController = __decorate([
    __param(0, repository_1.repository(repositories_1.LeaveTypeRepository)),
    __param(1, repository_1.repository(repositories_1.EmployeeRepository)),
    __metadata("design:paramtypes", [repositories_1.LeaveTypeRepository,
        repositories_1.EmployeeRepository])
], LeaveTypeController);
exports.LeaveTypeController = LeaveTypeController;
//# sourceMappingURL=leave-type.controller.js.map