import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, Category, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LineChart = () => {
  const [revenueData, setRevenueData] = useState([]);
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
        const promises = companies.map(company => axios.get(`http://localhost:8080/api/companies/${company._id}/revenue-by-month-and-year`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }));

        const revenueResponses = await Promise.all(promises);
        const revenueData = revenueResponses.map(response => response.data);

        if (isMounted) {
          const yearsRange = generateYearsRange(startYear, currentYear);
          const completeData = revenueData.map(revenue => {
            let yearMap = {};
            yearsRange.forEach(year => {
              yearMap[year] = 0;
            });

            for (const [year, monthData] of Object.entries(revenue)) {
              yearMap[year] = Object.values(monthData).reduce((acc, total) => acc + total, 0);
            }

            return Object.entries(yearMap).map(([year, total]) => ({ year, total }));
          });

          setRevenueData(completeData);
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
    return <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">Loading...</div>;
  }

  const maxRevenue = Math.max(...revenueData.flatMap(data => data.map(d => d.total)));
  const yAxisMax = maxRevenue + 10000;

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={{ valueType: 'Category', title: 'Year', labelFormat: 'y' }}
      primaryYAxis={{ valueType: 'Double', title: 'Revenue', minimum: 0, maximum: yAxisMax }}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      legendSettings={{ visible: true }}
    >
      <Inject services={[LineSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {revenueData.map((revenue, index) => (
          <SeriesDirective key={index} dataSource={revenue} xName="year" yName="total" type="Line" width={2} marker={{ visible: true }} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
