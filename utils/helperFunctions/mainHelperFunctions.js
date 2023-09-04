import { HEALTH_READING_INTERVAL } from "../settings/healthReadingInterval.js";
import { isValidChange } from "../settings/statusChangePossibilities.js";

export function createPatientOutput(patientId, currObj) {
  return {
    patientId: patientId,
    healthChanged: false,
    lastStatus: {
      status: currObj.value.status,
      temperatureC: currObj.value.temperatureC,
      time: currObj.time,
    },
  };
}

export function sortReadingsByTime(readings) {
  return readings.sort((a, b) => new Date(a.time) - new Date(b.time));
}

export function getRecentReadings(patientId, currObj, readings) {
  return readings.filter(
    (reading) =>
      reading.patientId === patientId &&
      new Date(currObj.time) - new Date(reading.time) <= HEALTH_READING_INTERVAL
  );
}

export function getLastStatusChange(recentReadings) {
  return recentReadings
    .slice(1)
    .map((currReading, i) => ({
      from: recentReadings[i].value.status,
      to: currReading.value.status,
      isValid: isValidChange(
        recentReadings[i].value.status,
        currReading.value.status
      ),
    }))
    .filter((change) => change.isValid)
    .pop();
}
