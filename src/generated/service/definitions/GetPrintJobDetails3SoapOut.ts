/** GetPrintJobDetails3SoapOut */
export interface GetPrintJobDetails3SoapOut {
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
