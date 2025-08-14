/** ReservePcSoapOut */
export interface ReservePcSoapOut {
  /** s:string */
  PC_name?: {
    $value?: string;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:dateTime */
  actual_start?: {
    $value?: Date;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:string */
  PC_description?: {
    $value?: string;
    attributes: {
      "@xsi:type": string;
    };
  };
}
