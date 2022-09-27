import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import estilos from './estilos';

import { buscaUsuario } from '../../servicos/requisicoes/usuarios';

export default function Principal({ navigation }) {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [usuario, setUsuario] = useState({});

    async function busca() {
        /*    /*usa o método get para fazer uma busca na api com o endereço '/users'
        .then() então vai retornar uma resposta como função. Normalmente vem como ".data" 
        api.get('/users?login=andreocunha').then(
            response => { 
                console.log(response.data)
            }
        ).catch(error => {
            console.log(error)
        }) /* se houver algum erro o catch vai pegar o erro e apresentar no terminal */ 
        const resultado = await buscaUsuario(nomeUsuario)
        //console.log(resultado)

        setNomeUsuario('') /* após a busca, limpa o campo de busca */

        /* se existir resultado, altera a variavel usuario com os dados em resultado */
        if (resultado) {
            setUsuario(resultado)
        }
        else {
            Alert.alert('Usuário não encontrado!')
            setUsuario({}) /* caso não encontre um usuário, não retorna nada */
        }
    }


    return (
        <ScrollView>
            <View style={estilos.container}>
                {
                    usuario?.login &&
                <>
                    <View style={estilos.fundo} />
                    <View style={estilos.imagemArea}>
                        <Image source={{ uri: usuario.avatar_url }} style={estilos.imagem} />
                    </View>
                    <Text style={estilos.textoNome}>{usuario.name}</Text>
                    <Text style={estilos.textoEmail}>{usuario.email}</Text>
                    <View style={estilos.seguidoresArea}>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.followers}</Text>
                            <Text style={estilos.seguidoresTexto}>Seguidores</Text>
                        </View>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.following}</Text>
                            <Text style={estilos.seguidoresTexto}>Seguindo</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Repositorios', {id: usuario.id}
                    /* envia o id do usuário como parametro ao clicar no botão de repositório */)}>
                        <Text style={estilos.repositorios}>
                            Ver os repositórios
                        </Text>
                    </TouchableOpacity>
                </>}

                <TextInput
                    placeholder="Busque por um usuário"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeUsuario}
                    onChangeText={setNomeUsuario}
                />

                <TouchableOpacity style={estilos.botao}
                    onPress={busca}
                >
                    <Text style={estilos.textoBotao}>
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
