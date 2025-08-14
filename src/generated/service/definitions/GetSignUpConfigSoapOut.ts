/** GetSignUpConfigSoapOut */
export interface GetSignUpConfigSoapOut {
  /** s:int */
  max_pending_scheduled?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:int */
  max_days_in_advance?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:int */
  scheduled_timeout?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:int */
  queued_timeout?: {
    $value?: number;
    attributes: {
      "@xsi:type": string;
    };
  };
}
