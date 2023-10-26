export default class LoginService {

async doSomethingWithToken(token) {
    // const token = await this.$auth0.getAccessTokenSilently();
  
    // Envía el token al backend
    const response = await fetch('http://localhost:8081/api/v1/login', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify(token)
    });
  
    // Recibe la respuesta del backend (en este caso, simplemente el mismo token)
    const data = await response.text();
    console.log("Respuesta del backend:", data);
  }
}