export default class TopicService {
    async getTopic(shared,favorite) { //TODO: falta token
        const url = `http://localhost:8080/api/v1/topics?shared=${shared}&?favorite=${favorite}`;
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
            console.log("contratos en service "+topics.data);
            console.log("obtuvo contratos"+JSON.stringify(topics.data));

            return topics.data;
        } catch (error) {
            console.error('Error al obtener los contratos:', error);
        }
    }
}