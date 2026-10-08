export function AdventureLandscape({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="landscape-sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop stopColor="#9dd9ff" /><stop offset="1" stopColor="#eaf6ff" /></linearGradient>
      </defs>
      <path fill="url(#landscape-sky)" d="M0 0h1000v300H0z" />
      <g fill="#fff" opacity=".8"><path d="M490 57c-18-35-45-14-45 0-22-5-25 23-5 23h75c20 0 18-29-5-25-5-15-19-13-20 2ZM815 45c-17-26-39-10-38 4-20-4-25 21-5 22h71c15-3 13-25-4-23-7-17-19-15-24-3Z" /></g>
      <path fill="#98bad6" d="m410 255 168-181 51 55 84-109 171 198 116-64v146H410Z" />
      <path fill="#f2f7ff" d="m545 110 33-36 51 55 84-109 62 71-49-22-18 25-9-35-41 71-20-12-17 21-29-31-11 12Z" />
      <path fill="#7baaa4" d="m250 300 210-95 170 45 157-85 213 66v69Z" />
      <path fill="#9cc7ae" d="M170 300c145-120 259-90 390-36s250-70 440-31v67Z" />
      <path fill="#bce2ed" d="M613 241c-86 24-71 27 64 59h175c-206-42-208-32-159-59Z" />
      <g fill="#386d68"><path d="m936 300 1-127-30 61h18l-31 53h30v13ZM990 300V152l-31 66h17l-35 58h38v24ZM865 300V198l-24 46h15l-24 39h25v17Z" /></g>
      <circle cx="865" cy="74" r="22" fill="#ffcb05" opacity=".7" />
    </svg>
  )
}
