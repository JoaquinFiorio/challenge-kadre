import { Table, TableHeader, TableColumn, TableBody, Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

interface Props {
    headers: string[]
    rows: any
    buttonLoadMoreLoading?: boolean
    buttonLoadMoreDisabled?: boolean
    style?: any
    topContent?: any
    onLoadMore?: () => void
}

export const TableCard = ({
    headers,
    rows,
    buttonLoadMoreLoading,
    buttonLoadMoreDisabled,
    style,
    topContent,
    onLoadMore,
}: Props) => {

    const { t } = useTranslation();

    return (
        <>
            <Table
                topContent={topContent}
                className={style}
                aria-label="Table"
                color="primary"
                radius="none"
                shadow="lg"
                isStriped
                bottomContent={
                    onLoadMore && (
                        <Button
                            style={{
                                marginTop: '10px',
                                width: '150px'
                            }}
                            color={buttonLoadMoreDisabled ? "default" : "primary"}
                            size="sm"
                            variant={buttonLoadMoreDisabled ? "ghost" : "flat"}
                            disabled={buttonLoadMoreDisabled}
                            onClick={onLoadMore}
                        >
                            {
                                (buttonLoadMoreLoading)
                                    ? t("loadingText")
                                    : (buttonLoadMoreDisabled)
                                        ? t("noMoreResultsText")
                                        : t("loadMoreButtonText")
                            }
                        </Button>
                    )
                }
            >
                <TableHeader>
                    {headers.map((header) => (
                        <TableColumn key={header}>
                            {header}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent={'No hay más resultados'}>
                    {rows}
                </TableBody>
            </Table>
        </>
    );
}