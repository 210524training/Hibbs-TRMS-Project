import uuid from 'uuid';

export default class TableItem {
    constructor(
        public Type: "Employee" | "Supervisor" | "Department Head" | "Benefits Controller" | "Request" | "Reimbursement",
        public ID: string=uuid.v4(),
    ) {}
  };