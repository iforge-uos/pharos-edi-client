
/** RaiseAlertSoapIn */
export interface RaiseAlertSoapIn {
    /** s:string */
    server?: string;
    /** s:string */
    service_type?: string;
    /** s:string */
    severity?: string;
    /** s:string */
    operation?: string;
    /** s:string */
    client?: string;
    /** s:string */
    user?: string;
    /** s:string */
    item?: string;
    /** s:int */
    error_code?: number;
    /** s:string */
    message?: string;
}
