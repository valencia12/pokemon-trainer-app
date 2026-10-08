import type { SVGProps } from 'react'

const paths = {
  user: 'M20 21v-2a7 7 0 0 0-14 0v2M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  users: 'M16 21v-2a5 5 0 0 0-10 0v2M11 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 4a4 4 0 0 1 0 8M20 21v-2a5 5 0 0 0-3-4.6',
  ball: 'M3 12h5m8 0h5M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  home: 'm3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8',
  document: 'M14 3H6v18h12V7l-4-4ZM14 3v5h4M9 12h6M9 16h6',
  calendar: 'M5 5h14v16H5V5ZM8 3v4m8-4v4M5 10h14M8 14h2m4 0h2m-8 3h2',
  game: 'M7 7h10c2 0 3 2 4 8s-1 7-4 2l-1-1H8l-1 1c-3 5-5 4-4-2S5 7 7 7ZM6 11v4m-2-2h4m7-1h.1m3 3h.1',
  camera: 'M3 7h5l2-3h4l2 3h5v13H3V7ZM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  card: 'M3 5h18v14H3V5ZM7 10h3m-3 4h3m4-4h4m-4 4h4',
  edit: 'm4 16-1 5 5-1L21 7l-4-4L4 16ZM14 6l4 4',
  play: 'm8 4 12 8-12 8V4Z',
  plus: 'M12 5v14M5 12h14',
  save: 'M5 3h12l4 4v14H3V3h2ZM7 3v6h10V3M7 21v-8h10v8',
  reset: 'M4 10a8 8 0 1 1 1 8M4 4v6h6',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v6m0-10h.01',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
} as const

export type IconName = keyof typeof paths

export function Icon({ name, className = 'size-5', ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  if (name === 'ball') {
    return (
      <svg {...props} viewBox="0 0 24 24" className={className} stroke="#262626" strokeWidth="1.8" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9" fill="white" />
        <path d="M3 12a9 9 0 0 1 18 0Z" className="fill-pokeball-red" stroke="none" />
        <circle cx="12" cy="12" r="9" fill="none" />
        <path d="M3 12h18" />
        <circle cx="12" cy="12" r="3" fill="white" />
        <circle cx="12" cy="12" r="1" fill="#262626" stroke="none" />
      </svg>
    )
  }
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>
}
