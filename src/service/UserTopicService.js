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
    async deleteLogicAccess(topicId, userTopicId){
        const url = `http://localhost:8081/api/v1/topics/${topicId}/shared/${userTopicId}`;
        const options = {
            method: 'PUT',
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
            const deleted = await response.json();
            console.log(`se eliminó correctamente el acceso para el usuario`+deleted);
            console.log("confirmando eliminacion data:"+JSON.stringify(deleted.data));

            return deleted;
        } catch (error) {
            console.error('Error al eliminar logicamente un acceso:', error);
        }
    }
    async createAccessToTopic(topicId, accessLevelId, userId) { //TODO: falta token
        const url = `http://localhost:8081/api/v1/topics/shared`;
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                // Authorization: token,
            },
            body:JSON.stringify({
                topicId: topicId,
                accessLevelId: accessLevelId,
                userId: userId
            })
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status: ${response.status}`);
            }
            const access = await response.json();
            console.log(`nuevo usuario con acceso al topic ${topicId} en userTopicService `+access.data);
            console.log("obtuvo usuarios con acceso"+JSON.stringify(access.data));

            return access.data;
        } catch (error) {
            console.error('Error al obtener los usuarios con acceso:', error);
        }
    }
}