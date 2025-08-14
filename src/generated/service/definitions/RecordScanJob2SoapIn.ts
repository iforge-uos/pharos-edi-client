
/** RecordScanJob2SoapIn */
export interface RecordScanJob2SoapIn {
    /** s:string */
    transaction_id?: string;
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
    page_size?: string;
    /** s:string */
    scan_type?: string;
    /** s:dateTime */
    job_time?: Date;
}
