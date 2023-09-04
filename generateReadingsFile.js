import { STATUS_COLORS } from "./utils/settings/statusColors.js";
import {
  writeDataToFile,
  sortData,
  generateFileName,
} from "./utils/helperFunctions/generatorHelperFunctions.js";

function generateData(clientIds, readings, timespread) {
  return clientIds.reduce((data, clientId) => {
    const startTime = new Date();
    startTime.setSeconds(startTime.getSeconds() - timespread);
    for (let i = 0; i < readings; i++) {
      const time = new Date(startTime);
      time.setSeconds(
        time.getSeconds() + Math.floor(Math.random() * timespread)
      );
      const status =
        STATUS_COLORS[
          Object.keys(STATUS_COLORS)[
            Math.floor(Math.random() * Object.keys(STATUS_COLORS).length)
          ]
        ];
      const temperatureC =
        status === STATUS_COLORS.GRAY
          ? null
          : parseFloat((Math.random() * (40 - 35) + 35).toFixed(1));
      data.push({
        patientId: clientId,
        time: time.toISOString(),
        type: "TEMPERATURE_SENSOR_ONSKIN",
        value: {
          temperatureC,
          status,
        },
      });
    }
    return data;
  }, []);
}

function generateReadingsFile(clientIds, readings, timespread) {
  let fileName = generateFileName();
  let data = generateData(clientIds, readings, timespread);
  sortData(data);
  writeDataToFile(data, fileName);
}

generateReadingsFile([1, 2, 3, 4, 5], 3, 86400);
