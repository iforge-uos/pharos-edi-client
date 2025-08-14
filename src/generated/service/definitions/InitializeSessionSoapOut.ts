/** InitializeSessionSoapOut */
export interface InitializeSessionSoapOut {
  /** s:string */
  session_id?: {
    $value?: string;
    attributes: {
      "@xsi:type": string;
    };
  };
  /** s:dateTime */
  UTCTime?: {
    $value?: Date;
    attributes: {
      "@xsi:type": string;
    };
  };
}
