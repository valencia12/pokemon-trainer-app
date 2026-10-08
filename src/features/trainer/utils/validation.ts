import type { Trainer } from '../types/trainer'

export type TrainerErrors = Partial<Record<keyof Trainer, string>>

export function getAge(birthDate: string, today = new Date()): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) return null
  const [year, month, day] = birthDate.split('-').map(Number)
  const birth = new Date(0)
  birth.setFullYear(year, month - 1, day)
  birth.setHours(0, 0, 0, 0)
  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  if (birth.getFullYear() !== year || birth.getMonth() !== month - 1 || birth.getDate() !== day || birth > current) return null
  const birthdayPending = current.getMonth() < month - 1 || (current.getMonth() === month - 1 && current.getDate() < day)
  return current.getFullYear() - year - Number(birthdayPending)
}

export function formatDui(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 9)
  return digits.length > 8 ? `${digits.slice(0, 8)}-${digits.slice(8)}` : digits
}

export function validateTrainer(trainer: Trainer, messages: {
  required: string
  invalidDate: string
  invalidDui: string
}): TrainerErrors {
  const errors: TrainerErrors = {}
  if (!trainer.photo) errors.photo = messages.required
  if (!trainer.name.trim()) errors.name = messages.required
  const age = getAge(trainer.birthDate)
  if (!trainer.birthDate) errors.birthDate = messages.required
  else if (age === null) errors.birthDate = messages.invalidDate
  if (age !== null && age >= 18) {
    if (!trainer.document.trim()) errors.document = messages.required
    else if (!/^\d{8}-\d$/.test(trainer.document)) errors.document = messages.invalidDui
  }
  return errors
}

export function isTrainer(value: unknown): value is Trainer {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  if (!['photo', 'name', 'hobby', 'birthDate', 'document'].every(key => typeof candidate[key] === 'string')) return false
  const trainer = candidate as unknown as Trainer
  return /^data:image\/(jpeg|png|webp);base64,/.test(trainer.photo)
    && Object.keys(validateTrainer(trainer, { required: 'required', invalidDate: 'date', invalidDui: 'dui' })).length === 0
}
