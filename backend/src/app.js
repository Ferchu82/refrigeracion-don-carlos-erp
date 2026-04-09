import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Refrigeración Don Carlos ERP Backend'
  });
});

export default app;
