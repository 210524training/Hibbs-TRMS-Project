import TableItem from './Tableitem';

export default class user extends TableItem{
    constructor(
        public Type: "Employee" | "Supervisor" | "Department Head" | "Benefits Controller",
        public ID: number,
        public username:String,
        public password:string,
    ) {
        super(Type,ID);
    }
};