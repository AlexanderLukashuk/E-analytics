import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import CompanyService from '../services/company.service.js';

async function processCSVFile(companyId, fileName) {
    const filePath = path.join(__dirname, '../..', 'uploads', fileName);

    if (!fs.existsSync(filePath) || path.extname(fileName) !== '.csv') {
        console.error('Файл не найден или имеет неподдерживаемое расширение');
        return;
    }

    const readStream = fs.createReadStream(filePath);
    readStream.on('error', (err) => {
        console.error('Ошибка при чтении файла:', err);
    });

    readStream.pipe(csv())
        .on('data', async (row) => {
            try {
                const companyData = prepareDataForCompany(row);
                await CompanyService.uploadCompanyData(companyId, companyData);
            } catch (error) {
                console.error('Error while saving data:', error);
            }
        })
        .on('end', () => {
            console.log('CSV file readed.');
        });
}

const prepareDataForCompany = (csvRow) => {
    const data = {};
    for (const columnName in csvRow) {
        data[columnName] = parseFloat(csvRow[columnName]);
    }
    return data;
};

export default processCSVFile;
