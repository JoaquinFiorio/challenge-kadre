import { CloseIcon } from '../../../../icons';
import styles from './ModalContainer.module.css';

interface Props {
    visible: boolean
    children: JSX.Element | JSX.Element[]
    onCancel?: () => void
}

export const ModalContainer = ({ visible, onCancel, children }: Props) => {

    return (
        <div className={`${styles.backgroundPopup} ${visible && styles.visible}`}>
            <div className={styles.popupContainer}>
                {onCancel && (
                    <div
                        className={styles.close}
                        onClick={onCancel}
                    >
                        <CloseIcon />
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};