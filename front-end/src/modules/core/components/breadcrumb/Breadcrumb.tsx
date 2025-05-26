import { useNavigate } from 'react-router-dom';
import styles from './Breadcrumb.module.css';
import { BreadcrumbItem, Breadcrumbs, Progress } from '@nextui-org/react';

interface BreadcrumbProps {
    pageName: string;
    loading?: boolean;
}

export const Breadcrumb = ({
    pageName,
    loading
}: BreadcrumbProps) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    {pageName}
                </h1>
            </div>
            <Breadcrumbs color="primary">
                <BreadcrumbItem onClick={() => handleNavigate()}>Kadre</BreadcrumbItem>
                <BreadcrumbItem>{pageName}</BreadcrumbItem>
            </Breadcrumbs>
            {loading && (
                <Progress
                    style={{ marginTop: 10 }}
                    size="sm"
                    isIndeterminate
                    aria-label="Loading..."
                    className="max-w-16"
                />
            )}
        </div>
    );
}