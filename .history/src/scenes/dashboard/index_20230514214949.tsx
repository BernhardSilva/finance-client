import { Box, useTheme } from '@mui/material';

const gridTemplate = `
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
type Props = {}

const Dashboard = (props: Props) => {
    const { palette } = useTheme()
    return (
        <Box width="100%" height="100%" display="grid" gap="1.5rem"
            sx={{
                gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr ))",
                gridTemplateAreas: gridTemplate,
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