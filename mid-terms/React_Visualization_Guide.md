# React Data Visualization Implementation Guide

## Overview
This guide shows how to implement data visualizations for the Graduate Employment Survey using React and modern visualization libraries.

## Project Setup

### 1. Create React App
```bash
npx create-react-app graduate-employment-viz
cd graduate-employment-viz
```

### 2. Install Required Dependencies
```bash
npm install recharts d3 papaparse
npm install @types/papaparse  # if using TypeScript
```

### 3. Project Structure
```
src/
├── components/
│   ├── EmploymentChart.js
│   ├── SalaryChart.js
│   ├── TopDegreesChart.js
│   ├── StatisticsCards.js
│   └── DataFilters.js
├── data/
│   └── GraduateEmploymentSurveyNTUNUSSITSMUSUSSSUTD.csv
├── utils/
│   └── dataProcessor.js
├── App.js
└── index.js
```

## Implementation

### 1. Data Processor (`utils/dataProcessor.js`)

```javascript
import Papa from 'papaparse';

export const loadCSVData = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const cleanData = results.data.filter(row => 
            row.year && row.university && row.employment_rate_overall
          ).map(row => ({
            ...row,
            year: parseInt(row.year),
            employment_rate_overall: parseFloat(row.employment_rate_overall),
            gross_monthly_median: parseInt(row.gross_monthly_median) || 0,
            gross_monthly_mean: parseInt(row.gross_monthly_mean) || 0
          }));
          resolve(cleanData);
        },
        error: reject
      });
    });
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
};

export const processDataForCharts = (data) => {
  // Group by university and year for employment trends
  const employmentTrends = {};
  data.forEach(row => {
    if (!employmentTrends[row.university]) {
      employmentTrends[row.university] = {};
    }
    employmentTrends[row.university][row.year] = row.employment_rate_overall;
  });

  // Calculate university averages
  const universityAverages = {};
  Object.keys(employmentTrends).forEach(uni => {
    const years = Object.keys(employmentTrends[uni]).map(Number);
    const rates = Object.values(employmentTrends[uni]);
    universityAverages[uni] = {
      avgEmploymentRate: rates.reduce((a, b) => a + b, 0) / rates.length,
      avgSalary: data
        .filter(row => row.university === uni && row.gross_monthly_median > 0)
        .reduce((sum, row) => sum + row.gross_monthly_median, 0) / 
        data.filter(row => row.university === uni && row.gross_monthly_median > 0).length
    };
  });

  return {
    employmentTrends,
    universityAverages,
    rawData: data
  };
};
```

### 2. Statistics Cards Component (`components/StatisticsCards.js`)

```javascript
import React from 'react';

const StatisticsCards = ({ data }) => {
  if (!data || data.length === 0) return null;

  const totalRecords = data.length;
  const avgEmploymentRate = data.reduce((sum, row) => sum + row.employment_rate_overall, 0) / data.length;
  const medianSalary = data
    .filter(row => row.gross_monthly_median > 0)
    .map(row => row.gross_monthly_median)
    .sort((a, b) => a - b)[Math.floor(data.length / 2)];

  const universityStats = {};
  data.forEach(row => {
    if (!universityStats[row.university]) {
      universityStats[row.university] = { count: 0, totalRate: 0 };
    }
    universityStats[row.university].count++;
    universityStats[row.university].totalRate += row.employment_rate_overall;
  });

  const topUniversity = Object.keys(universityStats).reduce((a, b) => 
    universityStats[a].totalRate / universityStats[a].count > 
    universityStats[b].totalRate / universityStats[b].count ? a : b
  );

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-value">{totalRecords.toLocaleString()}</div>
        <div className="stat-label">Total Records</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{avgEmploymentRate.toFixed(1)}%</div>
        <div className="stat-label">Avg Employment Rate</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">${medianSalary?.toLocaleString() || 'N/A'}</div>
        <div className="stat-label">Median Salary</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{topUniversity.split(' ')[0]}</div>
        <div className="stat-label">Top University</div>
      </div>
    </div>
  );
};

export default StatisticsCards;
```

