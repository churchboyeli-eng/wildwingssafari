const shapeRadius = {
  rect: 0,
  rounded: 8,
  circle: '50%',
  pill: 9999,
};

export default function ImagePlaceholder({ shape = 'rect', style }) {
  return (
    <div
      className="image-placeholder"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        borderRadius: shapeRadius[shape] ?? 0,
        overflow: 'hidden',
        ...style,
      }}
    />
  );
}
