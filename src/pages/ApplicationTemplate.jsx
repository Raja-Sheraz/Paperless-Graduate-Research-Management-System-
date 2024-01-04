import React from 'react'
import { Button, Paper, Typography, List, ListItem, Grid } from '@mui/material'

const TemplatePage = () => {
    const templates = [
        {
            template: 'Application for extension in duration of studies',
            value: '1701283594308Form GS-01 (v1) Application for extension in duration of studies.pdf'
        },
        {
            template: 'Application for leave of absence',
            value: '1701283612721Form GS-02 (v1) Application for leave of absence.pdf'
        },
        {
            template: 'Application for rejoining after leave',
            value: '1701283625725Form GS-03 (v1) Application for rejoining after leave.pdf'
        },
        {
            template: 'Application for readmission',
            value: '1701283636204Form GS-04 (v1) Application for readmisison.pdf'
        },
        {
            template: 'Appointment of Supervisor and Supervisory Committee',
            value: '1701283646924Form GS-05 (v1) Appointment of Supervisor and Supervisory Committee.pdf'
        },
        {
            template: 'Application for Comprehensive Examination',
            value: '1701283659014Form GS-06 (v1) Application for Comprehensive Examination.pdf'
        }
    ]

    const handleOpenTemplate = (templateValue) => {
        console.log(`Opening template: ${templateValue}`)
        window.open(`http://localhost:5000/files/${templateValue}`, '_blank')
    }

    const handleDownloadTemplate = (templateValue) => {
        console.log(`Downloading template: ${templateValue}`)
        window.open(`http://localhost:5000/files/${templateValue}`, '_blank')
        // Implement the logic to download the template
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                        Templates
                    </Typography>
                    <List>
                        {templates.map((template, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingY: 1
                                }}
                            >
                                <Typography>{template.template}</Typography>
                                <div>
                                    <Button
                                        onClick={() => handleOpenTemplate(template.value)}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Open
                                    </Button>
                                    <Button
                                        onClick={() => handleDownloadTemplate(template.value)}
                                        variant="outlined"
                                        color="primary"
                                        sx={{ marginLeft: 1 }}
                                    >
                                        Download
                                    </Button>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default TemplatePage
