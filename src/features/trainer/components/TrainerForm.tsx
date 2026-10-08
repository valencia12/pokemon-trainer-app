import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Icon } from '../../../components/ui/Icon'
import { DatePicker } from '../../../components/ui/DatePicker'
import { FormField } from '../../../components/ui/FormField'
import { texts } from '../../../lib/config'
import type { Trainer } from '../types/trainer'
import { formatDui, getAge, validateTrainer } from '../utils/validation'
import type { TrainerErrors } from '../utils/validation'

const emptyTrainer: Trainer = { photo: '', name: '', hobby: '', birthDate: '', document: '' }

interface TrainerFormProps {
  initialTrainer: Trainer | null
  onSave: (trainer: Trainer) => void
}

function readPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Unable to read photo'))
    reader.onload = async () => {
      try {
        if (typeof reader.result !== 'string') throw new Error('Invalid photo')
        const image = new Image()
        image.src = reader.result
        await image.decode()
        resolve(reader.result)
      } catch (error) {
        reject(error)
      }
    }
    reader.readAsDataURL(file)
  })
}

export function TrainerForm({ initialTrainer, onSave }: TrainerFormProps) {
  const [trainer, setTrainer] = useState<Trainer>(initialTrainer ?? emptyTrainer)
  const [errors, setErrors] = useState<TrainerErrors>({})
  const [readingPhoto, setReadingPhoto] = useState(false)
  const [today] = useState(() => new Date())
  const photoRequest = useRef(0)
  const formRef = useRef<HTMLFormElement>(null)
  const copy = texts.setup.form
  const dashboard = texts.dashboard
  const age = getAge(trainer.birthDate, today)
  const isAdult = age !== null && age >= 18
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  useEffect(() => () => { photoRequest.current += 1 }, [])

  function update(field: keyof Trainer, value: string) {
    setTrainer(previous => {
      const next = { ...previous, [field]: value }
      if (field === 'birthDate') {
        const previousAge = getAge(previous.birthDate)
        const nextAge = getAge(value)
        // Clear identification when switching between document types.
        if (previousAge !== null && nextAge !== null && (previousAge >= 18) !== (nextAge >= 18)) next.document = ''
      }
      return next
    })
    setErrors(previous => ({ ...previous, [field]: undefined, ...(field === 'birthDate' ? { document: undefined } : {}) }))
  }

  async function changePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    const request = ++photoRequest.current
    setReadingPhoto(false)
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrors(previous => ({ ...previous, photo: copy.errors.photoType }))
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors(previous => ({ ...previous, photo: copy.errors.photoSize }))
      return
    }
    setReadingPhoto(true)
    try {
      const photo = await readPhoto(file)
      if (request === photoRequest.current) update('photo', photo)
    } catch {
      if (request === photoRequest.current) setErrors(previous => ({ ...previous, photo: copy.errors.photoRead }))
    } finally {
      if (request === photoRequest.current) setReadingPhoto(false)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (readingPhoto) return
    const normalized = { ...trainer, name: trainer.name.trim(), hobby: trainer.hobby.trim(), document: trainer.document.trim() }
    const nextErrors = validateTrainer(normalized, copy.errors)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const field = Object.keys(nextErrors)[0]
      formRef.current?.querySelector<HTMLInputElement>(`#trainer-${field}`)?.focus()
      return
    }
    onSave(normalized)
  }

  function resetForm() {
    photoRequest.current += 1
    setReadingPhoto(false)
    setTrainer({ ...emptyTrainer })
    setErrors({})
    formRef.current?.reset()
    formRef.current?.querySelector<HTMLInputElement>('#trainer-name')?.focus()
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate>
      <p className="mt-0 mb-5 text-xs">{copy.requiredHint}</p>
      {Object.values(errors).some(Boolean) && <p role="alert" className="text-sm text-danger">{copy.errorSummary}</p>}
      <div className="grid grid-cols-1 items-start gap-x-5 gap-y-6 min-[700px]:grid-cols-2">
        <div className="min-w-0">
          <span className="text-sm font-semibold">{copy.photo}<span className="text-danger" aria-hidden="true"> *</span></span>
          <div className="mt-3 flex items-center gap-3">
            <div className="relative shrink-0">
              <label htmlFor="trainer-photo" className="relative flex size-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-input-border/50 bg-brand-soft/30 text-muted focus-within:outline-3 focus-within:outline-offset-4 focus-within:outline-brand">
                {trainer.photo ? <img className="size-full rounded-full object-cover" src={trainer.photo} alt={copy.photoAlt} /> : <Icon name="user" className="size-10 text-muted/50" />}
                <input className="absolute inset-0 h-full w-full cursor-pointer opacity-0" id="trainer-photo" type="file" accept="image/jpeg,image/png,image/webp" aria-label={copy.uploadPhoto} aria-invalid={Boolean(errors.photo)} aria-describedby={errors.photo ? 'photo-hint photo-error' : 'photo-hint'} onChange={changePhoto} required={!trainer.photo} />
                <span className="pointer-events-none absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border-2 border-surface bg-brand-soft text-brand"><Icon name="camera" className="size-4" /></span>
              </label>
            </div>
            <div><label htmlFor="trainer-photo" className="cursor-pointer text-xs font-semibold text-brand">{copy.uploadPhoto}</label><p id="photo-hint" className="mt-1 mb-0 text-xs">{copy.photoHint}</p></div>
          </div>
          {errors.photo && <span id="photo-error" className="mt-2 block text-xs text-danger">{errors.photo}</span>}
          <span className="text-xs text-muted" role="status">{readingPhoto ? copy.readingPhoto : ''}</span>
        </div>
        <FormField id="trainer-name" icon="user" label={copy.name} placeholder={dashboard.namePlaceholder} value={trainer.name} onChange={event => update('name', event.target.value)} autoComplete="name" maxLength={100} required error={errors.name} />
        <FormField id="trainer-hobby" icon="game" label={copy.hobby} placeholder={dashboard.hobbyPlaceholder} value={trainer.hobby} onChange={event => update('hobby', event.target.value)} maxLength={150} hint={copy.optional} />
        <div className="flex min-w-0 flex-col gap-2">
          <DatePicker id="trainer-birthDate" label={copy.birthDate} value={trainer.birthDate} max={maxDate} onChange={value => update('birthDate', value)} required error={errors.birthDate} />
          <p className="m-0 text-xs" role="status">{age !== null ? `${copy.age}: ${age} ${copy.years}` : copy.ageHint}</p>
        </div>
        <section className="rounded-xl bg-brand-soft/60 p-4 min-[700px]:col-span-2" aria-labelledby="identification-heading">
          <div className="mb-4 flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-action text-white"><Icon name="card" /></span><div><h3 id="identification-heading" className="text-sm font-bold text-brand">{dashboard.documentTitle}</h3><p className="mt-1 mb-0 text-xs text-ink">{dashboard.adultHint}<br />{dashboard.minorHint}</p></div></div>
          <div className="grid items-center gap-4 min-[700px]:grid-cols-[1.2fr_1fr]">
            <FormField id="trainer-document" icon="card" label={isAdult ? copy.dui : age === null ? dashboard.documentTitle : copy.minorDocument} value={trainer.document} onChange={event => update('document', isAdult ? formatDui(event.target.value) : event.target.value)} disabled={age === null} inputMode={isAdult ? 'numeric' : 'text'} maxLength={isAdult ? 10 : 50} placeholder={isAdult ? copy.duiPlaceholder : undefined} required={isAdult} hint={isAdult ? copy.duiHint : copy.optional} error={errors.document} />
            <p className="m-0 flex items-start gap-2 rounded-lg bg-surface/50 p-3 text-xs"><Icon name="info" className="size-4 shrink-0 text-brand" />{dashboard.documentHint}</p>
          </div>
        </section>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-action px-6 py-3 text-sm font-semibold text-white hover:brightness-110 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-focus disabled:cursor-wait disabled:opacity-60 sm:w-auto" type="submit" disabled={readingPhoto}><Icon name="save" />{dashboard.save}</button>
        <button className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-line bg-brand-soft/40 px-6 py-3 text-sm font-semibold hover:bg-brand-soft focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-focus sm:w-auto" type="button" onClick={resetForm}><Icon name="reset" />{dashboard.clear}</button>
      </div>
    </form>
  )
}
