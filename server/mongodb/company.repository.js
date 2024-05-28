import Company from '../mongodb/models/company.js';

const CompanyRepository = {
    async createCompany(companyData) {
        return Company.create(companyData);
    },

    async findCompanyById(companyId) {
        return Company.findById(companyId);
    },

    async findCompaniesByUserId(userId) {
        return Company.find({ ownerId: userId });
    },

    async updateCompany(companyId, companyData) {
        return Company.findByIdAndUpdate(companyId, companyData, { new: true });
    },

    async deleteCompany(companyId) {
        return Company.findByIdAndDelete(companyId);
    },
};

export default CompanyRepository;