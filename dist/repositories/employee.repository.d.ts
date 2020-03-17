import { DefaultCrudRepository } from '@loopback/repository';
import { Employee, EmployeeRelations } from '../models';
import { DbDataSource } from '../datasources';
export declare class EmployeeRepository extends DefaultCrudRepository<Employee, typeof Employee.prototype.id, EmployeeRelations> {
    constructor(dataSource: DbDataSource);
}
