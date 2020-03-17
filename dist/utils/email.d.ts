declare function emailEmpPostEmp(empEmail: string, empFirstName: string, empPass: string): Promise<any>;
declare function emailEmpPostApp(approverEmail: string, employeeFirstName: string, employeeEmail: string): Promise<any>;
declare function emailLeavePostEmp(empEmail: string, empFirstName: string, leaveDayBool: boolean, leaveType: string, description: string, startDate: string, endDate: string, daysCount: number): Promise<any>;
declare function emailLeavePostApp(approverEmail: string, empFirstName: string, leaveDayBool: boolean, leaveType: string, description: string, startDate: string, endDate: string, daysCount: number): Promise<any>;
declare function emailLeavePatchAcc(empEmail: string, empFirstName: string, leaveDayBool: boolean, leaveType: string, startDate: string, endDate: string): Promise<any>;
declare function emailLeavePatchRej(empEmail: string, empFirstName: string, leaveDayBool: boolean, leaveType: string, startDate: string, endDate: string): Promise<any>;
export { emailEmpPostEmp, emailEmpPostApp, emailLeavePostEmp, emailLeavePostApp, emailLeavePatchAcc, emailLeavePatchRej };
