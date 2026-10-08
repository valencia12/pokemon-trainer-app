import type { SVGProps } from 'react'
import {
  ArrowRight, CalendarDays, Camera, FileText, Gamepad2, House, IdCard,
  Info, Moon, Pencil, Play, Plus, RotateCcw, Save, UserRound, UsersRound, X,
} from 'lucide-react'

const icons = {
  user: UserRound,
  users: UsersRound,
  home: House,
  document: FileText,
  calendar: CalendarDays,
  game: Gamepad2,
  camera: Camera,
  card: IdCard,
  edit: Pencil,
  play: Play,
  plus: Plus,
  save: Save,
  reset: RotateCcw,
  info: Info,
  arrow: ArrowRight,
  moon: Moon,
  close: X,
} as const

export type IconName = keyof typeof icons | 'ball'

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
  const LucideIcon = icons[name]
  return <LucideIcon {...props} className={className} strokeWidth={1.75} aria-hidden="true" focusable="false" />
}
