
/** RecordCustomTransaction2SoapIn */
export interface RecordCustomTransaction2SoapIn {
    /** s:string */
    custom_transaction_type?: string;
    /** s:string */
    terminal_name?: string;
    /** s:int */
    bill?: number;
    /** s:string */
    user_id?: string;
    /** s:double */
    amount?: number;
    /** s:string */
    code?: string;
    /** s:dateTime */
    transaction_time?: Date;
    /** s:double */
    data_float1?: number;
    /** s:double */
    data_float2?: number;
    /** s:int */
    data_integer1?: number;
    /** s:int */
    data_integer2?: number;
    /** s:string */
    data_string1?: string;
    /** s:string */
    data_string2?: string;
    /** s:string */
    data_string3?: string;
    /** s:string */
    data_string4?: string;
}
