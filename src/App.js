import React, { useState } from 'react';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
  Pagination,
} from '@mui/material';

// Generate dummy company data with financial statements and long descriptions
const companiesData = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `Company ${i + 1}`,
  category: ['Technology', 'Food & Beverage', 'Environmental'][i % 3],
  size: ['Small', 'Medium', 'Large'][i % 3],
  location: ['San Francisco, CA', 'New York, NY', 'London, UK'][i % 3],
  employees: Math.floor(Math.random() * 1000),
  description: `Company ${i + 1} is a leading provider of innovative solutions in the ${
    ['technology', 'food and beverage', 'environmental'][i % 3]
  } sector. We are committed to delivering exceptional value to our customers through our cutting-edge products and services. Our team of experts is dedicated to providing the highest level of customer satisfaction. We are passionate about innovation and strive to stay at the forefront of our industry. We believe in building strong relationships with our customers and partners. Our mission is to make a positive impact on the world through our work. We are committed to sustainability and responsible business practices. We are proud to be a part of the global community and contribute to a better future.`,
  logo: require(`./logos/${i + 1}.jpg`),
  website: `https://company${i + 1}.com`,
  financialStatement: {
    revenue: Math.floor(Math.random() * 1000000),
    profit: Math.floor(Math.random() * 500000),
    assets: Math.floor(Math.random() * 2000000),
    liabilities: Math.floor(Math.random() * 1000000),
  },
}));

const COMPANIES_PER_PAGE = 30;
const DESCRIPTION_PREVIEW_LENGTH = 150; // Set the preview length

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSize, setFilterSize] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [page, setPage] = useState(1);

  const filteredCompanies = companiesData.filter((company) => {
    const nameMatch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = filterCategory ? company.category === filterCategory : true;
    const sizeMatch = filterSize ? company.size === filterSize : true;
    const locationMatch = filterLocation ? company.location === filterLocation : true;
    return nameMatch && categoryMatch && sizeMatch && locationMatch;
  });

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleBack = () => {
    setSelectedCompany(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * COMPANIES_PER_PAGE;
  const endIndex = startIndex + COMPANIES_PER_PAGE;
  const companiesToDisplay = filteredCompanies.slice(startIndex, endIndex);

  if (selectedCompany) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
          Back to Directory
        </Button>
        <Card>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: 150, objectFit: 'contain' }}
            image={selectedCompany.logo}
            alt={selectedCompany.name}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {selectedCompany.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {selectedCompany.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Size: {selectedCompany.size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {selectedCompany.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Employees: {selectedCompany.employees}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {selectedCompany.description}
            </Typography>

            <Box sx={{ my: 2 }} />

            <Typography variant="h6" component="div">
              Financial Statement:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Revenue: ${selectedCompany.financialStatement.revenue}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Profit: ${selectedCompany.financialStatement.profit}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Assets: ${selectedCompany.financialStatement.assets}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Liabilities: ${selectedCompany.financialStatement.liabilities}
            </Typography>

            <Button href={selectedCompany.website} target="_blank" rel="noopener noreferrer" sx={{ mt: 2 }}>
              Visit Website
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Company Directory
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Search companies..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Grid container spacing={2}>
          {/* ... (filters) */}
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {companiesToDisplay.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <Card onClick={() => handleCompanyClick(company)} sx={{ cursor: 'pointer', height: '100%' }}>
              <CardMedia
                component="img"
                sx={{ width: '100%', height: 150, objectFit: 'contain' }}
                image={company.logo}
                alt={company.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {company.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {company.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {company.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Revenue: ${company.financialStatement.revenue}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {company.description.substring(0, DESCRIPTION_PREVIEW_LENGTH)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredCompanies.length / COMPANIES_PER_PAGE)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
}

export default App;