export default class UserService {

    async findByEmailContainingIgnoreCase(text) { //TODO: falta token
        const url = `http://localhost:8081/api/v1/users/findByEmail?email=${text}`;
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
            const users = await response.json();
            console.log(`se obtuvo los resultados de buscar ${text} en UserService `+users.data);
            console.log("obtuvo usuarios con acceso"+JSON.stringify(users.data));

            return users.data;
        } catch (error) {
            console.error('Error al obtener los usuarios con acceso:', error);
        }
    }
}