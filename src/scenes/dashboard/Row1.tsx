import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { numberToDollarString, numberToIntegerDollarString } from '@/utils/formatCurrency';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const Row1 = () => {
    const { palette } = useTheme()
    const { data } = useGetKpisQuery();

    // Revenue Expensses response
    const revenueExpensesData = useMemo(() => {
        return (
            data &&
            data[0]?.monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue,
                    expenses,
                    profit: (revenue - expenses),
                }
            })
        )
    }, [data])

    return (
        <>
            {/* Revenue and Expenses */}
            <DashboardBox gridArea="a">
                <BoxHeader title='Revenue and Expenses' subtitle='top line represents revenue, bottom line represents expensive' sideText='+4%' />
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={revenueExpensesData}
                        margin={{
                            top: 15,
                            right: 25,
                            left: 0,
                            bottom: 60,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y="0" x2="0" y2="1">
                                <stop offset="4%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <defs>
                            <linearGradient id="colorExpenses" x1="0" y="0" x2="0" y2="1">
                                <stop offset="4%" stopColor={palette.secondary[300]} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={palette.secondary[300]} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis tickLine={false} axisLine={{ strokeWidth: "0" }} style={{ fontSize: "10px" }} domain={[8000, 23000]} tickFormatter={(value) => numberToIntegerDollarString(value)} />
                        <Tooltip formatter={(value) => numberToDollarString(value)} />
                        <Area type="monotone" dataKey="revenue" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" dot />
                        <Area type="monotone" dataKey="expenses" stroke={palette.secondary.main} fillOpacity={1} fill="url(#colorExpenses)" dot />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>

            {/* Profit and Revenues     */}
            <DashboardBox gridArea="b">
                <BoxHeader title='Profit and Revenue' subtitle='top line represents profit, bottom line represents revenue' sideText={"+4%"} />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={revenueExpensesData}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />

                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} tickFormatter={(value) => numberToIntegerDollarString(value)} />
                        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} tickFormatter={(value) => numberToIntegerDollarString(value)} />

                        <Tooltip formatter={(value) => numberToDollarString(value)} />

                        <Legend height={20} wrapperStyle={{ margin: '0 0 10px 0' }} />

                        <Line yAxisId="left" type="monotone" dataKey="profit" stroke={palette.tertiary[500]} />
                        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={palette.primary.main} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            {/* Revenue by Month     */}
            <DashboardBox gridArea="c">
                <BoxHeader title='Revenue month by month' subtitle='graph representing the revenue month by month' sideText={"+4%"} />
                <ResponsiveContainer>
                    <BarChart
                        width={500}
                        height={300}
                        data={revenueExpensesData}
                        margin={{
                            top: 17,
                            right: 15,
                            left: -5,
                            bottom: 58,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y="0" x2="0" y2="1">
                                <stop offset="4%" stopColor={palette.primary[300]} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />

                        <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
                        <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px' }} tickFormatter={(value) => numberToIntegerDollarString(value)} />

                        <Tooltip formatter={(value) => numberToDollarString(value)} itemStyle={{ color: palette.primary.main }} />

                        <Bar dataKey="revenue" fill="url(#colorRevenue)" />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default Row1