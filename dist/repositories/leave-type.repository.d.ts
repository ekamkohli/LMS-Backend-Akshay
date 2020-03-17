import { DefaultCrudRepository } from '@loopback/repository';
import { LeaveType, LeaveTypeRelations } from '../models';
import { DbDataSource } from '../datasources/db.datasource';
export declare class LeaveTypeRepository extends DefaultCrudRepository<LeaveType, typeof LeaveType.prototype.type, LeaveTypeRelations> {
    constructor(dataSource: DbDataSource);
}
