import Modal from 'react-modal'

export default function CustomModal ({
  contentLabel, isOpen, closeModal, children
}: {
  contentLabel: string
  isOpen: boolean
  closeModal: () => void
  children: JSX.Element | JSX.Element[]
}): JSX.Element {
  return (
    <Modal
      className="modal-content"
      overlayClassName="modal-overlay"
      contentLabel={contentLabel}
      isOpen={isOpen}
    >
      {children}
      <button type="button" onClick={closeModal}>
        <span>Close</span>
      </button>
    </Modal>
  )
}
