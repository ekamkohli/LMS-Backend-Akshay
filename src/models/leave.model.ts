import {Entity, model, property} from '@loopback/repository';
import Joi from 'joi';

@model()
export class Leave extends Entity {
  static validate(leave: Leave) {
    const schema = {
      employeeId: Joi.string().required(),
      approverId: Joi.string().required(),
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().required(),
      leaveType: Joi.string().required(),
      halfDay: Joi.boolean().required(),
      status: Joi.string().required(),
      message: Joi.string(),
      description: Joi.string(),
    }
    return Joi.validate(leave, schema);
  }

  static validStatus(leaveStatus: string) {
    const schema = Joi.string().valid(['approved', 'rejected'])
    return Joi.validate(leaveStatus, schema);
  }

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  employeeId: string;

  @property({
    type: 'string',
    required: true,
  })
  approverId: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  startDate: string;

  @property({
    type: 'string',
    required: true,
  })
  endDate: string;

  @property({
    type: 'number',
    required: true,
  })
  daysCount: number;

  @property({
    type: 'string',
    required: true,
  })
  leaveType: string;

  @property({
    type: 'boolean',
    required: true,
  })
  halfDay: boolean;

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
  })
  message: string;


  constructor(data?: Partial<Leave>) {
    super(data);
  }
}

export interface LeaveRelations {
  // describe navigational properties here
}

export type LeaveWithRelations = Leave & LeaveRelations;
