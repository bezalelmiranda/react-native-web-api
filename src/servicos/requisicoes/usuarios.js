import api from '../api';

/* o async e o await dizem a nossa requisição que deve esperar até ter uma resposta
da api para então sim executar uma ação, num contexto de dados massivos */
export async function buscaUsuario(nomeUsuario) {
    try {
        const resultado = await api.get(`/users?login=${nomeUsuario}`);
        return resultado.data[0] /* o resultado vem em forma de array e esta 
        dentro de data, sendo um array retorna na posição que é o unico obj do array */
    } 
    catch (error) {
        console.log(error)
        return {} /*não encontrou nada*/
    }
}