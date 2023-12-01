export default class TagService {
//TODO:falta token 
    async getTags(sub) {
        const url = 'http://localhost:8081/api/v1/tags';
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: sub,
            }
        };
        console.log('sub en service: '+sub);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status: ${response.status}`);
            }
            const tags = await response.json();
            console.log("tags en service "+JSON.stringify(tags));
            console.log("tags data en service"+JSON.stringify(tags.data));
            return tags;
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    }
    async createTag(tag,sub) {
        console.log('entro al createTask()\n'+tag);
        const url = "http://localhost:8081/api/v1/tags";
        const options = {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: sub
            },
            body: JSON.stringify({ name: tag })
        };
        console.log('options', options);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const tags = await response.json();
            console.log("se creo tag: "+JSON.stringify(tags));
            console.log("se creo tag: "+JSON.stringify(tags.data));
            return tags;
        } catch (error) {
            console.error("Error al crear una nueva tarea SV:", error);
            throw error;
        }
    }  

    async updateTag(tagId, tag, sub) {
        console.log('entro al updateTask()\n'+tag+' ID'+tagId);
        const url = `http://localhost:8081/api/v1/tags/${tagId}`;
        console.log('url', url);
        const options = {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: sub
            },
            body: JSON.stringify(tag)
        };
        console.log('options', options);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const tags = await response.json();
            console.log("se actualizo tag: "+tags);
            console.log("se actualizo tag: "+JSON.stringify(tags.data));
            return tags.data;
        } catch (error) {
            console.error("Error al actualizar una nueva tarea SV:", error);
            throw error;
        }
    }

    async deleteTag(tagId, sub) {
        console.log('entro al deleteTask()\n'+tagId+' ID');
        const url = `http://localhost:8081/api/v1/tags/${tagId}`;
        const options = {
            method: "DELETE",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                Authorization: sub
            },
        };
        console.log('options', options);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const tags = await response.json();
            console.log("se elimino tag: "+tags);
            console.log("se elimino tag: "+JSON.stringify(tags.data));
            return tags.data;
        } catch (error) {
            console.error("Error al eliminar una nueva tarea SV:", error);
            throw error;
        }
    }
}