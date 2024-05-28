import React from 'react';
import { useParams } from 'react-router-dom';
import UploadCSV from './UploadCSV';

const CompanyCSV = () => {
    const { companyId } = useParams();
    return <UploadCSV companyId={companyId} />;
};

export default CompanyCSV;
