import { Box, useTheme } from '@mui/material';

const gridTemplate = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h j"
    "g h j"
    "g h k"
    "g h k"
`
type Props = {}

const Dashboard = (props: Props) => {
    const { palette } = useTheme()
    return (
        <Box width="100%" height="100%" display="grid" gap="1.5rem"
            sx={{
                gridTemplateAreas: gridTemplate,
            }}>
            Dashboard
        </Box>
    )
}

export default Dashboard