### 3. Employment Trends Chart (`components/EmploymentChart.js`)

```javascript
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmploymentChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Process data for line chart
  const years = [...new Set(data.map(row => row.year))].sort();
  const universities = [...new Set(data.map(row => row.university))];

  const chartData = years.map(year => {
    const yearData = { year };
    universities.forEach(uni => {
      const uniData = data.find(row => row.year === year && row.university === uni);
      yearData[uni.split(' ')[0]] = uniData ? uniData.employment_rate_overall : 0;
    });
    return yearData;
  });

  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#ff00ff'
  ];

  return (
    <div className="chart-container">
      <h3>Employment Rate Trends by University</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            label={{ value: 'Year', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            label={{ value: 'Employment Rate (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value, name) => [`${value}%`, name]}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Legend />
          {universities.map((uni, index) => (
            <Line
              key={uni}
              type="monotone"
              dataKey={uni.split(' ')[0]}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmploymentChart;
```

### 4. Salary Distribution Chart (`components/SalaryChart.js`)

```javascript
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalaryChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Calculate average salary by university
  const universitySalaries = {};
  data.forEach(row => {
    if (row.gross_monthly_median > 0) {
      if (!universitySalaries[row.university]) {
        universitySalaries[row.university] = [];
      }
      universitySalaries[row.university].push(row.gross_monthly_median);
    }
  });

  const chartData = Object.keys(universitySalaries).map(uni => ({
    university: uni.split(' ')[0],
    avgSalary: universitySalaries[uni].reduce((a, b) => a + b, 0) / universitySalaries[uni].length,
    minSalary: Math.min(...universitySalaries[uni]),
    maxSalary: Math.max(...universitySalaries[uni])
  })).sort((a, b) => b.avgSalary - a.avgSalary);

  return (
    <div className="chart-container">
      <h3>Salary Distribution by University</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="university" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ value: 'Salary (SGD)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
            labelFormatter={(label) => `University: ${label}`}
          />
          <Legend />
          <Bar dataKey="avgSalary" fill="#8884d8" name="Average Salary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalaryChart;
```

### 5. Top Degrees Chart (`components/TopDegreesChart.js`)

```javascript
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TopDegreesChart = ({ data, limit = 10 }) => {
  if (!data || data.length === 0) return null;

  // Calculate average salary by degree
  const degreeSalaries = {};
  data.forEach(row => {
    if (row.gross_monthly_median > 0) {
      if (!degreeSalaries[row.degree]) {
        degreeSalaries[row.degree] = [];
      }
      degreeSalaries[row.degree].push(row.gross_monthly_median);
    }
  });

  const chartData = Object.keys(degreeSalaries)
    .map(degree => ({
      degree: degree.length > 40 ? degree.substring(0, 40) + '...' : degree,
      avgSalary: degreeSalaries[degree].reduce((a, b) => a + b, 0) / degreeSalaries[degree].length,
      count: degreeSalaries[degree].length
    }))
    .sort((a, b) => b.avgSalary - a.avgSalary)
    .slice(0, limit);

  return (
    <div className="chart-container">
      <h3>Top {limit} Highest Paying Degrees</h3>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number"
            tick={{ fontSize: 12 }}
            label={{ value: 'Average Salary (SGD)', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            type="category"
            dataKey="degree"
            tick={{ fontSize: 10 }}
            width={200}
          />
          <Tooltip 
            formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
            labelFormatter={(label) => `Degree: ${label}`}
          />
          <Legend />
          <Bar dataKey="avgSalary" fill="#82ca9d" name="Average Salary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopDegreesChart;
```

### 6. Data Filters Component (`components/DataFilters.js`)

