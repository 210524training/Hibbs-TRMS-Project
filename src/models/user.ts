import TableItem from './Tableitem';
import uuid from 'uuid';

export default class user extends TableItem{
    constructor(
        public Type: "Employee" | "Supervisor" | "Department Head" | "Benefits Controller",
        public ID: string=uuid.v4(),
        public username:String,
        public password:string,
    ) {
        super(Type,ID);
    }
};