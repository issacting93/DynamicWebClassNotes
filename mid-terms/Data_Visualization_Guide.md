# Graduate Employment Survey Data Visualization Guide

## Dataset Overview

**File**: `GraduateEmploymentSurveyNTUNUSSITSMUSUSSSUTD.csv`  
**Size**: 1,449 records (1,448 data rows + 1 header)  
**Time Period**: 2013-2023 (11 years)  
**Universities**: NTU, NUS, SIT, SMU, SUSS, SUTD  

## Data Structure

### Columns (12 total)
1. **year** - Survey year (2013-2023)
2. **university** - University name
3. **school** - School/College within university
4. **degree** - Specific degree program
5. **employment_rate_overall** - Overall employment rate (%)
6. **employment_rate_ft_perm** - Full-time permanent employment rate (%)
7. **basic_monthly_mean** - Mean basic monthly salary (SGD)
8. **basic_monthly_median** - Median basic monthly salary (SGD)
9. **gross_monthly_mean** - Mean gross monthly salary (SGD)
10. **gross_monthly_median** - Median gross monthly salary (SGD)
11. **gross_mthly_25_percentile** - 25th percentile gross monthly salary (SGD)
12. **gross_mthly_75_percentile** - 75th percentile gross monthly salary (SGD)

## Data Visualization Strategies

### 1. **Time Series Analysis**

#### A. Employment Rate Trends
```javascript
// Chart Type: Line Chart
// X-axis: Year (2013-2023)
// Y-axis: Employment Rate (%)
// Multiple lines: Different universities or degree categories

// Key Questions to Answer:
// - Which universities have the highest employment rates over time?
// - How did COVID-19 affect employment rates?
// - Are there seasonal patterns in employment rates?
```

#### B. Salary Trends
```javascript
// Chart Type: Line Chart with Multiple Metrics
// X-axis: Year
// Y-axis: Salary (SGD)
// Lines: Mean, Median, 25th percentile, 75th percentile

// Key Questions:
// - How have salaries changed over time?
// - Which salary metric shows the most growth?
// - Are there salary gaps between universities?
```

### 2. **University Comparison**

#### A. Employment Rate Comparison
```javascript
// Chart Type: Bar Chart or Radar Chart
// X-axis: University
// Y-axis: Average Employment Rate (%)
// Grouping: By year or overall average

// Key Questions:
// - Which university has the highest employment rates?
// - How do employment rates vary by university?
// - Which university shows the most consistent performance?
```

#### B. Salary Comparison
```javascript
// Chart Type: Box Plot or Violin Plot
// X-axis: University
// Y-axis: Salary Distribution
// Show: Median, quartiles, outliers

// Key Questions:
// - Which university graduates earn the most?
// - What's the salary distribution for each university?
// - Are there salary outliers or anomalies?
```

### 3. **Degree Program Analysis**

#### A. Top Performing Degrees
```javascript
// Chart Type: Horizontal Bar Chart
// X-axis: Employment Rate or Salary
// Y-axis: Degree Program
// Filter: Top 20 programs

// Key Questions:
// - Which degree programs have the highest employment rates?
// - Which programs offer the highest salaries?
// - Are there any surprising high/low performers?
```

#### B. School Performance
```javascript
// Chart Type: Grouped Bar Chart
// X-axis: School/College
// Y-axis: Average Employment Rate or Salary
// Grouping: By university

// Key Questions:
// - Which schools consistently perform well?
// - Are there schools that excel in specific metrics?
// - How do different schools within the same university compare?
```

### 4. **Salary Distribution Analysis**

#### A. Salary Percentiles
```javascript
// Chart Type: Box Plot or Violin Plot
// X-axis: University or Degree Category
// Y-axis: Salary (SGD)
// Show: 25th, 50th, 75th percentiles

// Key Questions:
// - What's the salary range for each university?
// - Which universities have the widest salary distributions?
// - Are there clear salary tiers between universities?
```

#### B. Salary vs Employment Rate
```javascript
// Chart Type: Scatter Plot
// X-axis: Employment Rate (%)
// Y-axis: Median Salary (SGD)
// Color: University
// Size: Number of graduates

// Key Questions:
// - Is there a correlation between employment rate and salary?
// - Which universities offer the best balance of employment and salary?
// - Are there any outliers in the data?
```

## Implementation Guide

### 1. **Data Preparation**

#### A. Data Cleaning
```javascript
// Remove any missing values
// Convert percentage strings to numbers
// Standardize university names
// Create derived columns (e.g., salary range, degree category)

// Example data cleaning steps:
const cleanData = data.map(row => ({
  ...row,
  employment_rate_overall: parseFloat(row.employment_rate_overall),
  gross_monthly_median: parseInt(row.gross_monthly_median),
  salary_range: row.gross_mthly_75_percentile - row.gross_mthly_25_percentile
}));
```

