import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { ILoan } from '../interfaces/loan.js';
import fs from 'fs/promises';
import path from 'path';

const loansFilePath = path.join(__dirname, '../data/loans.json');

const Transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
