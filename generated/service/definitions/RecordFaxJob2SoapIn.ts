
/** RecordFaxJob2SoapIn */
export interface RecordFaxJob2SoapIn {
    /** s:string */
    terminal_name?: string;
    /** s:string */
    device_name?: string;
    /** s:int */
    bill?: number;
    /** s:string */
    user_id?: string;
    /** s:double */
    amount?: number;
    /** s:string */
    code?: string;
    /** s:int */
    pages?: number;
    /** s:string */
    phone_number?: string;
    /** s:string */
    receiver?: string;
    /** s:int */
    duration?: number;
    /** s:dateTime */
    job_time?: Date;
}
