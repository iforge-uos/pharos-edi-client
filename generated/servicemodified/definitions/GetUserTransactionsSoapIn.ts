
/** GetUserTransactionsSoapIn */
export interface GetUserTransactionsSoapIn {
    /** s:string */
    logon_id?: string;
    /** s:dateTime */
    start_time?: Date;
    /** s:dateTime */
    end_time?: Date;
    /** s:string */
    transaction_type?: string;
    /** s:int */
    row_count?: number;
}
