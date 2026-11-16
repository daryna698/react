import { useEffect, useState } from 'react'

export function useCountdown(totalSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [isRunning])

  function start() {
    setSecondsLeft((prev) => (prev <= 0 ? totalSeconds : prev))
    setIsRunning(true)
  }

  function pause() {
    setIsRunning(false)
  }

  function reset() {
    setIsRunning(false)
    setSecondsLeft(totalSeconds)
  }

  return { secondsLeft, isRunning, start, pause, reset }
}
