/** GetCopyJobCost2SoapOut */
export interface GetCopyJobCost2SoapOut {
  /** s:double */
  base_job_cost?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:double */
  job_attribute_costs?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:double */
  page_attribute_costs?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
}