```javascript
import React from 'react';

const DataFilters = ({ data, onFilterChange, filters }) => {
  if (!data || data.length === 0) return null;

  const universities = [...new Set(data.map(row => row.university))].sort();
  const years = [...new Set(data.map(row => row.year))].sort();

  const handleUniversityChange = (e) => {
    onFilterChange({ ...filters, university: e.target.value });
  };

  const handleYearRangeChange = (e) => {
    onFilterChange({ ...filters, maxYear: parseInt(e.target.value) });
  };

  return (
    <div className="filters-container">
      <h3>Filter Data</h3>
      <div className="filter-group">
        <label htmlFor="university-filter">University:</label>
        <select 
          id="university-filter" 
          value={filters.university} 
          onChange={handleUniversityChange}
        >
          <option value="all">All Universities</option>
          {universities.map(uni => (
            <option key={uni} value={uni}>{uni}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="year-range">Max Year: {filters.maxYear}</label>
        <input
          id="year-range"
          type="range"
          min={Math.min(...years)}
          max={Math.max(...years)}
          value={filters.maxYear}
          onChange={handleYearRangeChange}
        />
      </div>
    </div>
  );
};

export default DataFilters;
```

### 7. Main App Component (`App.js`)

```javascript
import React, { useState, useEffect } from 'react';
import { loadCSVData, processDataForCharts } from './utils/dataProcessor';
import StatisticsCards from './components/StatisticsCards';
import EmploymentChart from './components/EmploymentChart';
import SalaryChart from './components/SalaryChart';
import TopDegreesChart from './components/TopDegreesChart';
import DataFilters from './components/DataFilters';
import './App.css';

function App() {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    university: 'all',
    maxYear: 2023
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [rawData, filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await loadCSVData('/data/GraduateEmploymentSurveyNTUNUSSITSMUSUSSSUTD.csv');
      setRawData(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...rawData];

    if (filters.university !== 'all') {
      filtered = filtered.filter(row => row.university === filters.university);
    }

    if (filters.maxYear) {
      filtered = filtered.filter(row => row.year <= filters.maxYear);
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <div className="loading">Loading data...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Graduate Employment Survey Analysis</h1>
        <p>Interactive visualization of employment rates and salaries across Singapore universities</p>
      </header>

      <DataFilters 
        data={rawData} 
        onFilterChange={handleFilterChange} 
        filters={filters} 
      />

      <StatisticsCards data={filteredData} />

      <EmploymentChart data={filteredData} />
      
      <SalaryChart data={filteredData} />
      
      <TopDegreesChart data={filteredData} limit={15} />
    </div>
  );
}

export default App;
```

### 8. Styling (`App.css`)

```css
.App {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.filters-container {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.filter-group {
  margin: 15px 0;
}

.filter-group label {
  display: inline-block;
  width: 150px;
  font-weight: bold;
  margin-right: 10px;
}

.filter-group select,
.filter-group input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
  border-left: 4px solid #667eea;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.chart-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin: 20px 0;
}

.chart-container h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
  margin: 50px 0;
}

@media (max-width: 768px) {
  .App {
    padding: 10px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .filter-group label {
    width: 100%;
    margin-bottom: 5px;
  }
}
```

## Usage Instructions

1. **Place your CSV file** in the `public/data/` directory
2. **Install dependencies**: `npm install`
3. **Start development server**: `npm start`
4. **Open browser** to `http://localhost:3000`

## Features

- **Interactive filtering** by university and year range
- **Real-time statistics** updates based on filters
- **Responsive design** that works on mobile and desktop
- **Multiple chart types** for different data insights
- **Hover tooltips** with detailed information
- **Professional styling** with modern UI components

## Customization

- **Add new chart types** by creating new components
- **Modify color schemes** in the chart components
- **Add more filters** in the DataFilters component
- **Extend data processing** in the dataProcessor utility
- **Add animations** using CSS transitions or Framer Motion

This React implementation provides a solid foundation for creating interactive data visualizations with the graduate employment survey data.
