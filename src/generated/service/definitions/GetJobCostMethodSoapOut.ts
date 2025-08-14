/** GetJobCostMethodSoapOut */
export interface GetJobCostMethodSoapOut {
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
