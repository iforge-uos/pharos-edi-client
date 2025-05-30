
/** RecordCopyJobSoapIn */
export interface RecordCopyJobSoapIn {
    /** s:string */
    server?: string;
    /** s:string */
    copier?: string;
    /** s:int */
    bill?: number;
    /** s:string */
    user_id?: string;
    /** s:double */
    cost?: number;
    /** s:int */
    pages?: number;
    /** s:string */
    job_attributes?: string;
    /** s:string */
    code?: string;
    /** s:dateTime */
    job_time?: Date;
}
