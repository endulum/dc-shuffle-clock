import { useEffect, useState } from 'react'

export default function useCustomAudio (): {
  customAudio: HTMLAudioElement | null
  initCustomAudio: () => void
} {
  const [customAudio, setCustomAudio] = useState<HTMLAudioElement | null>(null)

  function initCustomAudio (fileString?: string): void {
    let audioString: string = ''
    if (fileString === undefined) {
      const audioData = localStorage.getItem('customSoundData')
      if (audioData === null) return
      audioString = JSON.parse(audioData)
      if (typeof audioString !== 'string') return
    } else {
      audioString = fileString
    }
    const audio = new Audio(audioString)
    setCustomAudio(audio)
  }

  useEffect(() => { initCustomAudio() }, [])

  return { customAudio, initCustomAudio }
}
