import { EmployeeRepository } from '../repositories';
import { LeaveTypeRepository } from '../repositories';
import { Employee } from '../models';
export declare class EmployeeController {
    employeeRepository: EmployeeRepository;
    leaveTypeRepository: LeaveTypeRepository;
    constructor(employeeRepository: EmployeeRepository, leaveTypeRepository: LeaveTypeRepository);
    getExpiredLeaves: (total: number) => number;
    create(employeeRequest: Employee): Promise<Object>;
    replaceById(id: string, employeeRequest: Employee): Promise<void>;
    find(): Promise<Employee[]>;
    findById(id: string): Promise<Employee>;
}
