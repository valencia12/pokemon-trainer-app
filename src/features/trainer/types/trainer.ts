export interface Trainer {
  photo: string
  name: string
  hobby: string
  birthDate: string
  document: string
}

export interface TrainerProfile {
  id: string
  trainer: Trainer
  team: number[]
}
