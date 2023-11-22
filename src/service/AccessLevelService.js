export default class AccessLevelService {

    async getAllAccessLevels() {
        // const BASE_URL = 'http://localhost:8081';
        const url = `http://localhost:8081/api/v1/accessLevels`;
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
            }
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status: ${response.status}`);
            }
            const topics = await response.json();
            console.log("niveles de accesos en AccessLevelService.js "+topics.data);
            console.log("obtuvo niveles de acceso"+JSON.stringify(topics.data));

            return topics.data;
        } catch (error) {
            console.error('Error al obtener los niveles de acceso:', error);
        }
    }
}