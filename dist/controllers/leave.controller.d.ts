import { Count, Filter, Where } from '@loopback/repository';
import { Leave } from '../models';
import { LeaveRepository } from '../repositories';
import { EmployeeRepository } from '../repositories';
interface LeaveUpdateRequest {
    status: string;
}
export declare class LeaveController {
    leaveRepository: LeaveRepository;
    employeeRepository: EmployeeRepository;
    constructor(leaveRepository: LeaveRepository, employeeRepository: EmployeeRepository);
    invalidDays: (startDate: string, endDate: string, halfDay: boolean) => boolean;
    getLeaveDuration: (start: string, end: string, halfDay: boolean) => number;
    create(leave: Omit<Leave, 'id & firstName & lastName'>): Promise<Leave>;
    count(where?: Where<Leave>): Promise<Count>;
    find(filter?: Filter<Leave>): Promise<Leave[]>;
    findEmployeeLeaves(employeeId: string, status: string): Promise<Leave[]>;
    findApproverLeaves(employeeId: string, status: string): Promise<Leave[]>;
    updateById(id: string, leaveUpdateRequest: LeaveUpdateRequest): Promise<Leave>;
}
export {};
