import AlertLogModal from './subcomponents/AlertLogModal.tsx'

import SpeechSvg from '../assets/speech.svg'
import GithubSvg from '../assets/github.svg'

export default function Footer (): JSX.Element {
  return (
    <footer>
      <p>
        <b>Cave Shuffle Clock</b>
        {' '}
        &copy; endulum
        <br />
        <small><i>Simple alarm tool for use with Dragon Cave.</i></small>
      </p>
      <div className="footer-icons">
        <a href="https://forums.dragcave.net/topic/190954-cave-shuffle-timer-v10" title="Forum Thread">
          <img
            src={SpeechSvg}
            alt="thread"
            className="footer-svg white-svg"
            aria-hidden
          />
        </a>
        <a href="https://github.com/endulum/dc-shuffle-clock" title="Repository">
          <img
            src={GithubSvg}
            alt="repository"
            className="footer-svg white-svg"
            aria-hidden
          />
        </a>
        <AlertLogModal />
      </div>
    </footer>
  )
}
