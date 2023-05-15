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
    "b"
    "c"
    "d"
    "e"
    "f"
    "g"
    "h"
    "i"
    "j"
`

const Dashboard = (props: Props) => {
    const isAboveMediumScreens = useMediaQuery(("min-dith:1200px"))
    const { palette } = useTheme()
    return (
        <Box width="100%" height="100%" display="grid" gap="1.5rem"
            sx={{
                gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr ))",
                gridTemplateAreas: gridTemplateLargeScreens,
            }}>
            <Box gridArea="a" bgcolor="#fff"></Box>
            <Box gridArea="b" bgcolor="#fff"></Box>
            <Box gridArea="c" bgcolor="#fff"></Box>
            <Box gridArea="d" bgcolor="#fff"></Box>
            <Box gridArea="e" bgcolor="#fff"></Box>
            <Box gridArea="f" bgcolor="#fff"></Box>
            <Box gridArea="g" bgcolor="#fff"></Box>
            <Box gridArea="h" bgcolor="#fff"></Box>
            <Box gridArea="i" bgcolor="#fff"></Box>
            <Box gridArea="j" bgcolor="#fff"></Box>
        </Box>
    )
}

export default Dashboard