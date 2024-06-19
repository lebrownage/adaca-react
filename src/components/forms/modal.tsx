import {Modal} from 'react-bootstrap'
import React from 'react';
interface IProps {
    isOpen: boolean;
    size: 'sm' | 'lg' | 'xl';
    header : React.ReactNode
    onClose: () => void;
    children: {
      body: React.ReactNode;
      footer: React.ReactNode;
    };
}

function ModalHtml({ isOpen, size, onClose, header, children } : IProps) {

    return (
        <div >
            <Modal show={isOpen} onHide={onClose} size={size}>
                <Modal.Header closeButton onClick={onClose}>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children.body}
                </Modal.Body>
                <Modal.Footer>
                    {children.footer}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalHtml
