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
  Paper,
} from '@mui/material';

const DESCRIPTION_PREVIEW_LENGTH = 150; 

// Generate dummy company data with financial statements
const companiesData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Company ${i + 1}`,
  category: ['Technology', 'Food & Beverage', 'Environmental'][i % 3],
  size: ['Small', 'Medium', 'Large'][i % 3],
  location: ['San Francisco, CA', 'New York, NY', 'London, UK'][i % 3],
  employees: Math.floor(Math.random() * 1000),
  description: `Company ${i + 1} is a dynamic and innovative leader in the ${
    ['technology', 'food and beverage', 'environmental'][i % 3]
  } sector. With a strong commitment to excellence and a passion for creating cutting-edge solutions, we empower our clients to achieve their business goals. Our team of experts brings a wealth of experience and expertise to every project, ensuring that we deliver exceptional results that exceed expectations. We are dedicated to building long-lasting relationships with our clients, based on trust, integrity, and mutual respect. Our mission is to make a positive impact on the world through our work, and we strive to be a catalyst for change in our industry. We are committed to sustainability and responsible business practices, and we believe in giving back to our communities. Our values of innovation, collaboration, and customer focus drive everything we do, and we are constantly seeking new ways to improve and grow. We are proud to be a part of the global community and contribute to a better future.`,
  logo: require(`./logos/${i + 1}.jpg`),
  website: `https://company${i + 1}.com`,
  financialStatement: {
    revenue: Math.floor(Math.random() * 1000000),
    profit: Math.floor(Math.random() * 500000),
    assets: Math.floor(Math.random() * 2000000),
    liabilities: Math.floor(Math.random() * 1000000),
  },
}));

const COMPANIES_PER_PAGE = 9;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSize, setFilterSize] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [page, setPage] = useState(1);

  const filteredCompanies = companiesData.filter((company) => {
    const nameMatch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    let categoryMatch = true;
    let sizeMatch = true;
    let locationMatch = true;
  
    if (filterCategory) {
      categoryMatch = company.category === filterCategory;
    }
    if (filterSize) {
      sizeMatch = company.size === filterSize;
    }
    if (filterLocation) {
      locationMatch = company.location === filterLocation;
    }
  
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
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          {/* Hero Section */}
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
  
          {/* About Us Section */}
          <Typography variant="h5" component="div" sx={{ mt: 3, mb: 1 }}>
            About Us
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedCompany.description}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Key Features:
            <ul>
              <li>Cutting-edge solutions</li>
              <li>Dedicated team</li>
              <li>Sustainable practices</li>
            </ul>
          </Typography>
  
          {/* Key Information Section */}
          <Typography variant="h5" component="div" sx={{ mt: 3, mb: 1 }}>
            Key Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {/* Add Icon */}
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Category: {selectedCompany.category}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {/* Add Icon */}
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Size: {selectedCompany.size}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {/* Add Icon */}
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Location: {selectedCompany.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {/* Add Icon */}
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Employees: {selectedCompany.employees}
                </Typography>
              </Box>
            </Grid>
          </Grid>
  
          {/* Financials Section */}
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
            {/* Add chart or graph here */}
          </Grid>
  
          {/* Call to Action */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" size="large">
              Contact Us
            </Button>
          </Box>
        </Paper>
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
  <Grid item xs={12} sm={6} md={3}>
    <Select
      fullWidth
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
    >
      <MenuItem value="">All Categories</MenuItem>
      <MenuItem value="Technology">Technology</MenuItem>
      <MenuItem value="Food & Beverage">Food & Beverage</MenuItem>
      <MenuItem value="Environmental">Environmental</MenuItem>
    </Select>
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <Select
      fullWidth
      value={filterSize}
      onChange={(e) => setFilterSize(e.target.value)}
    >
      <MenuItem value="">All Sizes</MenuItem>
      <MenuItem value="Small">Small</MenuItem>
      <MenuItem value="Medium">Medium</MenuItem>
      <MenuItem value="Large">Large</MenuItem>
    </Select>
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <Select
      fullWidth
      value={filterLocation}
      onChange={(e) => setFilterLocation(e.target.value)}
    >
      <MenuItem value="">All Locations</MenuItem>
      <MenuItem value="San Francisco, CA">San Francisco, CA</MenuItem>
      <MenuItem value="New York, NY">New York, NY</MenuItem>
      <MenuItem value="London, UK">London, UK</MenuItem>
    </Select>
  </Grid>
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