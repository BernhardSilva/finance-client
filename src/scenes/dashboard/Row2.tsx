import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';
import { numberToDollarString, numberToIntegerDollarString } from '@/utils/formatCurrency';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';


const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
]

const Row2 = () => {

    const { palette } = useTheme()
    const pieColor = [palette.primary[800], palette.primary[300]]
    const { data: operationalData } = useGetKpisQuery();
    const { data: productsData } = useGetProductsQuery();

    // Operational vs Non-Operational Expenses
    const operationalExpensesData = useMemo(() => {
        return (
            operationalData &&
            operationalData[0]?.monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
                return {
                    name: month.substring(0, 3),
                    "Operational Expenses": operationalExpenses,
                    "Non Operational Expenses": nonOperationalExpenses,
                }
            })
        )
    }, [operationalData])

    const productsExpensesData = useMemo(() => {
        return (
            productsData &&
            productsData?.map(({ _id, price, expense }) => {
                return {
                    id: _id,
                    price,
                    expense,
                }
            })
        )
    }, [productsData])

    const customTooltip = (value: any, name: any): any => {
        if (name === "price") {
            return <span style={{ color: palette.primary.main }}>{`$${(value)}`}</span>;
        } else if (name === "expense") {
            return <span style={{ color: palette.secondary.main }}>{`$${(value)}`}</span>;
        }
        return null;
    }


    return (
        <>
            {/* Operational vs Non Operational */}
            <DashboardBox gridArea="d">
                <BoxHeader title='Operational vs Non-Operational Expenses' sideText={"+4%"} />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={operationalExpensesData}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />

                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} tickFormatter={(value)=> numberToIntegerDollarString(value)} />
                        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} tickFormatter={(value)=> numberToIntegerDollarString(value)} />

                        <Tooltip formatter={(value) => numberToDollarString(value)} />

                        <Line yAxisId="left" type="monotone" dataKey="Non Operational Expenses" stroke={palette.tertiary[500]} />
                        <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" stroke={palette.primary.main} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            {/* Campaigns and Targegs Chart */}
            <DashboardBox gridArea="e">
                <BoxHeader title='Campaigns and Targets' sideText={"+4%"} />
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                    <PieChart width={110} height={100}
                        margin={{
                            top: 0,
                            right: -10,
                            left: 10,
                            bottom: 0,
                        }}>
                        <Pie
                            stroke='none'
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {pieData?.map((name, value) => (
                                <Cell key={`cell-${name}`} fill={pieColor[value]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
                        <Typography variant="h5">Target Sales</Typography>
                        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>83</Typography>
                        <Typography variant='h6'>Finance goals of the campaign that is desired</Typography>
                    </Box>
                    <Box flexBasis="40%" textAlign={'left'}>
                        <Typography variant="h5">Losses in Revenue</Typography>
                        <Typography variant='h6'>Losses are down 25%</Typography>
                        <Typography variant="h5" mt="0.4rem">Profit Margins</Typography>
                        <Typography variant='h6'>Margins are up by 30% from last month.</Typography>
                    </Box>
                </FlexBetween>
            </DashboardBox>

            {/* Product Prices vs Expenses */}
            <DashboardBox gridArea="f">
                <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 40,
                            left: -10,
                        }}
                    >
                        <CartesianGrid stroke={palette.grey[800]} />
                        <XAxis
                            type="number"
                            dataKey="price"
                            name="price"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <YAxis
                            type="number"
                            dataKey="expense"
                            name="expense"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <ZAxis type="number" range={[20]} />
                        <Tooltip
                            contentStyle={{ color: palette.grey[700] }}
                            formatter={(value, name) => customTooltip(value, name)}
                        />
                        <Scatter
                            name="Product Expense Ratio"
                            data={productsExpensesData}
                            fill={palette.tertiary[500]}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default Row2