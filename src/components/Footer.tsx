import EventLogModal from './subcomponents/EventLogModal.tsx'

import SpeechSvg from '../assets/speech.svg'
import GithubSvg from '../assets/github.svg'

export default function Footer (): JSX.Element {
  return (
    <footer>
      <p>
        <b>Cave Shuffle Clock</b>
        {' '}
        &copy; endulum (μ)
        <br />
        <small><i>Simple alarm tool for use with Dragon Cave.</i></small>
      </p>
      <div className="footer-icons">
        <a href="https://forums.dragcave.net/topic/190954-cave-shuffle-timer-v10" title="Forum Thread" rel="noreferrer" target="_blank">
          <img
            src={SpeechSvg}
            alt="thread"
            className="footer-svg white-svg"
            aria-hidden
          />
        </a>
        <a href="https://github.com/endulum/dc-shuffle-clock" title="Repository" rel="noreferrer" target="_blank">
          <img
            src={GithubSvg}
            alt="repository"
            className="footer-svg white-svg"
            aria-hidden
          />
        </a>
        <EventLogModal />
      </div>
    </footer>
  )
}
