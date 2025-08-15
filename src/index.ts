import { XMLParser } from "fast-xml-parser";
import { wrapSoapCall } from "./errors";
import { GetUserDetails2SoapOut } from "./generated/service";
import { ServiceClient, createClientAsync } from "./generated/service/client";
import { CostCenter, UnwrapValue, User } from "./types";
export {
  PharosError,
  CardNotFound,
  DuplicateUserName,
  PharosInternalError,
  wrapSoapCall,
} from "./errors";

export class PharosClient {
  private readonly client: ServiceClient;

  constructor(client: ServiceClient) {
    this.client = client;
  }

  static async create(url: string, siteCode: string): Promise<PharosClient> {
    const client = await createClientAsync(url);

    // client.on("request", (xml: string) => {
    //   console.log("Sending", xml);
    // });

    const [data] = await client.InitializeSession2Async(
      { site_code: siteCode },
      { postProcess: PharosClient.postProcessSoapXML },
    );

    client.addSoapHeader({ session_id: data.session_id });

    await client.ConfigureSessionAsync(
      {
        authenticator: "Papercut",
        biller: "Papercut",
        charging_model: "arc",
        gateway_terminal_id: "",
      },
      { postProcess: PharosClient.postProcessSoapXML },
    );

    return new PharosClient(client);
  }

  private static postProcessSoapXML(xml: string): string {
    return xml
      .replace(
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:tns="http://tempuri.org/"',
        'xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="http://tempuri.org/" xmlns:types="http://tempuri.org/encodedTypes" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"',
      )
      .replace('xmlns:tns="http://tempuri.org/"', 'xmlns:q1="http://tempuri.org/message/"')
      .replace(/<(\/)?tns:/g, "<$1q1:")
      .replace("<soap:Body>", '<soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">')
      .replace('<session_id xsi:type="xsd:string">', "<session_id>");
  }

  private xmlToObject<T = any>(xml: string): T {
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: false,
      parseTagValue: false,
      trimValues: true,
    });
    return parser.parse(xml);
  }

  private parseSql<T = any>(xml: string): T {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      parseAttributeValue: true,
      parseTagValue: true,
      trimValues: true,
    });

    const rows = parser.parse(xml).rows.row;

    const convertValue = (value: string, type: string): any => {
      switch (type) {
        case "Integer":
          return Number.parseInt(value, 10);
        case "Double":
          return Number.parseFloat(value);
        case "DateTime":
          return new Date(value);
        case "Boolean":
          return value.toLowerCase() === "true";
        case "Binary":
          return value;
        case "String":
        default:
          return value;
      }
    };

    const processedRows = rows !== undefined ? (Array.isArray(rows) ? rows : [rows]) : [];

    return processedRows.map((row: any) => {
      const processedRow: any = {};
      for (const [key, value] of Object.entries(row)) {
        if (typeof value === "object" && value !== null) {
          processedRow[key] = convertValue((value as any)["#text"], (value as any)["@_type"]);
        } else {
          processedRow[key] = value;
        }
      }
      return processedRow;
    }) as T;
  }

  private mapOutput<T extends { [s: string]: any }>(object: T): UnwrapValue<T> {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, (value as any)?.$value])) as any;
  }

  async runSql<T = any>(sql: string): Promise<T> {
    const [result] = await this.client.RunSQLAsync({ sql }, { postProcess: PharosClient.postProcessSoapXML });
    return this.parseSql(result.Result?.$value);
  }

  private escapeSqlString(value: string): string {
    return value.replace(/'/g, "''");
  }

  async getUser(username: string): Promise<User> {
    const escapedUsername = this.escapeSqlString(username);
    const [user] = await this.runSql(`SELECT * FROM users WHERE id = '${escapedUsername}'`);
    return user;
  }

  async insertUser(user: {
    username: string;
    last_name: string;
    first_name: string;
    ucard_number: string;
    email: string;
  }): Promise<UnwrapValue<GetUserDetails2SoapOut>> {
    return await wrapSoapCall(async () => {
      const [inserted] = await this.client.AddUser2Async(
        {
          active: 1,
          id: user.username,
          billing_option: "Advance",
          last_name: user.last_name,
          first_names: user.first_name,
          card_id: user.ucard_number.toString(), // should capture the issue number on the client for this
          is_visitor: 0,
          email: `${user.email}@sheffield.ac.uk`,
        },
        { postProcess: PharosClient.postProcessSoapXML },
      );
      return this.mapOutput(inserted);
    });
  }

  async getUserDetails(username: string): Promise<UnwrapValue<GetUserDetails2SoapOut>> {
    return await wrapSoapCall(async () => {
      const [user] = await this.client.GetUserDetails2Async(
        {
          user_id: username,
          lock_user: 0,
          transaction_type: 1,
        },
        { postProcess: PharosClient.postProcessSoapXML },
      );
      return this.mapOutput(user);
    });
  }

  async getCostCenters(username: string): Promise<CostCenter[]> {
    const [userCodes] = await this.client.FindUserCodes2Async(
      {
        user_id: this.escapeSqlString(username),
        category: "Engineering",
        pattern: "",
        prev_code: "", // I imagine this is for pagination but I cannot foresee we will ever need that
        n: 200,
      },
      { postProcess: PharosClient.postProcessSoapXML },
    );

    try {
      return this.xmlToObject(userCodes.Result.$value).charge_codes.charge_code;
    } catch {
      return [];
    }
  }

  async getItems() {
    return await this.client.ListCategoriesAsync({}, { postProcess: PharosClient.postProcessSoapXML });
  }
}
