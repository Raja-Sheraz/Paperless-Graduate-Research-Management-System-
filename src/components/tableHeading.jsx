import { Typography } from '@mui/material'

export const TableHeading = ({ name }) => {
    return (
        <>
            <Typography
                variant="h2"
                sx={{
                    fontFamily: 'Outfit',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    lineHeight: '32px',
                    letterSpacing: '0em',
                    margin: '20px 0'
                }}
            >
                {name}
            </Typography>
        </>
    )
}
