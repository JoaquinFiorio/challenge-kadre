import { Table, TableHeader, TableColumn, TableBody } from "@nextui-org/react";

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
    style,
    topContent,
}: Props) => {

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