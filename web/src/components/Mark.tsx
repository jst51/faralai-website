// The Faralai mark: a lime disc with three violet lines of falling length.
export function Mark({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="#C8F02C" />
      <g stroke="#8E83E8" strokeWidth="7.5" strokeLinecap="round">
        <line x1="27" y1="36" x2="73" y2="36" />
        <line x1="27" y1="50" x2="69" y2="50" />
        <line x1="27" y1="64" x2="51" y2="64" />
      </g>
    </svg>
  );
}
