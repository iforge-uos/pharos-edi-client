/** GetCopyCostings3SoapOut */
export interface GetCopyCostings3SoapOut {
  /** s:string */
  job_cost_method?: {
    $value?: string;
    attributes: {
      "@xsi:type": string;
    };
  };
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
  copy_line_costs?: {
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
