/** QueueForPcSoapOut */
export interface QueueForPcSoapOut {
  /** s:int */
  state?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:string */
  pc?: {
    $value?: string;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:dateTime */
  expected_start?: {
    $value?: Date;
    attributes: {
      "@xsi:type": string;
    };
  };
}
