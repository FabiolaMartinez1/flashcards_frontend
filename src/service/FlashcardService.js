export default class FlashcardService {

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

    async createPersonalFlashcard(sub, topicId, question, answer) {
        console.log('entro al createTcreatePersonalFlashcardask()\n');
        const url = "http://localhost:8081/api/v1/flashcards/personal";
        const options = {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: sub
            },
            body: JSON.stringify({ topicId: topicId, question: question, answer: answer })
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const flashcard = await response.json();
            console.log("se creo flashcard personal: "+JSON.stringify(flashcard));
            console.log("se creo flashcard personal: "+JSON.stringify(flashcard.data));
            return flashcard;
        } catch (error) {
            console.error("Error al crear una nueva tarea SV:", error);
            throw error;
        }
    } 
}