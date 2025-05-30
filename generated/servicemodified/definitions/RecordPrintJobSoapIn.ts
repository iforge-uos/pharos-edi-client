
/** RecordPrintJobSoapIn */
export interface RecordPrintJobSoapIn {
    /** s:string */
    server?: string;
    /** s:string */
    printer?: string;
    /** s:int */
    pages?: number;
    /** s:int */
    sheets?: number;
    /** s:int */
    bill?: number;
    /** s:string */
    user_id?: string;
    /** s:double */
    cost?: number;
    /** s:string */
    job_attributes?: string;
    /** s:string */
    code?: string;
    /** s:dateTime */
    job_time?: Date;
}
