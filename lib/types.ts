export type ScheduleItem = {
  id: string
  date: string
  time: string
  title: string
  location?: string
  pace?: string
  distance_km?: number
  note?: string
  link?: string
}

export type Course = {
  slug: string
  title: string
  distance_km: number
  elevation_m?: number
  difficulty?: string
  meeting?: string
  center?: [number, number]
  zoom?: number
  gpx?: string
  image?: string
}

