import { 
  AccumulationChartComponent, 
  AccumulationSeriesCollectionDirective, 
  AccumulationSeriesDirective, 
  PieSeries, 
  AccumulationDataLabel, 
  Inject, 
  AccumulationLegend, 
  Tooltip 
} from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PieChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

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
        console.log(revenueData);

        if (isMounted) {
          const completeData = revenueData.map(revenue => {
            let yearMap = {};

            for (const [year, monthData] of Object.entries(revenue)) {
              yearMap[year] = Object.values(monthData).reduce((acc, total) => acc + total, 0);
            }

            return Object.entries(yearMap).map(([year, total]) => ({ x: year, y: total }));
          });

          setRevenueData(completeData.flat());
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

  return (
    <AccumulationChartComponent
      id="pie-chart"
      legendSettings={{ visible: true }}
      tooltip={{ enable: true }}
    >
      <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, Tooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          dataSource={revenueData}
          xName="x"
          yName="y"
          type="Pie"
          dataLabel={{
            visible: true,
            position: 'Outside',
            connectorStyle: { length: '10%' },
            name: 'y',
            template: '<div>${point.y}</div>',
            font: {
              fontWeight: '600',
              color: '#000000'
            }
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default PieChart;
