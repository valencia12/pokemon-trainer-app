import { Link, NavLink, Outlet } from 'react-router-dom'
import { routes, texts } from '../../lib/config'
import { ThemeToggle } from '../../components/ui/ThemeToggle'
import { Icon } from '../../components/ui/Icon'
import type { IconName } from '../../components/ui/Icon'
import { WorkflowHeader } from '../../components/layout/WorkflowHeader'
import { useTrainer } from '../../hooks/useTrainer'

export function AppLayout() {
  const { state, storageError } = useTrainer()
  const copy = texts.dashboard
  const links: { to: string; label: string; icon: IconName; available: boolean }[] = [
    { to: routes.home, label: texts.navigation.home, icon: 'home', available: true },
    { to: routes.setup, label: copy.trainersNav, icon: 'user', available: true },
    { to: routes.team, label: copy.pokemonNav, icon: 'ball', available: !!state.trainer },
    { to: routes.profile, label: copy.summaryNav, icon: 'document', available: !!state.trainer && state.team.length === 3 },
  ]
  return (
    <div className="min-h-screen bg-canvas">
      <aside className="relative z-20 bg-sidebar text-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-60 lg:flex-col">
        <Link to={routes.home} className="flex h-20 items-center gap-3 border-b border-white/10 px-6 text-xl font-extrabold"><span className="flex size-10 items-center justify-center"><Icon name="ball" className="size-7" /></span><span>{copy.brandName}<span className="text-accent">{copy.brandSuffix}</span></span></Link>
        <nav className="flex gap-1 overflow-x-auto px-3 py-3 lg:flex-col lg:gap-2 lg:py-5" aria-label={texts.app.navigation}>
          {links.map(item => item.available ? (
            <NavLink key={item.to} to={item.to} end className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors ${isActive ? 'bg-action text-white shadow-lg shadow-black/10' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}><Icon name={item.icon} className="size-5" />{item.label}</NavLink>
          ) : (
            <span key={item.to} aria-disabled="true" title={copy.lockedHint} className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3.5 text-sm text-white/35"><Icon name={item.icon} />{item.label}</span>
          ))}
        </nav>
        <div className="mt-auto hidden px-6 pb-8 lg:block"><div className="mb-4 h-0.5 w-7 bg-accent" /><p className="m-0 whitespace-pre-line text-xs leading-6 text-white/45">{copy.sidebarMotto}</p></div>
      </aside>
      <div className="lg:ml-60">
        <header className="flex h-20 items-center justify-between gap-4 border-b border-line/60 bg-surface px-5 sm:px-8">
          <span className="text-sm text-muted">{copy.headerLabel}</span>
          <div className="flex items-center gap-4"><ThemeToggle /><span className="h-7 w-px bg-line" /><Link to={routes.setup} className="flex items-center gap-3 text-sm font-semibold">{state.trainer ? <img src={state.trainer.photo} alt="" className="size-9 rounded-full object-cover" /> : <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand"><Icon name="user" /></span>}<span className="hidden max-w-40 truncate sm:block">{state.trainer?.name ?? copy.accountLabel}</span></Link></div>
        </header>
        <main className="mx-auto max-w-380 pb-8">
          <WorkflowHeader />
          <div className="px-4 sm:px-6">
            {storageError && <p role="alert" className="max-w-none rounded-xl border border-warning-border bg-warning-soft p-4 text-warning">{texts.common.storageError}</p>}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
