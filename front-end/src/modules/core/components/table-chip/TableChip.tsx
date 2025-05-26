import styles from './TableChip.module.css';
import { Chip } from "@nextui-org/react";

interface Props {
    children: any
    color?: any
}

export const TableChip = ({
    children,
    color = 'primary'
}: Props) => {
    return (
        <Chip
            className={styles.chip}
            color={color}
            size="sm"
            variant="shadow"
        >
            {children || 'N/A'}
        </Chip>
    );
}