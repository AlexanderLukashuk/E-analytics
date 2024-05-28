import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import LineChart from '../../components/Charts/PredictionLineChart.jsx';
import BarChart from '../../components/Charts/BarChart.jsx';
import PieChart from '../../components/Charts/PieChart.jsx';
import HistogramChart from '../../components/Charts/HistogramChart.jsx';
import AreaChart from '../../components/Charts/AreaChart.jsx';

const CompanyDataGrid = () => {
    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const { companyId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/companies/${companyId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data && typeof response.data.data === 'object') {
                    setCompanyName(response.data.name);
                    const dataArray = Object.values(response.data.data);
                    const rows = dataArray[0].map((_, index) => {
                        const rowData = dataArray.map((column) => column[index]);
                        return {
                            id: index,
                            ...rowData.reduce((acc, value, i) => {
                                const columnName = Object.keys(response.data.data)[i];
                                acc[columnName] = value;
                                return acc;
                            }, {})
                        };
                    });
                    setCompanyData(rows);
                } else {
                    console.error('Error fetching company data: Data is not in the expected format');
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [companyId]);

    const columns = companyData.length > 0 ? Object.keys(companyData[0]).map((columnName) => ({
        field: columnName,
        headerName: columnName,
        flex: 1,
        autoWidth: true,
    })) : [];

    const handleUploadPageRedirect = () => {
        navigate(`/companies/${companyId}/upload`);
    };

    const handleLineChartByMonthsPageRedirect = () => {
        navigate(`/linechart-by-months`);
    }
    
    const handleBarChartByMonthsPageRedirect = () => {
        navigate(`/barchart-by-months`);
    }
    
    const handlePieChartByMonthsPageRedirect = () => {
        navigate(`/piechart-by-months`);
    }
    
    const handleHistogramChartByMonthsPageRedirect = () => {
        navigate(`/histogramchart-by-months`);
    }
    
    const handleAreaChartByMonthsPageRedirect = () => {
        navigate(`/areachart-by-months`);
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            {loading ? (
                <p className="text-xl font-semibold">Loading company data...</p>
            ) : (
                <>
                    {companyData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-xl font-semibold">Company data not loaded</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none" onClick={handleUploadPageRedirect}>
                                Upload data
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold">{companyName}</h1>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                                    onClick={handleUploadPageRedirect}
                                >
                                    Upload new data
                                </button>
                            </div>

                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    columnHeaderHeight={25}
                                    rowHeight={35}
                                    rows={companyData}
                                    columns={columns}
                                    sx={{
                                        '& .MuiDataGrid-root': {
                                            color: 'grey.300',
                                            border: 'none',
                                        },
                                        '& .MuiDataGrid-cell': {
                                            color: 'black',
                                            borderBottom: '1px solid grey.800 !important',
                                        },
                                        '& .MuiDataGrid-columnHeaders': {
                                            borderBottom: '1px solid grey.800 !important',
                                        },
                                        '& .MuiDataGrid-columnSeparator': {
                                            visibility: 'hidden',
                                        },
                                    }}
                                />
                            </div>
                            <div className="mt-8">
                                <LineChart />
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                                    onClick={handleLineChartByMonthsPageRedirect}
                                >
                                    By Months
                                </button>
                            </div>
                            <div className="mt-8">
                                <BarChart />
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                                    onClick={handleBarChartByMonthsPageRedirect}
                                >
                                    By Months
                                </button>
                            </div>
                            <div className="mt-8">
                                <PieChart />
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                                    onClick={handlePieChartByMonthsPageRedirect}
                                >
                                    By Months
                                </button>
                            </div>
                            <div className="mt-8">
                                <HistogramChart />
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                                    onClick={handleHistogramChartByMonthsPageRedirect}
                                >
                                    By Months
                                </button>
                            </div>
                            <div className="mt-8">
                                <AreaChart />
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                                    onClick={handleAreaChartByMonthsPageRedirect}
                                >
                                    By Months
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CompanyDataGrid;
