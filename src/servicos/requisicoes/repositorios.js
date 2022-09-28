import api from '../api';

// Buscar repositório de usuário
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

// Salvar
export async function putRepositoryUser(postId, nome, data, id) {
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

// Buscar repositório de usuário por nome
export async function getNameRepo(id, nameRepo){
    const resultado2 = await api.get(`/repos?postId=${id}&name=${nameRepo}`).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
        return [];
    })
    return resultado2;
}

// Criar
export async function postRepositoryUser(postId, nome, data) {
    try { /* Foi removido (const resultado = ) pois não tem necessidade de obter nenhuma informação,
    esta apenas alterando informações, o único retorno esperado é de sucesso 200 */
        await api.post(`/repos`, {
            name: nome,
            data: data,
            postId: postId,
        });
        return "Sucesso"
    } 
    catch (error) {
        console.log(error)
        return "Erro" /*não encontrou nada*/
    }
}

// Deletar
export async function delRepositoryUser(id) {
    try { /* Foi removido (const resultado = ) pois não tem necessidade de obter nenhuma informação,
    esta apenas alterando informações, o único retorno esperado é de sucesso 200 */
        await api.delete(`/repos/${id}`);
        return "Sucesso"
    } 
    catch (error) {
        console.log(error)
        return "Erro" /*não encontrou nada*/
    }
}