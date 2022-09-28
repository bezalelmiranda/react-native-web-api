import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';

import { postRepositoryUser } from '../../servicos/requisicoes/repositorios';

export default function CriarRepositorio({ route, navigation }) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');

    /* Função para quando apertar o botão "Criar" ele executa o código dela 
    As variaveis 'nome' e 'data', não recebem o prefixo route.params.item, pois
    aqui está sendo obtido o novo nome e data, alterado pelo usuário */
    async function criar() {
        const resultado = await postRepositoryUser(
            route.params.id,
            nome,
            data,
        )

        if (resultado === 'Sucesso') {
            Alert.alert("Repositório criado!")
            navigation.goBack()
        }
        else {
            Alert.alert("Erro ao criar o repositório!")
        }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                /* Para poder enviar dados: */
                value={nome} 
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                /* Para poder enviar dados: */
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity style={estilos.botao}
                onPress={criar}
            >
                <Text style={estilos.textoBotao}>
                    Criar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
