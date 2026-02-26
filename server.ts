import express from 'express';
import { createServer as createViteServer } from 'vite';
import { DAO } from './src/db';
import { Student, Module, StudentModuleData } from './src/data';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize DB
  await DAO.init();

  app.use(express.json());

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  // API Routes
  app.get('/api/data', async (req, res) => {
    try {
      const students = await DAO.getStudents();
      const modules = await DAO.getModules();
      const grades = await DAO.getGrades();
      res.json({ students, modules, grades });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

  app.post('/api/students', async (req, res) => {
    try {
      const student: Student = req.body;
      await DAO.saveStudent(student);
      res.json({ success: true });
    } catch (error) {
      console.error('Error saving student:', error);
      res.status(500).json({ error: 'Failed to save student' });
    }
  });

  app.post('/api/modules', async (req, res) => {
    try {
      const module: Module = req.body;
      await DAO.saveModule(module);
      res.json({ success: true });
    } catch (error) {
      console.error('Error saving module:', error);
      res.status(500).json({ error: 'Failed to save module' });
    }
  });

  app.post('/api/grades/:studentId/:moduleCode', async (req, res) => {
    try {
      const { studentId, moduleCode } = req.params;
      const data: StudentModuleData = req.body;
      await DAO.saveGrade(studentId, moduleCode, data);
      res.json({ success: true });
    } catch (error) {
      console.error('Error saving grade:', error);
      res.status(500).json({ error: 'Failed to save grade' });
    }
  });

  const distPath = path.resolve(__dirname, 'dist');
  const indexHtmlPath = path.join(distPath, 'index.html');

  if (fs.existsSync(indexHtmlPath)) {
    console.log('Serving static files from dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(indexHtmlPath);
    });
  } else {
    console.log('Starting Vite middleware for development');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
