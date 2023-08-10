import { createTheme } from "@mui/material"
import { grey } from "@mui/material/colors"

export const primaryColor = '#683ab7'
export const secondaryColor = '#89b73a'

export const webTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#e1e1e1'
        },
        primary: {
            main: primaryColor
        },
        secondary: {
            main: secondaryColor
        },
        info: {
            main: grey[100]
        }
    },
    components: {}
})
