import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationLegend,
  AccumulationTooltip,
  AccumulationDataLabel
} from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PieChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [chartType, setChartType] = useState('Category');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const currentYear = new Date().getFullYear();
  const startYear = 2000;

  const monthsNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'Oktober', 'November', 'December'
  ];

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
          'Category': `revenue-by-category`,
          'City': `revenue-by-city`,
          'Date': `revenue-by-month-and-year`
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
    if (chartType === 'Date') {
      const dateData = companyData[selectedYear] || {};
      return Object.keys(dateData).map(month => ({
        name: monthsNames[month],
        value: dateData[month]
      }));
    } else if (Array.isArray(companyData)) {
      return companyData
        .filter(data => data.year === selectedYear)
        .map(data => ({
          name: chartType === 'Category' ? data.category : data.city,
          value: data.total
        }));
    } else {
      console.error('Data is not in expected format:', companyData);
      return [];
    }
  });

  return (
    <div>
      <select value={selectedYear} onChange={handleYearChange}>
        {generateYearsRange(startYear, currentYear).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <select value={chartType} onChange={handleChartTypeChange}>
        <option value="Category">Category</option>
        <option value="City">City</option>
        <option value="Date">Date</option>
      </select>
      <AccumulationChartComponent
        id="pie-chart"
        height="420px"
        legendSettings={{ visible: true }}
        tooltip={{ enable: true }}
      >
        <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip, AccumulationDataLabel]} />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            dataSource={filteredRevenueData}
            xName="name"
            yName="value"
            type="Pie"
            dataLabel={{
              visible: true,
              position: 'Outside',
              connectorStyle: { length: '10%' }
            }}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  );
};

export default PieChart;
