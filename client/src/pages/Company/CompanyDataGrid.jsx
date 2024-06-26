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
    const [companyId, setCompanyId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get('https://eanalytics.fly.dev/api/companies', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data && response.data.length > 0) {
                    const company = response.data[0];
                    setCompanyId(company._id);
                    setCompanyName(company.name);
                    const dataArray = Object.values(company.data);
                    const rows = dataArray[0].map((_, index) => {
                        const rowData = dataArray.map((column) => column[index]);
                        return {
                            id: index,
                            ...rowData.reduce((acc, value, i) => {
                                const columnName = Object.keys(company.data)[i];
                                acc[columnName] = value;
                                return acc;
                            }, {})
                        };
                    });
                    setCompanyData(rows);
                } else {
                    setCompanyData(null);
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    navigate('/forbidden');
                } else {
                    console.error('Error fetching company data:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [navigate]);

    const columns = companyData && companyData.length > 0 ? Object.keys(companyData[0]).map((columnName) => ({
        field: columnName,
        headerName: columnName,
        flex: 1,
        autoWidth: true,
    })) : [];

    const handleUploadPageRedirect = () => {
        navigate(`/companies/${companyId}/upload`);
    };

    const handleCreateCompanyRedirect = () => {
        navigate(`/create-company`);
    };

    const handleUpdateCompanyRedirect = () => {
        navigate(`/companies/${companyId}/update`);
    };

    const handleDeleteCompanyRedirect = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this company?');
        if (confirmed) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`https://eanalytics.fly.dev/api/companies/${companyId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                navigate(`/company`);
                window.location.reload();
            } catch (error) {
                console.error('Error deleting company:', error);
            }
        }
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
        <div>
            {loading ? (
                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                    <p className="text-xl font-semibold">Loading company data...</p>
                </div>
            ) : (
                <>
                    {companyData === null ? (
                        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="text-xl font-semibold">You don't have a company yet</p>
                                <button
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none ml-12"
                                    onClick={handleCreateCompanyRedirect}
                                >
                                    Create Company
                                </button>
                            </div>
                        </div>
                    ) : companyData.length === 0 ? (
                        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="text-xl font-semibold">Data not loaded</p>
                                <div className="flex space-x-4 mt-6">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none" onClick={handleUploadPageRedirect}>
                                        Upload your data
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none ml-15"
                                        onClick={handleUpdateCompanyRedirect}
                                    >
                                        Update your company
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none ml-15"
                                        onClick={handleDeleteCompanyRedirect}
                                    >
                                        Delete your company
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div >
                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-2xl font-bold">{companyName}</h1>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none ml-10"
                                        onClick={handleUploadPageRedirect}
                                    >
                                        Upload new data
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none ml-10"
                                        onClick={handleUpdateCompanyRedirect}
                                    >
                                        Update Company
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none ml-10"
                                        onClick={handleDeleteCompanyRedirect}
                                    >
                                        Delete Company
                                    </button>
                                </div>

                                <div className="mt-12">

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
                                </div>
                            </div>
                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                                <div className="mt-5">
                                    <LineChart />
                                </div>

                                <div className="mt-8">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none mt-15"
                                        onClick={handleLineChartByMonthsPageRedirect}
                                    >
                                        By Months
                                    </button>
                                </div>
                            </div>
                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                                <div className="mt-8">
                                    <BarChart />
                                </div>
                                <div className="mt-8">

                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                                        onClick={handleBarChartByMonthsPageRedirect}
                                    >
                                        By Months
                                    </button>
                                </div>
                            </div>
                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                                <div className="mt-8">
                                    <PieChart />
                                </div>
                                <div className="mt-8">

                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                                        onClick={handlePieChartByMonthsPageRedirect}
                                    >
                                        By Months
                                    </button>
                                </div>
                            </div>
                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

                                <div className="mt-8">
                                    <HistogramChart />
                                </div>
                                <div className="mt-8">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                                        onClick={handleHistogramChartByMonthsPageRedirect}
                                    >
                                        By Months
                                    </button>
                                </div>
                            </div>
                            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

                                <div className="mt-8">
                                    <AreaChart />
                                </div>
                                <div className="mt-8">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                                        onClick={handleAreaChartByMonthsPageRedirect}
                                    >
                                        By Months
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CompanyDataGrid;