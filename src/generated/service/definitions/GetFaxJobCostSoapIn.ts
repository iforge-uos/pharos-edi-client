
/** GetFaxJobCostSoapIn */
export interface GetFaxJobCostSoapIn {
    /** s:string */
    terminal_name?: string;
    /** s:string */
    user_id?: string;
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
}
