import { Box, useTheme } from '@mui/material';


type Props = {}

const Dashboard = (props: Props) => {
    const { palette } = useTheme()
    return (
        <Box width="100%" height="100%" display="grid" gap="1.5rem">Dashboard</Box>
    )
}

export default Dashboard