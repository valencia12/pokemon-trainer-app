import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { Trainer } from '../types/trainer'
import { getAge } from '../utils/validation'
import { Panel } from '../../../components/ui/Panel'
import { Icon } from '../../../components/ui/Icon'
import { routes, texts } from '../../../lib/config'

export function TrainerSummary({ trainer, title = texts.profile.title }: { trainer: Trainer; title?: string }) {
  const [today] = useState(() => new Date())
  const age = getAge(trainer.birthDate, today)
  const copy = texts.profile
  const fields = texts.setup.form
  const document = trainer.document.trim()
  return (
    <Panel title={title} description={copy.trainerDescription} icon="user">
      <img src={trainer.photo} alt={fields.photoAlt} className="mx-auto mb-4 size-32 rounded-full border-4 border-brand-soft object-cover" />
      <h2 className="mb-6 break-words text-center text-2xl font-bold">{trainer.name}</h2>
      <dl className="space-y-5 text-sm">
        <div><dt className="mb-1 flex items-center gap-2 text-xs text-muted"><Icon name="calendar" className="size-4" />{fields.age}</dt><dd className="font-semibold">{age !== null ? `${age} ${fields.years}` : copy.notSpecified}</dd></div>
        <div><dt className="mb-1 flex items-center gap-2 text-xs text-muted"><Icon name="calendar" className="size-4" />{fields.birthDate}</dt><dd className="font-semibold">{trainer.birthDate.split('-').reverse().join('/')}</dd></div>
        <div><dt className="mb-1 flex items-center gap-2 text-xs text-muted"><Icon name="game" className="size-4" />{fields.hobby}</dt><dd className="break-words font-semibold">{trainer.hobby.trim() || copy.notSpecified}</dd></div>
        {document && <div><dt className="mb-1 flex items-center gap-2 text-xs text-muted"><Icon name="card" className="size-4" />{age !== null && age >= 18 ? fields.dui : fields.minorDocument}</dt><dd className="break-words font-semibold">{document}</dd></div>}
      </dl>
      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
        <Link to={routes.setup} className="flex items-center justify-center gap-2 rounded-lg border border-line px-4 py-3 text-sm font-semibold hover:bg-brand-soft"><Icon name="edit" className="size-4" />{copy.editProfile}</Link>
        <Link to={routes.team} className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-ink hover:brightness-105"><Icon name="ball" className="size-4" />{copy.editTeam}</Link>
      </div>
    </Panel>
  )
}
