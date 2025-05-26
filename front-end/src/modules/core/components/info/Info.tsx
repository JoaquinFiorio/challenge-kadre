import styles from './Info.module.css';

interface Props {
    title: string
    message: string
}

export const Info = ({ title, message }: Props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {title}
            </h1>
            <p className={styles.message}>
                {message}
            </p>
        </div>
    )
};