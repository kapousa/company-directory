import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
    CardMedia,
    Paper,
    Tabs,
    Tab,
} from '@mui/material';

const CompanyDetails = ({ selectedCompany, handleBack }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (selectedCompany) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
                    Back to Directory
                </Button>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 3,
                            textAlign: 'center',
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{ width: 150, height: 150, objectFit: 'contain', mb: 1 }}
                            image={selectedCompany.logo}
                            alt={selectedCompany.name}
                        />
                        <Typography variant="h3" component="div">
                            {selectedCompany.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Innovating for a Better Future
                        </Typography>
                        <Button
                            href={selectedCompany.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            Visit Our Website
                        </Button>
                    </Box>

                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="company tabs">
                        <Tab label="About Us" />
                        <Tab label="Portfolio" />
                        <Tab label="Investors" />
                        <Tab label="Assessment" />
                        <Tab label="Transformation Plan" />
                    </Tabs>

                    {activeTab === 0 && (
                        <>
                            <Typography variant="h5" component="div" sx={{ mt: 3, mb: 1 }}>
                                About Us
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {selectedCompany.description}
                            </Typography>

                            <Typography variant="h5" component="div" sx={{ mt: 3, mb: 1 }}>
                                Key Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Category: {selectedCompany.category}</Typography>
                                    <Typography variant="body1">Size: {selectedCompany.size}</Typography>
                                    <Typography variant="body1">Founded: {new Date(selectedCompany.founded).toLocaleDateString()}</Typography>
                                    <Typography variant="body1">Headquarters: {selectedCompany.headquarters}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Location: {selectedCompany.location}</Typography>
                                    <Typography variant="body1">Employees: {selectedCompany.employees}</Typography>
                                    <Typography variant="body1">Mission: {selectedCompany.mission}</Typography>
                                    <Typography variant="body1">Values: {selectedCompany.company_values.join(', ')}</Typography>
                                </Grid>
                            </Grid>

                            <Typography variant="h5" component="div" sx={{ mt: 3, mb: 1 }}>
                                Financial Highlights
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Revenue: ${selectedCompany.financialStatement.revenue}</Typography>
                                    <Typography variant="body1">Profit: ${selectedCompany.financialStatement.profit}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Assets: ${selectedCompany.financialStatement.assets}</Typography>
                                    <Typography variant="body1">Liabilities: ${selectedCompany.financialStatement.liabilities}</Typography>
                                </Grid>
                            </Grid>
                        </>
                    )}

                    {activeTab === 2 && (
                        <>
                            <Typography variant="h5" component="div" sx={{ mt: 3, mb: 1 }}>
                                Investors
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {selectedCompany.investors?.summary} {/* Use optional chaining */}
                            </Typography>
                            {selectedCompany.investors && ( // conditionally render the list if investors exists
                                <ul>
                                    <li><a href={selectedCompany.investors.annual_report}>Annual Report</a></li>
                                    <li><a href={selectedCompany.investors.financial_results}>Financial Results</a></li>
                                    <li><a href={selectedCompany.investors.presentations}>Investor Presentations</a></li>
                                </ul>
                            )}
                            <Typography variant="body1">Contact: <a href={`mailto:${selectedCompany.investors?.contact}`}>{selectedCompany.investors?.contact}</a></Typography>
                        </>
                    )}

                    {activeTab === 3 && (
                        <>
                            <Typography variant="h5" component="div" sx={{ mt: 3, mb: 1 }}>
                                Assessment
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {selectedCompany.assessment?.summary} {/* Use optional chaining */}
                            </Typography>
                            {selectedCompany.assessment && ( // conditionally render the list if assessment exists
                                <ul>
                                    <li><a href={selectedCompany.assessment.sustainability_report}>Sustainability Report</a></li>
                                    <li><a href={selectedCompany.assessment.customer_satisfaction_report}>Customer Satisfaction Report</a></li>
                                </ul>
                            )}
                        </>
                    )}

                    {activeTab === 1 && (
                        <>
                            <Typography variant="h5" component="div" sx={{ mt: 3, mb: 1 }}>
                                Portfolio
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {selectedCompany.portfolio?.summary}
                            </Typography>
                            {selectedCompany.portfolio && (
                                <>
                                    <Typography variant="h6">Projects</Typography>
                                    <ul>
                                        {selectedCompany.portfolio.projects?.map((project, index) => (
                                            <li key={index}><a href={project.link}>{project.name}</a></li>
                                        ))}
                                    </ul>
                                    <Typography variant="h6">Client Stories</Typography>
                                    <ul>
                                        {selectedCompany.portfolio.client_stories?.map((story, index) => (
                                            <li key={index}><a href={story.link}>{story.client}</a></li>
                                        ))}
                                    </ul>
                                    <Typography variant="body1"><a href={selectedCompany.portfolio.complete_portfolio}>View Complete Portfolio</a></Typography>
                                </>
                            )}
                        </>
                    )}

                    {activeTab === 4 && (
                        <>
                            <Typography variant="h5" component="div" sx={{ mt: 3, mb: 1 }}>
                                Transformation Plan
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {selectedCompany.transformation_plan?.summary}
                            </Typography>
                            {selectedCompany.transformation_plan && (
                                <>
                                    <Typography variant="h6">Planning</Typography>
                                    <Typography variant="body1">{selectedCompany.transformation_plan.planning}</Typography>
                                    <Typography variant="h6">Execution</Typography>
                                    <Typography variant="body1">{selectedCompany.transformation_plan.execution}</Typography>
                                    <Typography variant="h6">Monitoring</Typography>
                                    <Typography variant="body1">{selectedCompany.transformation_plan.monitoring}</Typography>
                                    <Typography variant="h6">Release</Typography>
                                    <Typography variant="body1">{selectedCompany.transformation_plan.release}</Typography>
                                    <Typography variant="body1"><a href={selectedCompany.transformation_plan.document}>Transformation Plan Document</a></Typography>
                                </>
                            )}
                        </>
                    )}

                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button variant="contained" color="primary" size="large">
                            Contact Us
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }
    return null;
};

export default CompanyDetails;