#### B. Data Aggregation
```javascript
// Group by university and year
// Calculate averages, medians, totals
// Create time series data
// Generate summary statistics

// Example aggregation:
const universityStats = data.reduce((acc, row) => {
  const key = `${row.university}_${row.year}`;
  if (!acc[key]) {
    acc[key] = { university: row.university, year: row.year, programs: [] };
  }
  acc[key].programs.push(row);
  return acc;
}, {});
```

### 2. **Visualization Libraries**

#### A. **Chart.js** (Recommended for beginners)
```javascript
// Simple, responsive charts
// Good for basic visualizations
// Easy to implement

// Example implementation:
const ctx = document.getElementById('employmentChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: years,
    datasets: [{
      label: 'NTU Employment Rate',
      data: ntuEmploymentRates,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }
});
```

#### B. **D3.js** (Advanced)
```javascript
// Highly customizable
// Complex visualizations
// More learning curve

// Example implementation:
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);
```

#### C. **React + Recharts** (For React projects)
```javascript
// React-friendly
// Responsive charts
// Good for web applications

// Example implementation:
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

<LineChart width={800} height={400} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="year" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="employment_rate" stroke="#8884d8" />
</LineChart>
```

### 3. **Interactive Features**

#### A. **Filtering**
```javascript
// University filter
// Year range slider
// Degree category dropdown
// Salary range filter

// Example filter implementation:
const filteredData = data.filter(row => 
  row.university === selectedUniversity &&
  row.year >= startYear &&
  row.year <= endYear
);
```

#### B. **Drill-down Capabilities**
```javascript
// Click on university to see degree programs
// Click on year to see monthly trends
// Hover for detailed information
// Zoom and pan functionality
```

### 4. **Dashboard Layout**

#### A. **Key Metrics Cards**
```javascript
// Total graduates
// Average employment rate
// Median salary
// Top performing university
```

#### B. **Chart Sections**
```javascript
// Time series trends (top)
// University comparison (middle)
// Degree program analysis (bottom)
// Salary distribution (side panel)
```

## Specific Visualization Examples

### 1. **Employment Rate Trends by University**
```javascript
// Data: Group by university and year, calculate average employment rate
// Chart: Multi-line chart
// Colors: Different color for each university
// Interactive: Hover to see exact values, click to filter
```

### 2. **Salary Distribution by University**
```javascript
// Data: All salary data grouped by university
// Chart: Box plot or violin plot
// Show: Median, quartiles, outliers
// Interactive: Click to see specific degree programs
```

### 3. **Top 10 Highest Paying Degrees**
```javascript
// Data: Sort by median salary, take top 10
// Chart: Horizontal bar chart
// Show: University, degree, salary
// Interactive: Click to see employment rate
```

### 4. **University Performance Heatmap**
```javascript
// Data: Employment rate and salary by university and year
// Chart: Heatmap
// Colors: Green (high performance) to Red (low performance)
// Interactive: Click to see detailed breakdown
```

## Data Insights to Look For

### 1. **Trends Over Time**
- Employment rate changes
- Salary growth patterns
- University performance shifts
- Impact of external events (COVID-19, economic changes)

### 2. **University Comparisons**
- Which universities consistently perform well?
- Are there clear performance tiers?
- How do different universities compare in different metrics?

### 3. **Degree Program Analysis**
- Which programs offer the best employment prospects?
- What's the relationship between program type and salary?
- Are there any surprising high/low performers?

### 4. **Salary Analysis**
- What's the salary distribution across universities?
- Are there gender or program-based salary gaps?
- How do different salary metrics compare?

## Technical Implementation

### 1. **Data Loading**
```javascript
// Load CSV data
// Parse and clean data
// Create data structures for different visualizations
// Implement data caching for performance
```

### 2. **Chart Configuration**
```javascript
// Responsive design
// Color schemes
// Animation settings
// Tooltip customization
// Legend positioning
```

### 3. **Performance Optimization**
```javascript
// Data aggregation for large datasets
// Lazy loading for complex visualizations
// Caching for frequently accessed data
// Efficient rendering for real-time updates
```

## Next Steps

1. **Choose a visualization library** based on your technical level
2. **Start with simple charts** (line charts, bar charts)
3. **Add interactivity** gradually
4. **Test with different data subsets** to ensure accuracy
5. **Iterate and improve** based on user feedback

## Resources

- **Chart.js Documentation**: https://www.chartjs.org/docs/
- **D3.js Gallery**: https://observablehq.com/@d3/gallery
- **Recharts Documentation**: https://recharts.org/
- **Data Visualization Best Practices**: https://www.tableau.com/learn/articles/data-visualization

---

*Created: September 16, 2024*  
*Dataset: Graduate Employment Survey (2013-2023)*  
*Purpose: Guide for creating data visualizations from graduate employment survey data*
