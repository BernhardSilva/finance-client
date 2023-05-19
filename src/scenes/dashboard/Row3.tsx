import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import { numberToDollarString } from '@/utils/formatCurrency';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';


const Row3 = () => {
    const { palette } = useTheme()
    const pieColors = [palette.primary[800], palette.primary[500]]
    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { data: transactionData } = useGetTransactionsQuery();


    const mapProductData = useMemo(() => {
        return (
            productData &&
            productData?.map(({ _id, price, expense, transactions }) => {
                return {
                    id: _id,
                    price,
                    expense,
                    transactions,
                }
            })
        )
    }, [productData])

    const mapTransactionData = useMemo(() => {
        return (
            transactionData &&
            transactionData?.map(({ _id, buyer, amount, productIds }) => {
                return {
                    id: _id,
                    buyer,
                    amount,
                    productIds,
                }
            })
        )
    }, [transactionData])

    const mapPieChartData = useMemo(() => {
        if (kpiData) {
            //get total expenses from kpiData
            const totalExpenses = kpiData[0].totalExpenses;
            return Object.entries(kpiData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [
                        {
                            name: key,
                            value
                        },
                        {
                            name: `${key} of Total`,
                            value: totalExpenses - Number(value),
                        }
                    ]
                })
        }

    }, [kpiData])

    const productColumns = [
        {
            field: "id",
            headerName: "id",
            flex: 1
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => numberToDollarString(params.value),
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => numberToDollarString(params.value),
        },
    ]

    const transactionColumns = [
        {
            field: "id",
            headerName: "id",
            flex: 1
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.67,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.35,
            renderCell: (params: GridCellParams) => numberToDollarString(params.value),
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.1,
            renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
        },
    ]

    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader
                    title="List of Products"
                    sideText={`${productData?.length} products`}
                />
                <Box mt="0.5rem" p="0 0.5rem" height="83%" sx={{
                    "& .MuiDataGrid-root": {
                        color: palette.grey[300],
                        border: "none"
                    },
                    "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`,
                    },
                    "& .MuyDataGrid-columnSeparator": {
                        visibility: "hidden"
                    },
                    "& .MuiTablePagination-selectLabel, & .MuiSelect-select, & .MuiTablePagination-displayedRows": {
                        color: palette.grey[300],
                    },
                    "& .MuiDataGrid-withBorderColor": {
                        borderColor: `${palette.grey[800]} !important`
                    },
                    "& .MuiTablePagination-root": {
                        display: "table"
                    }
                }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        rows={mapProductData || []}
                        columns={productColumns}

                    />
                </Box>
            </DashboardBox>

            <DashboardBox gridArea="h">
                <BoxHeader
                    title="Recent Orders"
                    sideText={`${transactionData?.length} latest transactions`}
                />
                <Box mt="0.5rem" p="0 0.5rem" height="87%" sx={{
                    "& .MuiDataGrid-root": {
                        color: palette.grey[300],
                        border: "none"
                    },
                    "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`,
                    },
                    "& .MuyDataGrid-columnSeparator": {
                        visibility: "hidden"
                    },
                    "& .MuiTablePagination-selectLabel, & .MuiSelect-select, & .MuiTablePagination-displayedRows": {
                        color: palette.grey[300],
                    },
                    "& .MuiDataGrid-withBorderColor": {
                        borderColor: `${palette.grey[800]} !important`
                    },
                    "& .MuiTablePagination-root": {
                        display: "table"
                    }
                }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        rows={mapTransactionData || []}
                        columns={transactionColumns}

                    />
                </Box>
            </DashboardBox>

            <DashboardBox gridArea="i">
                <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
                <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">

                    {mapPieChartData?.map((data, i) => (
                        <Box key={`${data[0].name}-${i}`}>
                            <PieChart width={100} height={80}>
                                <Pie
                                    stroke='none'
                                    data={data}
                                    innerRadius={18}
                                    outerRadius={38}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data?.map((entry, index) => (
                                        <Cell key={`cell-${entry}`} fill={pieColors[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography variant="h5">{data[0].name}</Typography>
                        </Box>
                    ))}

                </FlexBetween>

            </DashboardBox>

            <DashboardBox gridArea="j">
                <BoxHeader title="Overall Summary and Explanation Data" sideText={`15%`} />
                <Box
                    height="15px"
                    margin="1.25rem 1rem 0.4rem 1rem"
                    bgcolor={palette.primary[800]}
                    borderRadius="1rem"
                >
                    <Box
                        height="15px"
                        bgcolor={palette.primary[600]}
                        borderRadius="1rem"
                        width={`${15}%`}
                    >
                    </Box>
                </Box>
                <Typography margin="0 1rem" variant="h6">
                    Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam ullamcorper odio sed.
                    Ipsum non sed gravida etiam urna egestas molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare sed.
                    In volutpat nullam at est id cum pulvinar nunc.
                </Typography>

            </DashboardBox>
        </>
    )
}

export default Row3