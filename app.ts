import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import ServerUtils from './utils/SeverUtil';

dotenv.config();

ServerUtils.init(6000)