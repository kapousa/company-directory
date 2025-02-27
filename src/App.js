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

// Generate dummy company data
const companiesData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Company ${i + 1}`,
  category: ['Technology', 'Food & Beverage', 'Environmental'][i % 3],
  size: ['Small', 'Medium', 'Large'][i % 3],
  location: ['Cairo, Egypt', 'Dubai, UAE', 'London, UK'][i % 3],
  employees: Math.floor(Math.random() * 1000),
  description: `Description for Company ${i + 1}`,
  logo: require(`./logos/${i + 1}.jpg`), // Dynamically import logos
  website: `https://company${i + 1}.com`,
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
            <Select fullWidth value={filterSize} onChange={(e) => setFilterSize(e.target.value)}>
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
              <MenuItem value="Cairo, Egypt">Cairo, Egypt</MenuItem>
              <MenuItem value="Dubai, UAE">Dubai, UAE</MenuItem>
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