import {
  getLastStatusChange,
  getRecentReadings,
  sortReadingsByTime,
  createPatientOutput,
} from "./utils/helperFunctions/mainHelperFunctions.js";
import { latest_health_readings } from "./latest_health_readings_2.js";

function createOutputArray(latest_health_readings) {
  return latest_health_readings.reduce((acc, currObj) => {
    let patientId = currObj.patientId;
    let patientOutputIndex = acc.findIndex((i) => i.patientId === patientId);

    if (patientOutputIndex === -1) {
      acc.push(createPatientOutput(patientId, currObj));
      return acc;
    }

    let recentReadings = getRecentReadings(
      patientId,
      currObj,
      latest_health_readings
    );

    let lastStatusChange = getLastStatusChange(recentReadings);

    if (lastStatusChange) {
      acc[patientOutputIndex] = {
        patientId: patientId,
        healthChanged: true,
        lastStatusChange: {
          from: lastStatusChange.from,
          to: lastStatusChange.to,
          temperatureC: currObj.value.temperatureC,
          changedOn: currObj.time,
        },
      };
    } else {
      acc[patientOutputIndex] = createPatientOutput(patientId, currObj);
    }

    return acc;
  }, []);
}

let sortedReadings = sortReadingsByTime(latest_health_readings);
let output = createOutputArray(sortedReadings);
output.sort((a, b) => a.patientId - b.patientId);
console.log(output);
