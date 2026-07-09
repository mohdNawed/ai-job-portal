import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});

const fileFilter = (_, file, cb) => {
  const isPdf = file.mimetype === 'application/pdf' || path.extname(file.originalname).toLowerCase() === '.pdf';
  cb(isPdf ? null : new Error('Only PDF files are allowed'), isPdf);
};

export const uploadResume = multer({ storage, fileFilter, limits: { fileSize: 3 * 1024 * 1024 } });
