export default function getMidpoint(x, y, circleSize, circlePadding) {
  const midPointX =
    x * (circleSize + circlePadding * 2) + (circleSize + circlePadding * 2) / 2;
  const midPointY =
    y * (circleSize + circlePadding * 2) + (circleSize + circlePadding * 2) / 2;
  return { x: midPointX, y: midPointY };
}
