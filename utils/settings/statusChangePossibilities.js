import { STATUS_COLORS } from "./statusColors.js";

export const STATUS_CHANGE_POSSIBILITIES = [
  [STATUS_COLORS.GREEN, STATUS_COLORS.RED],
  [STATUS_COLORS.GREEN, STATUS_COLORS.ORANGE],
  [STATUS_COLORS.GRAY, STATUS_COLORS.ORANGE],
  [STATUS_COLORS.GRAY, STATUS_COLORS.RED],
  [STATUS_COLORS.ORANGE, STATUS_COLORS.RED],
  [STATUS_COLORS.GREEN, STATUS_COLORS.GRAY],
];

export function isValidChange(from, to) {
  return STATUS_CHANGE_POSSIBILITIES.some(
    (possibilityArr) => possibilityArr[0] === from && possibilityArr[1] === to
  );
}
