export default class UserTopicService {

    async getAllByTopicId(topicId) { //TODO: falta token
        const url = `http://localhost:8081/api/v1/topics/${topicId}/access`;
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
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
    async deleteLogicAccess(userTopicId, userIdHeader){
        const url = `http://localhost:8081/api/v1/topics/access/${userTopicId}`;
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                userIdHeader: userIdHeader
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
    async createAccessToTopic(topicId, accessLevelId, userId, userIdHeader) { //TODO: falta token
        const url = `http://localhost:8081/api/v1/topics/access`;
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                userIdHeader: userIdHeader
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
    async updateByUserTopicId(userTopicId, accessLevelId, lastDate,favorite, userIdHeader){
        const url = `http://localhost:8081/api/v1/topics/access`;
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                userIdHeader: userIdHeader
                // Authorization: token,
            },
            body:JSON.stringify({
                userTopicId: userTopicId,
                accessLevelId: accessLevelId,
                lastDate: lastDate,
                favorite: favorite
            })
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status: ${response.status}`);
            }
            const updated = await response.json();
            console.log(`se actualizó correctamente el acceso para el usuario`+updated);
            console.log("confirmando actualizacion data:"+JSON.stringify(updated.data));

            return updated;
        } catch (error) {
            console.error('Error al actualizar un acceso:', error);
        }
    }
}