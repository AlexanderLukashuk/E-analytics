import express from 'express';
import multer from 'multer';
import CompanyController from '../controllers/company.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'application/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// const upload = multer({ dest: 'application/uploads/' });
const upload = multer({ storage: storage });

// CRUD
router.post('/create', authenticate, CompanyController.createCompany);
router.get('/', authenticate, CompanyController.getCompanyByUserId);
router.get('/:id', authenticate, CompanyController.geCompany);
router.put('/:id', authenticate, CompanyController.updateCompany);
router.delete('/:id', authenticate, CompanyController.deleteCompany);

// Upload file
router.put('/:id/upload', authenticate, upload.single('file'), CompanyController.uploadCompanyData);

// By user
router.get('/user/:userId', authenticate, CompanyController.getCompaniesByUserId);

// Revenue
router.get('/:id/revenue-by-month-and-year', authenticate, CompanyController.getRevenueByMonthAndYear);
router.get('/:id/revenue-by-category', authenticate, CompanyController.getRevenueByCategory);
router.get('/:id/revenue-by-city', authenticate, CompanyController.getRevenueByCity);

export default router;