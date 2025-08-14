/** ReservePc2SoapOut */
export interface ReservePc2SoapOut {
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
