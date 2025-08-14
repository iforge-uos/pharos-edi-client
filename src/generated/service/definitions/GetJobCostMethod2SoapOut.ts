/** GetJobCostMethod2SoapOut */
export interface GetJobCostMethod2SoapOut {
  /** s:double */
  base_job_cost?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:double */
  default_per_page_cost?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:string */
  per_page_attribute_costs?: {
    $value?: string;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:string */
  per_job_attribute_costs?: {
    $value?: string;
    attributes: {
      "@xsi:type": string;
    };
  };
}
