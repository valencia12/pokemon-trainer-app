import { PageIntro } from '../components/ui/PageIntro'
import { texts } from '../lib/config'

export default function TrainerProfilePage() {
  return <PageIntro title={texts.profile.title} description={texts.profile.description} />
}
