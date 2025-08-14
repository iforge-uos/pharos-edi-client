import fs from "node:fs";
import path from "node:path";
import { parseAndGenerate } from "wsdl-tsclient";

console.log("Please ensure you are on the VPN");
const url = `${process.env.PHAROS_URL}?wsdl`;

console.log("Fetching WSDL");
const wsdl = await fetch(url);

fs.writeFileSync("./service.wsdl", await wsdl.text());

console.log("\nGenerating client from WSDL...");
await parseAndGenerate("./service.wsdl", "./src/generated");

console.log("\nUpdating service definitions to use correct structure...");

// Function to convert a property type to the new structure
function convertPropertyType(type: string): string {
  let tsType: string;

  switch (type) {
    case "s:string":
      tsType = "string";
      break;
    case "s:double":
      tsType = "number";
      break;
    case "s:int":
      tsType = "number";
      break;
    case "s:boolean":
      tsType = "boolean";
      break;
    case "s:dateTime":
      tsType = "Date";
      break;
    default:
      tsType = "string"; // fallback
  }

  return `{
    $value?: ${tsType};
    attributes: {
      "@xsi:type": string;
    };
  }`;
}

// Function to parse and update a SoapOut file
function updateSoapOutFile(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8");

  // Extract interface name from content
  const interfaceMatch = content.match(/export interface (\w+)/);
  if (!interfaceMatch) {
    console.log(`Could not find interface in ${filePath}`);
    return;
  }

  const interfaceName = interfaceMatch[1];

  // Extract properties with their types and comments
  const propertyRegex = /\/\*\* (.*?) \*\/\s*(\w+)\?\s*:\s*(\w+);/g;
  const properties: Array<{ comment: string; name: string; type: string }> = [];

  let match;
  while ((match = propertyRegex.exec(content)) !== null) {
    properties.push({
      comment: match[1],
      name: match[2],
      type: match[3],
    });
  }

  // If no properties found, keep the empty interface
  if (properties.length === 0) {
    return;
  }

  // Generate new content
  let newContent = `/** ${interfaceName} */\n`;
  newContent += `export interface ${interfaceName} {\n`;

  for (const prop of properties) {
    newContent += `  /** ${prop.comment} */\n`;
    newContent += `  ${prop.name}?: ${convertPropertyType(prop.comment)};\n`;
  }

  newContent += "}\n";

  // Write the updated content
  fs.writeFileSync(filePath, newContent);
  console.log(`Updated ${path.basename(filePath)}`);
}

// Update all SoapOut files
const definitionsDir = "./src/generated/service/definitions";
const files = fs
  .readdirSync(definitionsDir)
  .filter((file) => file.endsWith("SoapOut.ts"))
  .map((file) => path.join(definitionsDir, file));

console.log(`Found ${files.length} SoapOut files to update`);

for (const file of files) {
  try {
    updateSoapOutFile(file);
  } catch (error) {
    console.error(`Error updating ${file}:`, error);
  }
}

console.log("Service definition updates complete!");
