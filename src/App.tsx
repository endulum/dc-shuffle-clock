import { useState, useEffect, type ChangeEvent } from 'react'

import Clock from './components/Clock.tsx'
import Toggle from './components/Toggle.tsx'

import {
  type Settings, settingsInitializer, type NotifSupport, notifSupportInitializer
} from './types.ts'

import PlaySvg from './assets/play.svg'
import GithubSvg from './assets/github.svg'
import SpeechSvg from './assets/speech.svg'

import 'hacktimer/HackTimer.min.js'

const sounds = new Array(5).fill(0).map((_dummy, index) => `SMS Alert ${index + 1}`)

const biomes = ['Coast', 'Desert', 'Forest', 'Jungle', 'Alpine', 'Volcano', 'Holiday'].map((name, index) => ({
  id: index + 1,
  name
}))

export default function App (): JSX.Element {
  const [settings, setSettings] = useState<Settings>(settingsInitializer)
  const [notifSupport, setNotifSupport] = useState<NotifSupport>(notifSupportInitializer)

  useEffect(() => {
    // console.log(settings)
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  function handleInputChange (e: ChangeEvent<HTMLInputElement>): void {
    switch (e.target.type) {
      case 'checkbox':
        setSettings({ ...settings, [e.target.id]: e.target.checked }); break
      default:
        setSettings({ ...settings, [e.target.id]: parseInt(e.target.value, 10) })
    }
  }

  function handleSelectChange (e: ChangeEvent<HTMLSelectElement>): void {
    setSettings({ ...settings, [e.target.id]: e.target.value })
  }

  function handleAlert (isHourly: boolean): void {
    if (settings.soundEnabled) playSound()
    if (settings.notifsEnabled && notifSupport === 'allowed') doNotify(isHourly)
  }

  function playSound (): void {
    const sound = new Audio(`./audio/${settings.soundSelect}.mp3`)
    sound.volume = settings.soundVolume / 100
    sound.play().catch((e) => { console.warn(e) })
  }

  function doNotify (isHourly: boolean): void {
    let notifText = ''
    if (isHourly) { notifText = `The hourly shuffle will occur in about ${settings.delay} seconds.` } else notifText = `The next cave shuffle will occur in ${settings.delay} seconds.`
    const notif = new Notification('Cave Shuffle Clock', { body: notifText })

    if (settings.biomeEnabled) {
      notif.addEventListener('click', (e) => {
        e.preventDefault()
        const url = `https://dragcave.net/locations/${settings.biomeSelect}`
        if (settings.biomeOpenType === 'tab') window.open(url, '_blank')
        if (settings.biomeOpenType === 'window') window.open(url, '', 'width=900,height=500')
      })
    }
  }

  return (
    <div className="app">
      <Clock onAlert={handleAlert} delay={settings.delay} />

      <div className="delay">
        <label className="delay-label" htmlFor="delay">
          Warn me
          {' '}
          <input
            type="number"
            value={settings.delay}
            min="1"
            max="60"
            id="delay"
            className="input-delay"
            onChange={handleInputChange}
            title="delay in seconds"
          />
          {' '}
          seconds before each shuffle.
        </label>
      </div>

      <main aria-label="clock settings">
        <div className="setting">
          <button type="button" onClick={playSound} className='setting-test-button' title='Test Sound'>
            <img src={PlaySvg} alt="play sound" />
          </button>
          <Toggle
            setting={{
              name: 'Sound',
              id: 'soundEnabled',
              bool: settings.soundEnabled
            }}
            onInputChange={handleInputChange}
          />
          <div className="setting-body align-center">
            <label className="setting-body-label" htmlFor="soundSelect">
              Select Sound
            </label>
            <select className="setting-body-input" id="soundSelect" onChange={handleSelectChange} defaultValue={settings.soundSelect}>
              {sounds.map((sound) => (
                <option key={sound} value={sound}>
                  {sound}
                </option>
              ))}
            </select>

            <label className="setting-body-label" htmlFor="soundVolume">
              Volume
            </label>
            <input className="setting-body-input" type="range" id="soundVolume" onChange={handleInputChange} defaultValue={settings.soundVolume} />
          </div>
        </div>

        <div className="setting">
          <button type="button" onClick={() => { doNotify(false) }} className='setting-test-button' disabled={notifSupport !== 'allowed'} title={notifSupport !== 'allowed' ? 'Enable notifications to test' : ''}>
            <img src={PlaySvg} alt="play notification" />
          </button>
          <Toggle
            setting={{
              name: 'Notifications',
              id: 'notifsEnabled',
              bool: settings.notifsEnabled,
              notifSupport
            }}
            onInputChange={handleInputChange}
            setNotifSupport={setNotifSupport}
          />
          <div
            className={`setting-body ${notifSupport !== 'allowed' && 'disabled'}`}
            title={notifSupport !== 'allowed' ? 'Enable notifications to adjust settings' : ''}
          >
            <input type="checkbox" id="biomeEnabled" onChange={handleInputChange} checked={settings.biomeEnabled} disabled={notifSupport !== 'allowed'} />

            <label htmlFor="biomeEnabled">
              Jump to biome when clicked
              {settings.biomeEnabled && <>
                <br />
                <small>
                  Take me to
                  {' '}
                  <select aria-label="biome select" id="biomeSelect" onChange={handleSelectChange} defaultValue={settings.biomeSelect} disabled={notifSupport !== 'allowed'}>
                    {biomes.map((biome) => (
                      <option key={biome.id} value={biome.id}>
                        {biome.name}
                      </option>
                    ))}
                  </select>
                  {' '}
                  in a
                  {' '}
                  <select aria-label='biome open type' id="biomeOpenType" onChange={handleSelectChange} defaultValue={settings.biomeOpenType} disabled={notifSupport !== 'allowed'}>
                    <option value="tab">new tab</option>
                    <option value="window">new window</option>
                  </select>
                </small>
              </>}
            </label>

            <input type="checkbox" id="notifAutoDismiss" onChange={handleInputChange} checked={settings.notifAutoDismiss} disabled={notifSupport !== 'allowed'} />
            <label htmlFor="notifAutoDismiss">
              Automatically dismiss notification when shuffle occurs
            </label>
          </div>
        </div>
      </main>

      <footer>
        <p>
          <b>Cave Shuffle Clock</b> &copy; endulum
          <br />
          <small><i>Simple alarm tool for use with Dragon Cave.</i></small>
        </p>
        <div className="footer-icons">
          <a href="https://forums.dragcave.net/topic/190954-cave-shuffle-timer-v10" title="Forum Thread">
            <img src={SpeechSvg} alt="thread" className='footer-icon' role='img' aria-hidden />
          </a>
          <a href="https://github.com/endulum/dc-shuffle-clock" title="Repository">
            <img src={GithubSvg} alt="repository" className='footer-icon' role='img' aria-hidden />
          </a>
        </div>
      </footer>
    </div>
  )
}
