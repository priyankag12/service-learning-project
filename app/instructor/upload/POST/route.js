import nextConnect from 'next-connect';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';

// Set up multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);  // Rename file with timestamp
    },
  }),
});

// Initialize next-connect to handle multiple methods
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Use multer middleware for POST requests
apiRoute.use(upload.single('file'));

// Handle POST request for file upload
apiRoute.post((req, res) => {
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ message: 'File uploaded successfully', fileUrl });
});

// Handle GET request to list uploaded files
apiRoute.get(async (req, res) => {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const files = await fs.readdir(uploadsDir);
    const fileList = files.map((file) => ({
      fileName: file,
      fileUrl: `/uploads/${file}`,
    }));
    res.status(200).json(fileList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
});

export const config = {
  api: {
    bodyParser: false,  // Disable Next.js default body parser
  },
};

export default apiRoute;
