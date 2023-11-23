export default class OpenAIService {
    async createdCardWithAI(data) {
        console.log('entro al createdCardWithAI()\n');
        const url = "http://localhost:8081/api/v1/openai/flashcards";
        const options = {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: token
            },
            body: JSON.stringify(data)
        };
        console.log('options', options);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const data = await response.json();
            // router.push({ name: 'TaskList' });
            return data;
        } catch (error) {
            console.error("Error al crear una nuevo tema SV:", error);
            throw error;
        }
    }  
}