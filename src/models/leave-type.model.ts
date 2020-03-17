import {Entity, model, property} from '@loopback/repository';
import Joi from 'joi'

@model()
export class LeaveType extends Entity {
  static validate(leaveType: LeaveType) {
    const schema = Joi.object({
      total: Joi.number().min(0).required(),
      available: Joi.number().min(0).required(),
      availed: Joi.number().min(0).required(),
      applied: Joi.number().min(0).required()
    }).unknown(true)
    return Joi.validate(leaveType, schema);
  }
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'number',
    required: true,
    default: 0
  })
  applied: number;

  @property({
    type: 'number',
    required: true,
    default: 0
  })
  availed: number;

  @property({
    type: 'number',
    required: true,
    default: 0
  })
  available: number;

  constructor(data?: Partial<LeaveType>) {
    super(data);
  }
}

export interface LeaveTypeRelations {
  // describe navigational properties here
}

export type LeaveTypeWithRelations = LeaveType & LeaveTypeRelations;
