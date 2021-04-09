function getValueWithinBoundaries(value, minValue, maxValue) {
  const ceiledValue = Math.min(value, maxValue);
  return Math.max(ceiledValue, minValue);
}

export { getValueWithinBoundaries };
