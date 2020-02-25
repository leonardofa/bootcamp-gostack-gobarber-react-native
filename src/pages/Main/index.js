import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import { Container, Form, Input, SubmitButton } from './styles';

export default class Main extends Component {
  state = {
    newUSer: '',
    users: [],
  };

  handleAddUser = async () => {
    const { users, newUSer } = this.state;

    try {
      const response = await api.get(`/users/${newUSer}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUSer: '',
      });
    } catch (error) {
      console.tron.log('Erro ao recuperar usuário');
    }

    Keyboard.dismiss();
  };

  render() {
    const { newUSer } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Adicionar usuário"
            value={newUSer}
            onChangeText={text => this.setState({ newUSer: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#FFF" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
};
