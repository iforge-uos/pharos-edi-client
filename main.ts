import { PharosClient } from "./pharos-client";

const url = `${process.env.PHAROS_URL}?wsdl`;
const client = await PharosClient.create(url, process.env.PHAROS_AUTH!);

const USER_ID = 450232;
const USERNAME = "eik21jh";
const CARD = 1786768;

console.log(await client.getUser(USERNAME));

// console.log(
//   await runSql(
//     client,
//     `SELECT table_name, column_name
//           FROM information_schema.columns
//           WHERE column_name LIKE '%balance%'`,
// OR column_name LIKE '%amount%'
// OR column_name LIKE '%credit%'
// OR column_name LIKE '%debit%'`,
//   ),
// );

// console.log(users);

// const [result] = await client.RunSQLAsync({ sql: "SELECT * FROM tp_emos_plus;" }, { postProcess: postProcessSoapXML });
