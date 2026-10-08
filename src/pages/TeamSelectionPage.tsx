import { PageIntro } from '../components/ui/PageIntro'
import { texts } from '../lib/config'

export default function TeamSelectionPage() {
  return <PageIntro title={texts.team.title} description={texts.team.description} />
}
