import api from '../api';

export async function getRepositoryUser(id) {
    try {
        const resultado = await api.get(`/repos?postId=${id}`);
        return resultado.data /* o resultado vem em forma de array e esta 
        dentro de data, sendo um array retorna uma lista */
    } 
    catch (error) {
        console.log(error)
        return [] /*não encontrou nada*/
    }
}

export async function postRepositoryUser(postId, nome, data, id) {
    try { /* Foi removido (const resultado = ) pois não tem necessidade de obter nenhuma informação,
    esta apenas alterando informações, o único retorno esperado é de sucesso 200 */
        await api.put(`/repos/${id}`, {
            name: nome,
            data: data,
            postId: postId,
            id: id
        });
        return "Sucesso"
    } 
    catch (error) {
        console.log(error)
        return "Erro" /*não encontrou nada*/
    }
}