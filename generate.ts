import axios from "axios";
import { parseAndGenerate } from "wsdl-tsclient";
import fs from "fs";

console.log("Please ensure you are on the VPN");
const URL = "http://lords.shef.ac.uk/pharosedi/ediservice.asmx?wsdl";

console.log("Fetching WSDL");
const response = await axios.get(URL);

fs.writeFileSync("./service.wsdl", response.data);

console.log("\nGenerating client from WSDL...");
parseAndGenerate("./service.wsdl", "./generated");
