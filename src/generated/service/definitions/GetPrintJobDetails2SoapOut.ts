/** GetPrintJobDetails2SoapOut */
export interface GetPrintJobDetails2SoapOut {
  /** s:int */
  pages?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:int */
  color_pages?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:int */
  sheets?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:double */
  cost?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:string */
  job_attributes?: {
    $value?: string;
    attributes: {
      "@xsi:type": string;
    };
  };
}
