import {DefaultCrudRepository} from '@loopback/repository';
import {LeaveType, LeaveTypeRelations} from '../models';
import {DbDataSource} from '../datasources/db.datasource';
import {inject} from '@loopback/core';

export class LeaveTypeRepository extends DefaultCrudRepository<
  LeaveType,
  typeof LeaveType.prototype.type,
  LeaveTypeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(LeaveType, dataSource);
  }
}
