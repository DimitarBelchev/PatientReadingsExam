import fs from "fs";
export function generateFileName() {
  let fileName = "latest_health_readings_2.js";
  let fileNumber = 2;
  while (fs.existsSync(fileName)) {
    fileNumber++;
    fileName = `latest_health_readings_${fileNumber}.js`;
  }
  return fileName;
}

export function sortData(data) {
  data.sort(
    (a, b) => a.patientId - b.patientId || new Date(a.time) - new Date(b.time)
  );
}

export function writeDataToFile(data, fileName) {
  fs.writeFileSync(
    fileName,
    `export const latest_health_readings = ${JSON.stringify(data, null, 4)};`
  );
}
