import { Count, Filter, Where } from '@loopback/repository';
import { LeaveType } from '../models';
import { LeaveTypeRepository, EmployeeRepository } from '../repositories';
export declare class LeaveTypeController {
    leaveTypeRepository: LeaveTypeRepository;
    employeeRepository: EmployeeRepository;
    constructor(leaveTypeRepository: LeaveTypeRepository, employeeRepository: EmployeeRepository);
    create(leaveTypeRequest: LeaveType): Promise<LeaveType>;
    count(where?: Where<LeaveType>): Promise<Count>;
    find(filter?: Filter<LeaveType>): Promise<LeaveType[]>;
    updateAll(leaveType: LeaveType, where?: Where<LeaveType>): Promise<Count>;
    findById(id: string, filter?: Filter<LeaveType>): Promise<LeaveType>;
    updateById(id: string, leaveType: LeaveType): Promise<void>;
    replaceById(id: string, leaveType: LeaveType): Promise<void>;
    deleteById(id: string): Promise<void>;
}
