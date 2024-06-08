import React from "react";
import {
  Buttons,
  ButtonsRow,
  Container,
  Icon,
  Panel,
  PanelContent,
  PanelHeader,
  WelcomeHeader,
  Dashboard,
  ButtonIcon,
  TextInput,
  ButtonLink,
  UploadDatasetButton,
  ViewSelect,
  DataLoadedMessage,
} from "../components/index.jsx";
import { FiTrash, FiUpload } from "react-icons/fi";
import { Loader } from "../components/layout/Loader.jsx";
import { generateDashboard, generatePrompt } from "../openai/analyze.ts";
import { IDashboard, IDataset, ISettings } from "../types.tsx";
import { isDataValid, parseData, stringifyData } from "../utils/parseData.ts";
import gtag from "../lib/gtag.ts";

export default function DropFile() {
  const [view, setView] = React.useState("dashboard");
  const [settings, setSettings] = React.useState<ISettings>({
    apikey: "",
    sampleRows: 10,
    model: "",
  });
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState<IDataset>();
  const [userContext, setUserContext] = React.useState<string>("");

  const [currentSampleIndex, setCurrentSampleIndex] = React.useState(-1);
  const [dashboard, setDashboard] = React.useState<IDashboard | null>();
  const [showSettings, setShowSettings] = React.useState(false);

  React.useEffect(() => {
    const key = process.env.REACT_APP_API;
    const config = {
      apikey: key,
      sampleRows: 100,
      model: "gpt-3.5-turbo",
    };
    if (config) {
      setSettings(config as ISettings);
    }
  }, []);

  const handleAnalyze = React.useCallback(() => {
    if (!settings.apikey) {
      setShowSettings(true);
    } else if (data) {
      setLoading(true);
      generateDashboard(
        data,
        userContext,
        settings.sampleRows,
        settings.apikey,
        settings.model
      )
        .then((response) => {
          setDashboard(response.dashboard);
          setLoading(false);
        })
        .catch((err) => {
          setDashboard(null);
          setLoading(false);
        });
    }
  }, [data, userContext, settings]);

  // console.log(dashboard, stringifyData(data || []));

  const handleClear = React.useCallback(() => {
    setData(undefined);
    setDashboard(null);
    setUserContext("");
  }, []);

  const handleSettingsChange = React.useCallback((settings: ISettings) => {
    localStorage.setItem("analyzer-settings", JSON.stringify(settings));
    setSettings(settings);
    setShowSettings(false);
  }, []);

  const handleShowSettings = React.useCallback(() => {
    setShowSettings(true);
  }, []);

  const handleCloseSettings = React.useCallback(() => {
    setShowSettings(false);
  }, []);

  const handleDatasetChange = React.useCallback((dataset: string) => {
    gtag.report("event", "upload_data", {
      event_category: "settings",
      event_label: "uploaded",
    });
    setData(parseData(dataset));
    setDashboard(null);
  }, []);

  const handleClick = React.useCallback(() => {
    setUserContext(" ");
  }, []);

  const handleClearContext = React.useCallback(() => {
    setUserContext("");
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <>
        <Container>
          <Panel>
            <PanelHeader>
              <WelcomeHeader
                title="AI Data Dashboard"
                subtitle={<>Upload CSV dataset</>}
              />

              <ButtonsRow>
                <UploadDatasetButton onUpload={handleDatasetChange} />
                <button
                  className="trash ml-10"
                  disabled={!data}
                  outline
                  onClick={handleClear}
                >
                  <FiTrash />
                </button>
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none "
                  disabled={!data && !!settings?.apikey}
                  onClick={handleAnalyze}
                >
                  {settings?.apikey && dashboard && data ? <FiUpload /> : null}{" "}
                  {(() => {
                    return dashboard && data ? "Re-analyze" : "Analyze";
                  })()}
                </button>
              </ButtonsRow>
            </PanelHeader>
            <PanelContent></PanelContent>
          </Panel>
          <Panel>
            <PanelContent>
              <ViewSelect value={view} onChange={setView} />
              {dashboard && data && view === "dashboard" ? (
                <Dashboard data={data} dashboard={dashboard} />
              ) : null}
            </PanelContent>
          </Panel>
        </Container>
        {loading && <Loader />}
      </>
    </div>
  );
}
