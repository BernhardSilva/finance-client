import DashboardBox from '@/components/DashboardBox';
import { Box, useTheme, useMediaQuery } from '@mui/material';

type Props = {}

const gridTemplateLargeScreens = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
`
const gridTemplateSmallScreens = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"
`

const Dashboard = (props: Props) => {
    const isAboveMediumScreens = useMediaQuery(("min-dith:1200px"))
    const { palette } = useTheme()
    return (
        <Box width="100%" height="100%" display="grid" gap="1.5rem"
            sx={isAboveMediumScreens ? {
                gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr ))",
                gridTemplateAreas: gridTemplateLargeScreens,
            } : {
                gridTemplateColumns: "1fr",
                gridAutoRows: "80px",
                gridTemplateAreas: gridTemplateSmallScreens
            }
            }>
                <DashboardBox></DashboardBox>
            <DashboardBox gridArea="a" bgcolor="#fff"></DashboardBox>
            <DashboardBox gridArea="b" bgcolor="#fff"></DashboardBox>
            <DashboardBox gridArea="c" bgcolor="#fff"></DashboardBox>
            <DashboardBox gridArea="d" bgcolor="#fff"></DashboardBox>
            <DashboardBox gridArea="e" bgcolor="#fff"></DashboardBox>
            <DashboardBox gridArea="f" bgcolor="#fff"></DashboardBox>
            <DashboardBox gridArea="g" bgcolor="#fff"></DashboardBox>
            <DashboardBox gridArea="h" bgcolor="#fff"></DashboardBox>
            <DashboardBox gridArea="i" bgcolor="#fff"></DashboardBox>
            <DashboardBox gridArea="j" bgcolor="#fff"></DashboardBox>
        </Box>
    )
}

export default Dashboard