import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetKpisQuery } from '@/state/api'
import { numberToDollarString, numberToIntegerDollarString } from '@/utils/formatCurrency';
import { useTheme, Box, Typography, Button } from '@mui/material';
import { useState, useMemo } from 'react'
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import regression, { DataPoint } from "regression";


const Predictions = () => {
    const { palette } = useTheme()
    const [isPredictions, setIsPredictions] = useState(false)
    const { data: kpiData } = useGetKpisQuery()


    const formattedData = useMemo(() => {
        if (!kpiData) return []
        const monthData = kpiData[0].monthlyData;

        const formatted: Array<DataPoint> = monthData.map(
            ({ revenue }, i: number) => {
                return [i, revenue]
            }
        );
        const regressionLine = regression.linear(formatted)

        return monthData.map(({ month, revenue }, i: number) => {
            return {
                name: month,
                //actual revenue
                "Actual Revenue": revenue,
                //revenue for jan
                "Regression Line": regressionLine.points[i][1],
                //next year prediction and grab revenue value
                "Predicted Revenue": regressionLine.predict(i + 12)[1]
            }
        })
    }, [kpiData])


    return (
        <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
            <FlexBetween m="1rem 2.5rem" gap="1rem">
                <Box>
                    <Typography variant="h3">
                        Revenue and Predictions
                    </Typography>
                    <Typography variant="h6">
                        Charted revenue and predicted revenue based on a simple linear regression model
                    </Typography>
                </Box>
                <Button onClick={() => setIsPredictions(!isPredictions)}
                    sx={{
                        color: palette.grey[300],
                        backgroundColor: palette.grey[800],
                        '&:hover': { backgroundColor: palette.primary.dark },
                        boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
                        borderRadius: 2
                    }}>
                    Show Predicted Revenue for Next Year 🚀
                </Button>
            </FlexBetween>
            <ResponsiveContainer>
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 20,
                        right: 50,
                        left: 20,
                        bottom: 80,
                    }}
                >
                    <CartesianGrid vertical={false} stroke={palette.grey[800]} strokeDasharray="3 3" />

                    <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} >
                        <Label value="Month" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis domain={[12000, 26000]} tickLine={false} axisLine={false} style={{ fontSize: "10px" }}
                        tickFormatter={(value) => numberToIntegerDollarString(value)}
                    >
                        <Label value="Revenue in USD" angle={-90} offset={-5} position="insideLeft" />
                    </YAxis>
                    <Tooltip formatter={(value) => numberToDollarString(value)} />

                    <Legend verticalAlign='top' />

                    <Line type="monotone" dataKey="Actual Revenue" stroke={palette.primary.main} strokeWidth={0} dot={{ strokeWidth: 5 }} />
                    <Line type="monotone" dataKey="Regression Line" stroke={palette.tertiary[500]} dot={false} />
                    {
                        isPredictions && (
                            <Line strokeDasharray="5 5" dataKey="Predicted Revenue" stroke={palette.secondary[500]} />
                        )
                    }
                </LineChart>
            </ResponsiveContainer>

        </DashboardBox>
    )
}

export default Predictions