import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { FormField } from '../../../components/ui/FormField'
import { texts } from '../../../lib/config'
import type { Trainer } from '../types/trainer'
import { formatDui, getAge, validateTrainer } from '../utils/validation'
import type { TrainerErrors } from '../utils/validation'
import styles from './TrainerForm.module.css'

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

  return (
    <form ref={formRef} onSubmit={submit} noValidate className={styles.form}>
      <p className={styles.required}>{copy.requiredHint}</p>
      {Object.values(errors).some(Boolean) && <p role="alert" className={styles.error}>{copy.errorSummary}</p>}
      <div className={styles.layout}>
        <section className={styles.photoSection} aria-labelledby="photo-heading">
          <h2 id="photo-heading">{copy.photo}</h2>
          <div className={styles.preview}>
            {trainer.photo ? <img src={trainer.photo} alt={copy.photoAlt} /> : <span>{copy.photoPlaceholder}</span>}
          </div>
          <FormField id="trainer-photo" label={copy.uploadPhoto} type="file" accept="image/jpeg,image/png,image/webp" onChange={changePhoto} hint={copy.photoHint} error={errors.photo} required={!trainer.photo} />
          <span role="status">{readingPhoto ? copy.readingPhoto : ''}</span>
        </section>
        <div className={styles.fields}>
          <FormField id="trainer-name" label={copy.name} value={trainer.name} onChange={event => update('name', event.target.value)} autoComplete="name" maxLength={100} required error={errors.name} />
          <FormField id="trainer-hobby" label={copy.hobby} value={trainer.hobby} onChange={event => update('hobby', event.target.value)} maxLength={150} hint={copy.optional} />
          <FormField id="trainer-birthDate" label={copy.birthDate} type="date" value={trainer.birthDate} max={maxDate} onChange={event => update('birthDate', event.target.value)} autoComplete="bday" required error={errors.birthDate} />
          <p className={styles.age} role="status">{age !== null ? `${copy.age}: ${age} ${copy.years}` : copy.ageHint}</p>
          {age !== null && <FormField id="trainer-document" label={isAdult ? copy.dui : copy.minorDocument} value={trainer.document} onChange={event => update('document', isAdult ? formatDui(event.target.value) : event.target.value)} inputMode={isAdult ? 'numeric' : 'text'} maxLength={isAdult ? 10 : 50} placeholder={isAdult ? '00000000-0' : undefined} required={isAdult} hint={isAdult ? copy.duiHint : copy.optional} error={errors.document} />}
        </div>
      </div>
      <div className={styles.actions}>
        <button type="submit" disabled={readingPhoto}>{copy.continue}</button>
      </div>
    </form>
  )
}
