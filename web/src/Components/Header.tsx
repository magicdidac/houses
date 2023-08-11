import { AppBar, Stack, Toolbar, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
})

export const Header = () => {
    const navigate = useNavigate()

    return (
        <AppBar position='sticky'>
            <StyledToolbar>
                <Stack direction='row' gap='.5rem' alignItems='end'>
                    <Typography variant='h6' color='inherit' style={{ cursor: 'pointer' }} onClick={() => navigate('/')} >Futura Casa</Typography>
                    <Typography variant='body2' color='inherit'>v {process.env.REACT_APP_VERSION}</Typography>
                </Stack>
            </StyledToolbar>
        </AppBar >
    )
}