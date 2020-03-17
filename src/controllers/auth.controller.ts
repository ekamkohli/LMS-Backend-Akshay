import { post, requestBody } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { EmployeeRepository, LeaveTypeRepository } from "../repositories";
import Joi from "joi";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';

interface AuthRequest {
  email: string,
  password: string
}

export class AuthController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) {}

  validate = (authRequest: AuthRequest) => {
    const schema = {
      email: Joi.string().min(5).max(255).email(),
      password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(authRequest, schema);
  }

  @post('/auth', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: { 
          'application/json': { 
            schema: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' },
              }
            } 
          } 
        },
      },
    }
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {type: 'string'},
              password: {type: 'string'}
            }
          },
        },
      },
    })
    authRequest: AuthRequest,
  ): Promise<Object> {
    try {
      await this.validate(authRequest);
      
      let employee = await this.employeeRepository.findOne( { where: { email: authRequest.email } } );
      if(!employee)
        throw new Error("No employee with the provided email id")
  
      let isValidUser = authRequest.password === employee.password
      if(!isValidUser) 
        throw new Error("Invalid username or password")
  
      //const token = jwt.sign({ _id: employee._id, name: employee.name, email: employee.email }, "jsonPrivateKey")
      const token = {
          _id: employee.id,
          name: `${ employee.firstName } ${ employee.lastName }`,
          email: employee.email,
          role: employee.role
      }
      return token;
    } catch (err) {
      console.log(err.toString());
      throw { status: 400, message: err.toString() }
    }
  }
}
