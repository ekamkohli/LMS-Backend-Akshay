import { EmployeeRepository } from "../repositories";
import Joi from "joi";
interface AuthRequest {
    email: string;
    password: string;
}
export declare class AuthController {
    employeeRepository: EmployeeRepository;
    constructor(employeeRepository: EmployeeRepository);
    validate: (authRequest: AuthRequest) => Joi.ValidationResult<AuthRequest>;
    create(authRequest: AuthRequest): Promise<Object>;
}
export {};
