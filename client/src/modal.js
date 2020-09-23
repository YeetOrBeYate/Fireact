import React from 'react'
import {Modal} from 'react-bootstrap'

const ModalComponent = (props) => {
  const {isVisible, children, onClose, closeText } = props

  return (
    <div>
      <Modal show = {isVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title> Push Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flexContainer">
            <p>Please enable push notifications</p>
            <button onClick={onClose} className="permission">Allow</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalComponent
