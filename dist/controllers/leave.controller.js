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
const repositories_2 = require("../repositories");
let LeaveController = class LeaveController {
    constructor(leaveRepository, employeeRepository) {
        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
        this.invalidDays = (startDate, endDate, halfDay) => {
            if (!halfDay)
                return false;
            let start = new Date(startDate);
            let end = new Date(endDate);
            return start.toString() !== end.toString();
        };
        this.getLeaveDuration = (start, end, halfDay) => {
            if (halfDay)
                return 0.5;
            let startDate = new Date(start);
            let endDate = new Date(end);
            let count = 0;
            for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                let day = d.getDay();
                if (day == 0 || day == 6) {
                    continue;
                }
                count++;
            }
            return count;
        };
    }
    async create(leave) {
        try {
            console.log(leave);
            await models_1.Leave.validate(leave);
            const employee = await this.employeeRepository.findById(leave.employeeId);
            if (!employee)
                throw new Error("Invalid Employee Id");
            const approver = await this.employeeRepository.findById(leave.approverId);
            if (employee.approver != leave.approverId)
                throw new Error("Provided approver is not the approver of provided employee");
            if (!approver)
                throw new Error("Invalid Approver Id");
            if (this.invalidDays(leave.startDate, leave.endDate, leave.halfDay))
                throw new Error("start and end date should be same for half day");
            let daysCount = this.getLeaveDuration(leave.startDate, leave.endDate, leave.halfDay);
            const employeeLeave = employee.leaves.find(leaveObject => leaveObject.type === leave.leaveType);
            if (employeeLeave === undefined || employeeLeave.available < daysCount) {
                throw new Error("Employee Does not have that many leaves of the given type");
            }
            employeeLeave.available -= daysCount;
            employeeLeave.applied += daysCount;
            leave.status = "pending";
            leave.firstName = employee.firstName;
            leave.lastName = employee.lastName;
            leave.daysCount = daysCount;
            await this.employeeRepository.update(employee);
            const savedLeave = await this.leaveRepository.create(leave);
            //Code for Email sending
            // const responseEmp = await emailLeavePostEmp(employee.email,leave.firstName,leave.halfDay,leave.leaveType,leave.description,leave.startDate,leave.endDate,leave.daysCount);
            // const responseApp = await emailLeavePostApp(approver.email,leave.firstName,leave.halfDay,leave.leaveType,leave.description,leave.startDate,leave.endDate,leave.daysCount);
            // console.log('Employee email res:', responseEmp);
            // console.log('Approver email res:', responseApp);
            return savedLeave;
        }
        catch (err) {
            console.log(err.stack);
            console.log(err.toString());
            throw { status: 400, message: err.toString() };
        }
    }
    async count(where) {
        return this.leaveRepository.count(where);
    }
    async find(filter) {
        return this.leaveRepository.find(filter);
    }
    async findEmployeeLeaves(employeeId, status) {
        try {
            const employee = await this.employeeRepository.findById(employeeId);
            if (!employee)
                throw new Error("Employee with given employee id not found");
            if (status === "pending" || status === "rejected" || status === "approved") {
                const leaves = await this.leaveRepository.find({ where: { employeeId: { like: employeeId }, status: status } });
                return leaves;
            }
            else {
                const leaves = await this.leaveRepository.find({ where: { employeeId: { like: employeeId } } });
                return leaves;
            }
        }
        catch (err) {
            console.log(err.stack);
            console.log(err.toString());
            throw { status: 400, message: err.toString() };
        }
    }
    async findApproverLeaves(employeeId, status) {
        try {
            const employee = await this.employeeRepository.findById(employeeId);
            if (!employee)
                throw new Error("Employee with given employee id not found");
            if (status === "pending" || status === "rejected" || status === "approved") {
                const leaves = await this.leaveRepository.find({ where: { approverId: { like: employeeId }, status: status } });
                return leaves;
            }
            else {
                const leaves = await this.leaveRepository.find({ where: { approverId: { like: employeeId } } });
                return leaves;
            }
        }
        catch (err) {
            console.log(err.stack);
            console.log(err.toString());
            throw { status: 400, message: err.toString() };
        }
    }
    async updateById(id, leaveUpdateRequest) {
        try {
            const leave = await this.leaveRepository.findById(id);
            if (leave.status != "pending")
                throw new Error("Leave has already been approved or rejected");
            if (!leave)
                throw new Error("Invalid leave id provided");
            await models_1.Leave.validStatus(leaveUpdateRequest.status);
            const employee = await this.employeeRepository.findById(leave.employeeId);
            if (!employee)
                throw new Error("Employee ID mentioned in leave does not exist now");
            const employeeLeave = employee.leaves.find(leaveItems => leaveItems.type === leave.leaveType);
            if (employeeLeave === undefined) {
                throw new Error("The type of leave provided during leave application no longer exists in the database");
            }
            if (leaveUpdateRequest.status === "approved") {
                employeeLeave.applied -= leave.daysCount;
                employeeLeave.availed += leave.daysCount;
                leave.status = "approved";
            }
            else if (leaveUpdateRequest.status === "rejected") {
                employeeLeave.applied -= leave.daysCount;
                employeeLeave.available += leave.daysCount;
                leave.status = "rejected";
            }
            await this.employeeRepository.updateById(leave.employeeId, employee);
            const updatedLeave = await this.leaveRepository.updateById(id, leave);
            //Code for emailing
            // if(leave.status === "approved") {
            //   const responseApp = await emailLeavePatchAcc(employee.email,employee.firstName,leave.halfDay,leave.leaveType,leave.startDate,leave.endDate);
            //   console.log('Approved email res:', responseApp); 
            // } else if(leave.status === "rejected") {
            //   const responseRej = await emailLeavePatchRej(employee.email,employee.firstName,leave.halfDay,leave.leaveType,leave.startDate,leave.endDate);
            //   console.log('Rejected email res:', responseRej);
            // }
            return leave;
        }
        catch (err) {
            console.log(err.stack);
            console.log(err.toString());
            throw { status: 400, message: err.toString() };
        }
    }
};
__decorate([
    rest_1.post('/leaves', {
        responses: {
            '200': {
                description: 'Leave model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Leave) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Leave, {
                    title: 'NewLeave',
                    exclude: ['id', 'firstName', 'lastName', 'daysCount'],
                }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "create", null);
__decorate([
    rest_1.get('/leaves/count', {
        responses: {
            '200': {
                description: 'Leave model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Leave))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "count", null);
__decorate([
    rest_1.get('/leaves', {
        responses: {
            '200': {
                description: 'Array of Leave model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Leave, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Leave))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "find", null);
__decorate([
    rest_1.get('/leaves/employee/{employeeId}/{status}', {
        responses: {
            '200': {
                description: 'Array of Leave model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Leave, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.string('employeeId')),
    __param(1, rest_1.param.path.string('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "findEmployeeLeaves", null);
__decorate([
    rest_1.get('/leaves/approver/{employeeId}/{status}', {
        responses: {
            '200': {
                description: 'Array of Leave model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Leave, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.string('employeeId')),
    __param(1, rest_1.param.path.string('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "findApproverLeaves", null);
__decorate([
    rest_1.patch('/leaves/{id}', {
        responses: {
            '200': {
                description: 'Leave model instance',
                content: { 'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Leave, {
                            title: 'Update Status',
                            exclude: ['id'],
                        })
                    } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' }
                    }
                },
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "updateById", null);
LeaveController = __decorate([
    __param(0, repository_1.repository(repositories_1.LeaveRepository)),
    __param(1, repository_1.repository(repositories_2.EmployeeRepository)),
    __metadata("design:paramtypes", [repositories_1.LeaveRepository,
        repositories_2.EmployeeRepository])
], LeaveController);
exports.LeaveController = LeaveController;
//# sourceMappingURL=leave.controller.js.map