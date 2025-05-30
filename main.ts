import { createClientAsync } from "./generated/service/client";

const url = process.env.PHAROS_URL + "?wsdl";

function postProcessSoapXML(xml: string): string {
  // the server expects 'q1' prefix for 'http://tempuri.org/message/'
  // 'tns' and 'http://tempuri.org/'
  // no clue why
  return xml
    .replace('xmlns:tns="http://tempuri.org/"', 'xmlns:q1="http://tempuri.org/message/"')
    .replace(/<(\/)?tns:/g, "<$1q1:")
    .replace('<session_id xsi:type="xsd:string">', "<session_id>");
}

const client = await createClientAsync(url);

client.on("request", (xml) => {
  console.log("Sending", xml);
});

const [data] = await client.InitializeSessionAsync(
  { site_code: process.env.PHAROS_AUTH },
  { postProcess: postProcessSoapXML },
);

client.addSoapHeader({ session_id: data.session_id });

console.log(
  await client.LoginUserAsync(
    { user_id: process.env.PHAROS_USERNAME, password: process.env.PHAROS_PASSWORD },
    { postProcess: postProcessSoapXML },
  ),
);

const [users] = await client.RunSQLAsync(
  {
    sql: 'SELECT * FROM users WHERE id = "eik21jh"',
  },
  { postProcess: postProcessSoapXML },
);
// const [users] = await client.GetUserDetailsAsync({
//     user_id: "450232"
// }, { postProcess: postProcessSoapXML});

console.log(users);
