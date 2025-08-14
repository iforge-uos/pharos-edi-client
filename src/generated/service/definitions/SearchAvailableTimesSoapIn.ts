
/** SearchAvailableTimesSoapIn */
export interface SearchAvailableTimesSoapIn {
    /** s:string */
    pctype?: string;
    /** s:string */
    branch?: string;
    /** s:string */
    location?: string;
    /** s:dateTime */
    start?: Date;
    /** s:int */
    duration?: number;
}
