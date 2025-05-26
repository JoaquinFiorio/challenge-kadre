import { Progress } from '@nextui-org/react';
import styles from './TableProgress.module.css';

interface Props {
    value: number
    valueLabel: string
    maxValue: number
    maxValueLabel: string
};

export const TableProgress = ({
    value,
    valueLabel,
    maxValue,
    maxValueLabel
}: Props) => {

    return (
        <div className={styles.container}>
            <Progress
                classNames={{
                    track: "drop-shadow-lg border",
                    indicator: "bg-gradient-to-r from-purple-500 to-pink-500",
                    value: styles.value,
                    label: styles.label,
                }}
                label={valueLabel}
                valueLabel={maxValueLabel}
                value={value}
                maxValue={maxValue}
                showValueLabel
                size='md'
            />
        </div>
    );
}