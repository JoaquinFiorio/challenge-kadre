import styles from './StatCard.module.css';

interface Props {
    title: string
    value: string
    icon: any
}

export const StatCard = ({ title, value, icon }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h1 className={styles.title}>
                    {title}
                </h1>
                <h2 className={styles.value}>
                    {value}
                </h2>
            </div>
            <div className={styles.iconContainer}>
                {icon}
            </div>
        </div>
    )
}