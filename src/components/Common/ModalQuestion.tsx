import React from 'react'
import { Button } from './Button';
import Modal from './Modal';

interface ModalQuestionProps {
    textConfirm?: string,
    title?: string,
    status?: boolean,
    onClose?: Function,
    onSave?: Function,
    sizeText?: string,
}

function ModalQuestion({ 
    textConfirm = 'Confirm Text',
    title = 'Title Text',
    status = false,
    onClose, 
    onSave,
    sizeText
}: ModalQuestionProps) {

    return (
        <Modal 
            visible={status}
            onHideModal={() => onClose && onClose()}
        >
            <Modal.Header 
                title={title} 
                onHideModal={() => onClose && onClose()}
            />
            <Modal.Body>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <span
                        style={{
                            maxWidth: sizeText,
                            whiteSpace: 'pre-wrap',
                            textAlign: 'center',
                            fontSize: '1.1rem',
                            fontWeight: '400',
                            color:' rgba(255,255,255,0.7)',
                            lineHeight: '26px'
                        }}
                    >
                        { textConfirm }
                    </span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        onClose && onClose();
                    }}
                    typeDismiss={true}
                >
                    Trở lại
                </Button>
                <Button
                    onClick={() => {
                        onSave && onSave();
                    }}
                >
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalQuestion