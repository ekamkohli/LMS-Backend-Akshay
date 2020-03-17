import {DefaultCrudRepository} from '@loopback/repository';
import {Leave, LeaveRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LeaveRepository extends DefaultCrudRepository<
  Leave,
  typeof Leave.prototype.id,
  LeaveRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Leave, dataSource);
  }
}
