export default class UserTopicService {

    async getAllByTopicId(topicId) { //TODO: falta token
        const url = `http://localhost:8081/api/v1/topics/${topicId}/shared`;
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
            console.log(`usuarios con acceso al topic ${topicId} en service `+topics.data);
            console.log("obtuvo usuarios con acceso"+JSON.stringify(topics.data));

            return topics.data;
        } catch (error) {
            console.error('Error al obtener los usuarios con acceso:', error);
        }
    }
}