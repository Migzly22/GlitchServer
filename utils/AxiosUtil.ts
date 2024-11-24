import axios from 'axios';
import { AxiosParams } from '../types/utilTypes';


export default function AxiosUtil () {
    
    async function GET<T>({link,params,headers,} : AxiosParams) {
        try {
            const response = await axios.get<T>(link, {
            params,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            });
            return response.data;
        } catch (error: any) {
            console.error('GET Error:', error.message);
            throw error; // Re-throw error for caller handling
        }
    }
    async function POST<T>({link,params,headers,body} : AxiosParams) {
        try {
            const response = await axios.post<T>(link, body, {
            params,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            });
            return response.data;
        } catch (error: any) {
            console.error('POST Error:', error.message);
            throw error; // Re-throw error for caller handling
        }
    }
    async function PUT<T>({link,params,headers,body} : AxiosParams) {
        try {
            const response = await axios.post<T>(link, body, {
            params,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            });
            return response.data;
        } catch (error: any) {
            console.error('POST Error:', error.message);
            throw error; // Re-throw error for caller handling
        }
    }
    async function DELETE<T>({link,params,headers,} : AxiosParams) {
        try {
            const response = await axios.delete<T>(link, {
            params,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            });
            return response.data;
        } catch (error: any) {
            console.error('GET Error:', error.message);
            throw error; // Re-throw error for caller handling
        }
    }
    
    return { GET, POST, PUT, DELETE}
}
