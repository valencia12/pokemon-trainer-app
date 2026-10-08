import { PageIntro } from '../components/ui/PageIntro'
import { texts } from '../lib/config'

export default function TrainerSetupPage() {
  return <PageIntro title={texts.setup.title} description={texts.setup.description} />
}
