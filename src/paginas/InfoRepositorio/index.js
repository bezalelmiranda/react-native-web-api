import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';

import { putRepositoryUser } from '../../servicos/requisicoes/repositorios';
import { delRepositoryUser } from '../../servicos/requisicoes/repositorios';

export default function InfoRepositorio({ route, navigation }) {
    const [nome, setNome] = useState(route.params.item.name);
    const [data, setData] = useState(route.params.item.data);

    /* Função para quando apertar o botão "Salvar" ele executa o código dela 
    As variaveis 'nome' e 'data', não recebem o prefixo route.params.item, pois
    aqui está sendo obtido o novo nome e data, alterado pelo usuário */
    async function salvar() {
        const resultado = await putRepositoryUser(
            route.params.item.postId,
            nome,
            data,
            route.params.item.id
        )

        if (resultado === 'Sucesso') {
            Alert.alert("Repositório atualizado!")
            navigation.goBack()
        }
        else {
            Alert.alert("Erro ao atualizar o repositório!")
        }
    }

    async function deletar() {
        const resultado = await delRepositoryUser(route.params.item.id)

        if (resultado === 'Sucesso') {
            Alert.alert("Repositório deletado!")
            navigation.goBack()
        }
        else {
            Alert.alert("Erro ao deletar o repositório!")
        }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity 
                style={estilos.botao} 
                onPress={salvar}
            >
                <Text style={estilos.textoBotao}>
                    Salvar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[estilos.botao, {backgroundColor: '#DD2B2B', marginTop: 10}]} 
                onPress={deletar}
            >
                <Text style={estilos.textoBotao}>
                    Deletar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
