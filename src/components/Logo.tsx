/**
 * Modern abstract logo mark for mjopberekenen.nl
 * Three ascending bars — represents calculation, growth, and data insight.
 * Clean geometric fintech aesthetic.
 */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#2E5E4E" />
      <rect x="7" y="17" width="4.5" height="8" rx="1.5" fill="white" fillOpacity="0.45" />
      <rect x="13.75" y="12" width="4.5" height="13" rx="1.5" fill="white" fillOpacity="0.7" />
      <rect x="20.5" y="7" width="4.5" height="18" rx="1.5" fill="white" />
    </svg>
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={32} />
      <span className="text-lg font-semibold tracking-tight text-[#1a1a2e]">
        mjopberekenen
        <span className="text-[#2E5E4E]">.nl</span>
      </span>
    </a>
  );
}
