import { 
  ChartComponent, 
  SeriesCollectionDirective, 
  SeriesDirective, 
  Inject, 
  LineSeries, 
  Category, 
  Legend, 
  Tooltip 
} from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LineChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
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
        const promises = companies.map(company => axios.get(`http://localhost:8080/api/companies/${company._id}/revenue-by-month-and-year`, {
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
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredRevenueData = revenueData.map(companyData => {
    const monthlyData = companyData[selectedYear] || {};
    const formattedData = Array.from({ length: 12 }, (_, index) => {
      return { month: monthsNames[index], total: monthlyData[index + 1] || 0 };
    });
    return formattedData;
  });

  const maxRevenue = Math.max(...filteredRevenueData.flatMap(data => data.map(d => d.total)));
  const yAxisMax = maxRevenue + 10000;

  return (
    <div>
      <select value={selectedYear} onChange={handleYearChange}>
        {generateYearsRange(startYear, currentYear).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <ChartComponent
        id="line-chart"
        height="420px"
        primaryXAxis={{ valueType: 'Category', title: 'Month' }}
        primaryYAxis={{ valueType: 'Double', minimum: 0, maximum: yAxisMax, title: 'Revenue' }}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        legendSettings={{ visible: true }}
      >
        <Inject services={[LineSeries, Category, Legend, Tooltip]} />
        <SeriesCollectionDirective>
          {filteredRevenueData.map((revenue, index) => (
            <SeriesDirective key={index} dataSource={revenue} xName="month" yName="total" type="Line" width={2} marker={{ visible: true }} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default LineChart;
