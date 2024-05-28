import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { Ecommerce, DataInput, DropFile, ChatAI } from "./pages/index.tsx";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import { BsMessenger, BsTelegram } from "react-icons/bs";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIns.jsx";
import CreateCompany from "./pages/Company/CreateCompany.jsx";
import CompanyList from "./pages/Company/CompanyList.jsx";
import CompanyCSV from "./pages/Company/CompanyCSV.jsx";
import CompanyDataGrid from "./pages/Company/CompanyDataGrid.jsx";
import BarChart from "./components/Charts/BarChart.jsx";
import PieChart from "./components/Charts/PieChart.jsx";
import HistogramChart from "./components/Charts/HistogramChart.jsx";
import AreaChart from "./components/Charts/AreaChart.jsx";
import LineChartByMonth from "./components/Charts/ChartsByMonth/LineChartByMonth.jsx";
import BarChartByMonths from "./components/Charts/ChartsByMonth/BarChartByMonths.jsx";
import PieChartByMonths from "./components/Charts/ChartsByMonth/PieChartByMonths.jsx";
import HistogramChartByMonths from "./components/Charts/ChartsByMonth/HistogramChartByMonths.jsx";
import AreaChartByMonths from "./components/Charts/ChartsByMonth/AreaChartByMonths.jsx";
import LineChart from "./components/Charts/LineChart.jsx";
import BarChartByFields from "./components/Charts/ChartsByMonth/ByFields/BarChartByFields.jsx";
import PieChartByFields from "./components/Charts/ChartsByMonth/ByFields/PieChartByFields.jsx";
import PredictionLineChart from "./components/Charts/PredictionLineChart.jsx";
import Forbidden from "./pages/HttpStatuses/Forbidden.jsx";
import ProtectedRoute from "./components/Exceptions/ProtectedRoute.jsx";
import NotFound from "./pages/HttpStatuses/NotFound.jsx";
import Landing from "./pages/Landing.tsx";
import UpdateCompany from "./pages/Company/UpdateCompany.jsx";

const Layout = ({ children }) => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    setChatModalOpen,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  if (isAuthPage) {
    return children;
  }

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="ChatBot" position="Top">
            <button
              type="button"
              onClick={() => setChatModalOpen(true)}
              style={{
                background: currentColor,
                borderRadius: "50%",
                marginBottom: "8px",
              }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <BsMessenger />
            </button>
          </TooltipComponent>
          <TooltipComponent content="TelegramBot" position="Top">
            <a href="https://t.me/eanalitics_bot">
              <button
                type="button"
                style={{
                  background: currentColor,
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <BsTelegram />
              </button>
            </a>
          </TooltipComponent>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white zIndex-4">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg zIndex-4">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
              : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/ecommerce"
                  element={
                    <ProtectedRoute>
                      <CompanyDataGrid />
                    </ProtectedRoute>
                  }
                />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route
                  path="/chatai"
                  element={
                    <ProtectedRoute>
                      <ChatAI />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/data-input"
                  element={
                    <ProtectedRoute>
                      <DataInput />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/AI-dashboards"
                  element={
                    <ProtectedRoute>
                      <DropFile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-company"
                  element={
                    <ProtectedRoute>
                      <CreateCompany />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/companies"
                  element={
                    <ProtectedRoute>
                      <CompanyList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/company"
                  element={
                    <ProtectedRoute>
                      <CompanyDataGrid />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/companies/:companyId/upload"
                  element={
                    <ProtectedRoute>
                      <CompanyCSV />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/companies/:id/update"
                  element={
                    <ProtectedRoute>
                      <UpdateCompany />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/linechart"
                  element={
                    <ProtectedRoute>
                      <LineChart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/barchart"
                  element={
                    <ProtectedRoute>
                      <BarChart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/piechart"
                  element={
                    <ProtectedRoute>
                      <PieChart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/histogramchart"
                  element={
                    <ProtectedRoute>
                      <HistogramChart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/areachart"
                  element={
                    <ProtectedRoute>
                      <AreaChart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/linechart-by-months"
                  element={
                    <ProtectedRoute>
                      <LineChartByMonth />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/barchart-by-months"
                  element={
                    <ProtectedRoute>
                      <BarChartByMonths />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/piechart-by-months"
                  element={
                    <ProtectedRoute>
                      <PieChartByMonths />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/histogramchart-by-months"
                  element={
                    <ProtectedRoute>
                      <HistogramChartByMonths />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/areachart-by-months"
                  element={
                    <ProtectedRoute>
                      <AreaChartByMonths />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/testbarchart"
                  element={
                    <ProtectedRoute>
                      <BarChartByFields />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/testpiechart"
                  element={
                    <ProtectedRoute>
                      <PieChartByFields />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/prediction"
                  element={
                    <ProtectedRoute>
                      <PredictionLineChart />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
