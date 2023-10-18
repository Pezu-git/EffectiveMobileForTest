import { config } from 'dotenv';
config();

const serverConfig = {
    API_URL: '/',
    PORT: process.env.PORT,
    HISTORY_SERVICE_HOST: process.env.HISTORY_SERVICE_HOST,
    HISTORY_SERVICE_PORT: process.env.HISTORY_SERVICE_PORT
};

export default serverConfig