import { Entity } from '@loopback/repository';
import Joi from 'joi';
export declare class LeaveType extends Entity {
    static validate(leaveType: LeaveType): Joi.ValidationResult<LeaveType>;
    type: string;
    total: number;
    applied: number;
    availed: number;
    available: number;
    constructor(data?: Partial<LeaveType>);
}
export interface LeaveTypeRelations {
}
export declare type LeaveTypeWithRelations = LeaveType & LeaveTypeRelations;
