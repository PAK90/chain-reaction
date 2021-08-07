export default function isPointInRange(
  sourceX,
  sourceY,
  targetX,
  targetY,
  distance
) {
  const distanceX = Math.abs(targetX - sourceX);
  const distanceY = Math.abs(targetY - sourceY);

  const pythag = (x, y) => Math.sqrt(x ** 2 + y ** 2);
  const realDist = pythag(distanceX, distanceY);
  // console.log(realDist );
  return realDist < distance;
}
