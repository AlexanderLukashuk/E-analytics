import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PieChart = () => {
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
        return Array.from({ length: 12 }, (_, index) => {
            // const month = index + 1;
            // return { month, total: monthlyData[month] || 0 };
            return { month: monthsNames[index], total: monthlyData[index + 1] || 0 };
        });
    });

    return (
        <div>
            <select value={selectedYear} onChange={handleYearChange}>
                {generateYearsRange(startYear, currentYear).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <AccumulationChartComponent
                id="pie-chart"
                height="420px"
                tooltip={{ enable: true }}
                legendSettings={{ visible: true }}
            >
                <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip]} />
                <AccumulationSeriesCollectionDirective>
                    {filteredRevenueData.map((revenue, index) => (
                        // <AccumulationSeriesDirective key={index} dataSource={revenue} xName="month" yName="total" name={`Компания ${index + 1}`} type="Pie" />
                        <AccumulationSeriesDirective key={index} dataSource={revenue} xName="month" yName="total" type="Pie" />
                    ))}
                </AccumulationSeriesCollectionDirective>
            </AccumulationChartComponent>
        </div>
    );
};

export default PieChart;