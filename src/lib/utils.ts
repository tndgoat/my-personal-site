export function renderSvgPolyline(coords: [number, number][]): string {
  if (!coords || coords.length === 0) return '';

  const xs = coords.map(([x]) => x);
  const ys = coords.map(([, y]) => y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const padding = 16;
  const width = 240 - padding * 2;
  const height = 240 - padding * 2;

  const scaleX = width / (maxX - minX || 1);
  const scaleY = height / (maxY - minY || 1);

  return coords
    .map(([x, y]) => {
      const scaledX = padding + (x - minX) * scaleX;
      // Invert Y-axis since SVG coordinate origin (0, 0) starts from the top-left corner
      const scaledY = 240 - (padding + (y - minY) * scaleY);
      return `${scaledX.toFixed(1)},${scaledY.toFixed(1)}`;
    })
    .join(' ');
}
