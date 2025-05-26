import styles from './ModalCloseButton.module.css'
import { CloseIcon } from '../../../../icons'

interface Props {
    onPress: () => void
}

export const ModalCloseButton = ({ onPress }: Props) => {
    return (
        <div
            className={styles.container}
            onClick={onPress}
        >
            <CloseIcon />
        </div>
    )
}
