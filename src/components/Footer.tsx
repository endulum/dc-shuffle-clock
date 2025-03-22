import { GitHub, QuestionAnswer } from '@mui/icons-material';

export function Footer() {
  return (
    <footer className="flex-col g-05 tac">
      <p>
        <b>Cave Shuffle Clock</b> &copy; endulum (μ)
        <br />
        <small>
          <i>Simple alarm tool for use with Dragon Cave. Just press play.</i>
        </small>
      </p>
      <div className="footer-icons flex-row g-05">
        <a
          href="https://forums.dragcave.net/topic/190954-cave-shuffle-timer-v10"
          title="Forum Thread"
          rel="noreferrer"
          target="_blank"
        >
          <QuestionAnswer aria-hidden />
        </a>
        <a
          href="https://github.com/endulum/dc-shuffle-clock"
          title="Repository"
          rel="noreferrer"
          target="_blank"
        >
          <GitHub aria-hidden />
        </a>
      </div>
      <p>
        Raise your catches at the{' '}
        <a href="https://chazza.me/dc/hatchery">Garden of Eden!</a>
      </p>
    </footer>
  );
}
