import { json } from "express";
import CompanyService from "../application/company.service.js";
import CompanyRepository from "../mongodb/company.repository.js";

const CompanyController = {
    async createCompany(req, res) {
        try {
            const userId = req.user.userId;
            const existingCompany = await CompanyService.getCompaniesByUserId(userId);
            if (existingCompany.length > 0) {
                return res.status(400).json({ message: 'You can create only one company' });
            }

            const newCompany = await CompanyService.createCompany({ ...req.body, ownerId: userId });
            res.status(201).json(newCompany);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCompanyByUserId(req, res) {
        try {
            const userId = req.user.userId;
            const companies = await CompanyService.getCompaniesByUserId(userId);
            res.json(companies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async geCompany(req, res) {
        try {
            const companyId = req.params.id;
            const company = await CompanyService.getCompanyById(companyId);
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.json(company);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCompanyData(req, res) {
        try {
            const companyId = req.params.id;
            const company = await CompanyService.getCompanyById(companyId);
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.json(company.data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async uploadCompanyData(req, res) {
        try {
            const companyId = req.params.id;
            const filePath = req.file.path;

            const result = await CompanyService.uploadCSVData(companyId, req.file.filename, filePath);

            res.json({ message: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateCompany(req, res) {
        try {
            const companyId = req.params.id;
            const updatedCompany = await CompanyService.updateCompany(companyId, req.body);
            if (!updatedCompany) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.json(updatedCompany);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteCompany(req, res) {
        try {
            const companyId = req.params.id;
            const deletedCompany = await CompanyService.deleteCompany(companyId);
            if (!deletedCompany) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.json({ message: 'Company created successfully!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getRevenueByMonth(req, res) {
        const companyId = req.params.id;
        try {
            const revenueData = await CompanyService.getRevenueByMonth(companyId);
            res.json(revenueData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getRevenueByMonthAndYear(req, res) {
        const companyId = req.params.id;
        try {
            const revenueData = await CompanyService.getRevenueByMonthAndYear(companyId);
            res.json(revenueData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCompaniesByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const companies = await CompanyService.getCompaniesByUserId(userId);
            res.json(companies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getRevenueByCategory(req, res) {
        const companyId = req.params.id;
        try {
            const company = await CompanyRepository.findCompanyById(companyId);
            if (!company) throw new Error("Company not found");

            const revenueData = company.data['Total'];
            const categories = company.data['Category'];
            const dates = company.data['Date'];
            const revenueByCategoryAndYear = {};

            revenueData.forEach((total, index) => {
                const category = categories[index];
                const date = new Date(dates[index]);
                const year = date.getFullYear();
                if (!revenueByCategoryAndYear[year]) {
                    revenueByCategoryAndYear[year] = {};
                }
                if (!revenueByCategoryAndYear[year][category]) {
                    revenueByCategoryAndYear[year][category] = 0;
                }
                revenueByCategoryAndYear[year][category] += total;
            });

            const result = Object.entries(revenueByCategoryAndYear).flatMap(([year, categories]) =>
                Object.keys(categories).map(category => ({
                    year,
                    category,
                    total: categories[category]
                }))
            );

            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getRevenueByCity(req, res) {
        const companyId = req.params.id;
        try {
            const company = await CompanyRepository.findCompanyById(companyId);
            if (!company) throw new Error("Company not found");

            const revenueData = company.data['Total'];
            const cities = company.data['City'];
            const dates = company.data['Date'];
            const revenueByCityAndYear = {};

            revenueData.forEach((total, index) => {
                const city = cities[index];
                const date = new Date(dates[index]);
                const year = date.getFullYear();
                if (!revenueByCityAndYear[year]) {
                    revenueByCityAndYear[year] = {};
                }
                if (!revenueByCityAndYear[year][city]) {
                    revenueByCityAndYear[year][city] = 0;
                }
                revenueByCityAndYear[year][city] += total;
            });

            const result = Object.entries(revenueByCityAndYear).flatMap(([year, cities]) =>
                Object.keys(cities).map(city => ({
                    year,
                    city,
                    total: cities[city]
                }))
            );

            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default CompanyController;