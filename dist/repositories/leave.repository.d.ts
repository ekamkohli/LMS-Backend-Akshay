import { DefaultCrudRepository } from '@loopback/repository';
import { Leave, LeaveRelations } from '../models';
import { DbDataSource } from '../datasources';
export declare class LeaveRepository extends DefaultCrudRepository<Leave, typeof Leave.prototype.id, LeaveRelations> {
    constructor(dataSource: DbDataSource);
}
