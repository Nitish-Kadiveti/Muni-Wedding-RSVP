import { useEffect, useState } from 'react'

export interface CountdownValue {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

export function useCountdown(targetIso: string): CountdownValue {
  const target = new Date(targetIso).getTime()
  const [value, setValue] = useState<CountdownValue>(() => compute(target))

  useEffect(() => {
    const id = setInterval(() => setValue(compute(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return value
}

function compute(target: number): CountdownValue {
  const diff = target - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, isPast: false }
}
