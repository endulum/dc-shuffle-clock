import { useState } from 'react';
import Modal from 'react-modal';
import { Close, Quiz } from '@mui/icons-material';

import { FAQDisclosure } from './FAQDisclosure';

export function FAQModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex-row g-05"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Quiz aria-hidden />
        <small>Need help?</small>
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        closeTimeoutMS={250}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{
          overlay: {
            backgroundColor: 'rgba(0 ,0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem',
            overflow: 'auto',
          },
          content: {
            position: 'relative',
            width: '100%',
            maxWidth: '750px',
            inset: '0px',
            height: 'min-content',
            boxShadow: 'var(--extrusion)',
          },
        }}
      >
        <div className="flex-row jcspb aic">
          <h1>Help and FAQ</h1>
          <button
            type="button"
            className="flex-col jcc"
            onClick={() => {
              setIsOpen(false);
            }}
            style={{ aspectRatio: '1' }}
            title="Close this dialog"
          >
            <Close />
          </button>
        </div>
        <h2>What is this?</h2>
        <p>
          The Shuffle Clock is intended for use with{' '}
          <a href="https://dragcave.net" target="__blank">
            Dragon Cave
          </a>
          . In Dragon Cave, eggs in each of the six biomes rotate out every five
          minutes on the dot. Being attentive of such rotations, or "shuffles",
          is key to effective cave hunting.
        </p>
        <p>
          The purpose of this tool is to keep the forgetful or multitasking user
          aware of such shuffles by way of a distinct auditory and visual cue,
          and to make looking for that one egg you want just a little less of a
          hassle.
        </p>
        <h2>How do I use this?</h2>
        <p>
          Just press the play button, and the Clock will work in the background.
          Be sure to turn on <b>Sound</b> or <b>Notifications</b> at your
          preference.
        </p>
        <h2>Troubleshooting</h2>
        <b>Mobile users:</b> Mobile browsers tend to sleep inactive pages when
        not in focus, resulting in dropped alerts. To minimize this, ensure that
        you:
        <ul>
          <li>Keep your device on.</li>
          <li>
            Keep your browser focused on this page, or have it regain focus
            every shuffle. If you have notifications enabled for the Clock,
            tapping the notification can quickly restore focus to the Clock's
            page for you.
          </li>
          <li>
            Depending on your device settings, prevent your device from enacting
            battery saving optimization or background activity suppression on
            the browser app you're using.
          </li>
        </ul>
        <h3>Other issues</h3>
        <dl className="faq">
          {[
            {
              title: 'The Clock time is inaccurate.',
              content: (
                <p>
                  The tool uses your local time. Be sure that your device clock
                  is accurately synced. Check out{' '}
                  <a href="https://time.is" target="__blank">
                    time.is
                  </a>{' '}
                  to compare your device clock to objective time.
                </p>
              ),
            },
            {
              title:
                'Jump to biome in notification is enabled, but it takes me nowhere.',
              content: (
                <p>
                  The notification opens your biome of choice in a new tab or
                  window, which may be interpreted as a pop-up and promptly
                  blocked by the browser. Allow pop-ups for this tool if this is
                  the case.
                </p>
              ),
            },
            {
              title:
                'Notifications are automatically denied upon requesting access.',
              content: (
                <p>
                  Be sure you are not on Incognito or Private Browsing.
                  Notification capability is automatically disabled for these
                  browsing modes.
                </p>
              ),
            },
            {
              title: 'I accidentally denied notification access.',
              content: (
                <p>
                  Reset site permissions for this tool (look up specific
                  instructions for your browser on how to do this), and you
                  should be able to answer the request prompt again.
                </p>
              ),
            },
            {
              title: "Notifications don't work.",
              content: (
                <p>
                  See{' '}
                  <a href="https://frizbit.com/blog/troubleshooting-web-push-notifications-why-im-i-not-getting-notifications/">
                    here
                  </a>{' '}
                  for several common issues pertaining to browser notifications
                  to check and fix.
                </p>
              ),
            },
          ].map((item, index) => (
            <FAQDisclosure
              key={item.title}
              id={`faq-${index}`}
              title={item.title}
            >
              {item.content}
            </FAQDisclosure>
          ))}
        </dl>
        <p>
          Feel free to{' '}
          <a href="https://forums.dragcave.net/messenger/compose/?to=237359">
            let me know
          </a>{' '}
          or{' '}
          <a href="https://forums.dragcave.net/topic/190954-cave-shuffle-clock-v20/">
            post to the thread
          </a>{' '}
          about any issue you're experiencing that's not clarified here.
        </p>
      </Modal>
    </>
  );
}
