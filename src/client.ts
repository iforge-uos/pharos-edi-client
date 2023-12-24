import { Client as SOAPClient, createClientAsync } from "soap";
import { ENDPOINTS } from "./endpoints";
import { z } from "zod";

export class Client {
  private client: SOAPClient | undefined;

  async run<T extends keyof typeof ENDPOINTS>(
    endpoint: T,
    ...args: any[]
  ): Promise<(typeof ENDPOINTS)[T]> {
    if (!this.client) {
      throw new Error("Client not connected");
    }
    let result = await this.client[endpoint](...args);

    const zodObject: z.ZodObject<(typeof ENDPOINTS)[T]> = ENDPOINTS[endpoint];
    if (Array.isArray(result)) {
      // TODO check if only key being result means that the return is actually an array with an alias for first element
      const keys = Object.keys(zodObject.shape);
      result = keys.reduce((obj, key, index) => {
        return { ...obj, [key]: result[index] };
      }, {});
    }
    return zodObject.parse(result);
  }

  async connect(
    wsdl: string,
    password: string,
    authenticator: string = "Default Bank",
    biller: string = "Default Bank",
    chargingModel: string = "None"
  ) {
    this.client = await createClientAsync(wsdl);

    await this.run(
      "ConfigureSession2",
      authenticator,
      biller,
      chargingModel.localeCompare("None", undefined, {
        sensitivity: "base",
      }) === 0
        ? ""
        : chargingModel,
      ""
    );
  }
}
