import axios from 'axios';

export async function AGET(link : string, headers ?: Record<string, string>) {
    try {
        const response = await axios.get(link, {
            headers:  {
                'Content-Type': 'application/json',
                ...(headers || {})
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function APOST(link : string, body : Object, headers ?: Record<string, string>) {
    try {
        const response = await axios.put(link, body, {
            headers:  {
                'Content-Type': 'application/json',
                ...(headers || {})
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function APUT(link : string, body : Object, headers ?: Record<string, string>) {
    try {
        const response = await axios.post(link, body, {
            headers:  {
                'Content-Type': 'application/json',
                ...(headers || {})
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function ADELETE(link : string, headers ?: Record<string, string>) {
    try {
        const response = await axios.get(link, {
            headers:  {
                'Content-Type': 'application/json',
                ...(headers || {})
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error;
    }
}

