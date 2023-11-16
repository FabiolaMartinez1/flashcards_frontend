export default class TopicService {
    async getTopics() { //TODO: falta token
        const url = `http://localhost:8081/api/v1/topic`; //?shared=${shared}&?favorite=${favorite}
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
            console.error('Error al obtener los temas:', error);
        }
    }
    // async createTask() {
    //     console.log('entro al createTask()\n'+task);
    //     const url = "http://localhost:8081/api/v1/task";
    //     const options = {
    //         method: "POST",
    //         headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: token
    //         },
    //         body: JSON.stringify(task)
    //     };
    //     console.log('options', options);
    //     try {
    //         const response = await fetch(url, options);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error: Status ${response.status}`);
    //         }
    //         const data = await response.json();
    //         // router.push({ name: 'TaskList' });
    //         return data;
    //     } catch (error) {
    //         console.error("Error al crear una nueva tarea SV:", error);
    //         throw error;
    //     }
    // }  
    // async updateTask() {
    //     console.log('entro al updateTask()\n'+task+' ID'+taskId);
    //     const url = `http://localhost:8081/api/v1/task/${taskId}`;
    //     console.log('url', url);
    //     const options = {
    //         method: "PUT",
    //         headers: {
    //         "Content-Type": "application/json",
    //         Authorization: token
    //         },
    //         body: JSON.stringify(task)
    //     };
    //     try {
    //         const response = await fetch(url, options);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error: Status ${response.status}`);
    //         }
    //         const data = await response.json();
    //         console.log('Se actualizo data', data);
    //         return data;
    //     } catch (error) {
    //         console.error("Error al actualizar la tarea:", error);
    //         throw error;
    //     }
    // }
    async deleteTopic(topicId) {
        console.log('entro al delete()\n'+topicId);
        const url = `http://localhost:8081/api/v1/topic/${topicId}`;
        const options = {
            method: "DELETE",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                // Authorization: token
            },
        };
        console.log('options', options);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const data = await response.json();
            console.log("se elimino: "+data);
            console.log("se elimino: "+data.message);
            
            return data;
        } catch (error) {
            console.error("Error al eliminar una nueva tarea SV:", error);
            throw error;
        }
    }
}