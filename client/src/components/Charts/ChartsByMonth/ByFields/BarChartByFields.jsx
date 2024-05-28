import { 
  ChartComponent, 
  SeriesCollectionDirective, 
  SeriesDirective, 
  Inject, 
  BarSeries, 
  Category, 
  Legend, 
  Tooltip 
} from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BarChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [chartType, setChartType] = useState('Year');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const currentYear = new Date().getFullYear();
  const startYear = 2000;

  const generateYearsRange = (start, end) => {
    let years = [];
    for (let year = start; year <= end; year++) {
      years.push(year.toString());
    }
    return years;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchRevenueData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/companies/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const companies = response.data;
        const endpointMap = {
          'Year': `revenue-by-month-and-year`,
          'Category': `revenue-by-category`,
          'City': `revenue-by-city`
        };

        const promises = companies.map(company => axios.get(`http://localhost:8080/api/companies/${company._id}/${endpointMap[chartType]}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }));

        const revenueResponses = await Promise.all(promises);
        const revenueData = revenueResponses.map(response => response.data);

        if (isMounted) {
          setRevenueData(revenueData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    if (userId) {
      fetchRevenueData();
    }

    return () => {
      isMounted = false;
    };
  }, [userId, selectedYear, chartType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const filteredRevenueData = revenueData.flatMap(companyData => {
    if (chartType === 'Year') {
      const yearlyData = companyData[selectedYear] || {};
      return Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        return { name: month, total: yearlyData[month] || 0 };
      });
    } else {
      if (Array.isArray(companyData)) {
        return companyData
          .filter(data => data.year === selectedYear)
          .map(data => ({
            name: chartType === 'Category' ? data.category : data.city,
            total: data.total
          }));
      } else {
        console.error('Data is not in expected format:', companyData);
        return [];
      }
    }
  });

  const maxRevenue = Math.max(...filteredRevenueData.map(data => data.total));
  const yAxisMax = isNaN(maxRevenue) ? 0 : maxRevenue + 10000;

  const xAxisTitle = chartType === 'Year' ? 'Month' : chartType === 'Category' ? 'Category' : 'City';

  return (
    <div>
      <select value={selectedYear} onChange={handleYearChange}>
        {generateYearsRange(startYear, currentYear).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <select value={chartType} onChange={handleChartTypeChange}>
        <option value="Year">Year</option>
        <option value="Category">Category</option>
        <option value="City">City</option>
      </select>
      <ChartComponent
        id="bar-chart"
        height="420px"
        primaryXAxis={{ valueType: 'Category', title: xAxisTitle }}
        primaryYAxis={{ valueType: 'Double', minimum: 0, maximum: yAxisMax, title: 'Revenue' }}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        legendSettings={{ visible: true }}
      >
        <Inject services={[BarSeries, Category, Legend, Tooltip]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={filteredRevenueData} xName="name" yName="total" type="Bar" width={2} marker={{ visible: true }} />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default BarChart;
