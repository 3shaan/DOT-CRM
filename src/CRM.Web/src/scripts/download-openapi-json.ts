import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
const OPENAPI_URL = "http://localhost:5234/openapi/v1.json";
const OUTPUT_FILE = resolve("src/api/openapi/openapi.json");
async function downloadOpenApi() {
  console.log(`Downloading OpenAPI spec...`);
  console.log(` ${OPENAPI_URL}`);
  const response = await fetch(OPENAPI_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to download OpenAPI spec: ${response.status} ${response.statusText}`,
    );
  }
  const json = await response.json();
  await mkdir(dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, JSON.stringify(json, null, 2) + "\n", "utf8");
  console.log(`OpenAPI spec saved to: ${OUTPUT_FILE}`);
}
downloadOpenApi().catch((error) => {
  console.error(error);
  process.exit(1);
});