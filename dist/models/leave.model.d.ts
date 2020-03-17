import { Entity } from '@loopback/repository';
import Joi from 'joi';
export declare class Leave extends Entity {
    static validate(leave: Leave): Joi.ValidationResult<Leave>;
    static validStatus(leaveStatus: string): Joi.ValidationResult<string>;
    id?: string;
    employeeId: string;
    approverId: string;
    firstName: string;
    lastName: string;
    startDate: string;
    endDate: string;
    daysCount: number;
    leaveType: string;
    halfDay: boolean;
    description: string;
    status: string;
    message: string;
    constructor(data?: Partial<Leave>);
}
export interface LeaveRelations {
}
export declare type LeaveWithRelations = Leave & LeaveRelations;
