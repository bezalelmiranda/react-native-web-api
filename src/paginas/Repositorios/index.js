import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import estilos from './estilos';

import { getRepositoryUser } from '../../servicos/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]); /*variavel que salva os dados do repositório */

    /* Se estiver na tela a propriedade  () altera o status da tela de true para false ou o inverso.
    Assim acontece um recarregamento automático da página, sem a necessidade de fazer isso manualmente */
    const ifOnTheScreen = useIsFocused();

    /* O hoock userEffect executa quando entra na tela. É necessário tornalo 
    assincrono, caso contrário retorna uma Promisse com valores null */
    useEffect( async () => {
        const resultado = await getRepositoryUser(route.params.id)/* 
        pega pela rota o parametro id passado da tela principal para esta */
        //console.log(resultado)
        setRepo(resultado)
    }, [ifOnTheScreen])

    return (
        <ScrollView>
            <View style={estilos.container}>
                    <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                    <TouchableOpacity 
                        style={estilos.botao}
                        onPress={() => navigation.navigate('CriarRepositorio')}
                    >
                        <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={repo}
                        /* É passado 'repo' com os dados, a chave vem de repo.id para listar os repositorios 
                        e renderiza um TouchableOpacity para tornar clicaveis os repositorios */
                        style={{ width: '100%' }}
                        keyExtractor={repo => repo.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={estilos.repositorio}
                                onPress={() => navigation.navigate('InfoRepositorio', {item})} /* 
                                passa as informações do repositório para tela de Repositório Info */
                            >
                                <Text style={estilos.repositorioNome}>{item.name}</Text>
                                <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                            </TouchableOpacity>
                        )}
                    />


                    <TextInput
                        placeholder="Busque pelo nome do repositório"
                        autoCapitalize="none"
                        style={estilos.entrada}
                        /*value={nomeUsuario}
                        onChangeText={setNomeUsuario}*//>
                    <TouchableOpacity style={estilos.botao}>
                        <Text style={estilos.textoBotao}>
                                Buscar Repositório
                        </Text>
                    </TouchableOpacity>

            </View>
        </ScrollView>
    );
}
