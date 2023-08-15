import { createTheme } from "@mui/material"
import { grey } from "@mui/material/colors"
import { CSSProperties } from "react"

declare module '@mui/material/styles' {
    interface TypographyVariants {
        mini: CSSProperties
    }

    interface TypographyVariantsOptions {
        mini?: CSSProperties
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        mini: true
    }
}

export const primaryColor = '#383838'
export const secondaryColor = '#f60'
const fontSizeh1 = 'calc(40px + (46 - 30) * ((100vw - 200px) / 1620))'
const fontSizeh2 = 'calc(30px + (46 - 30) * ((100vw - 200px) / 1620))'
const fontSizeh3 = 'calc(25px + (46 - 30) * ((100vw - 200px) / 1620))'
const fontSizeh4 = 'calc(18px + (24 - 18) * ((100vw - 200px) / 1620))'
const fontSizeh5 = 'calc(17px + (24 - 18) * ((100vw - 200px) / 1620))'
const fontSizeh6 = 'calc(1rem + 3*(100vw - 20rem)/980)'
const fontSizebody1 = 'calc(.85rem + 2*(100vw - 20rem)/980)'
const fontSizebody2 = 'calc(.75rem + 2*(100vw - 20rem)/980)'
const fontSizemini = 'calc(.5rem + 2*(100vw - 20rem)/980)'

export const webTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#e1e1e1'
        },
        primary: {
            main: primaryColor,
            contrastText: "#fff"
        },
        secondary: {
            main: secondaryColor,
            contrastText: "#fff"
        },
        info: {
            main: grey[100]
        }
    },
    typography: {
        mini: {
            color: grey[700],
            fontSize: fontSizemini
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    msUserSelect: 'none'
                },
                h1: {
                    color: grey[900],
                    fontSize: fontSizeh1,
                    fontWeight: 500
                },
                h2: {
                    color: grey[900],
                    fontSize: fontSizeh2,
                    fontWeight: 500
                },
                h3: {
                    color: grey[900],
                    fontSize: fontSizeh3,
                    fontWeight: 500
                },
                h4: {
                    color: grey[900],
                    fontSize: fontSizeh4,
                    fontWeight: 500
                },
                h5: {
                    color: grey[900],
                    fontSize: fontSizeh5,
                    fontWeight: 500
                },
                h6: {
                    color: grey[900],
                    fontSize: fontSizeh6,
                    fontWeight: 500
                },
                body1: {
                    color: grey[800],
                    fontSize: fontSizebody1
                },
                body2: {
                    color: grey[700],
                    fontSize: fontSizebody2
                },
                subtitle1: {
                    color: grey[800],
                    fontSize: fontSizebody1,
                    fontWeight: 500
                },
                gutterBottom: {
                    marginBottom: '.75rem'
                }
            }
        }
    }
})
