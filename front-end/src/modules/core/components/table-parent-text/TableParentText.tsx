import styles from './TableParentText.module.css';

interface TdParentTextProps {
    parent: string
    content: string
}

export const TableParentText = ({ parent, content }: TdParentTextProps) => {
    return (
        <div className={styles.container}>
            <p className={styles.parent}>
                {parent}
            </p>
            <p className={styles.content}>
                {(content.length > 60) ? `${content.slice(0, 60)}...` : content}
            </p>
        </div>
    );
}