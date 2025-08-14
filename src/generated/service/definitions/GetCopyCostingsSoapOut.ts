/** GetCopyCostingsSoapOut */
export interface GetCopyCostingsSoapOut {
  /** s:string */
  job_cost_method?: {
    $value?: string;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:double */
  fixed_cost?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:string */
  costings?: {
    $value?: string;
    attributes: {
      "@xsi:type": string;
    };
  };
}
