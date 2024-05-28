import React from 'react';
import { useParams } from 'react-router-dom';
import UploadCSV from './UploadCSV';
import DropFileInput from "../../components/DropFileInput.tsx";

const CompanyCSV = () => {
    const { companyId } = useParams();
    return <UploadCSV companyId={companyId} />;
};

export default CompanyCSV;