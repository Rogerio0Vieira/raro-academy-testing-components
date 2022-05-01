import { Cadastro } from '../Cadastro';

import { render, screen } from '@testing-library/react'
import faker from '@faker-js/faker';
import { validaErroApresentadoEmTela } from '../../helpers/teste/validaErroApresentadoEmTela';
import { validaErroNaoApresentadoEmTela } from '../../helpers/teste/validaErroNaoApresentadoEmTela';
import { setValorInput } from '../../helpers/teste/setValorInput';
import axios from 'axios';

const makeSut = () => {
  return render(
    <Cadastro />
  );
}

describe('Cadastro Page', () => {
  beforeEach(jest.clearAllMocks);
  beforeEach(makeSut);

  it('deve bloquear o submit caso os campos não estejam válidos', () => {
    // setup
    const button = screen.getByText('Cadastrar');
    // construcao do cenário e expects
    expect(button).toBeDisabled();
  });

  describe('deve validar o formato de e-mail no cadastro', () => {

  });


  describe('deve validar os critérios de aceitação da senha', () => {
    let input: HTMLElement;
    beforeEach(() => {
      input = screen.getByPlaceholderText('Senha');
    });

    it('senha deve ter 8 dígitos ou mais', () => {
      const value = faker.lorem.paragraph();
      const mensagemDeValidacao = 'Senha deve ter ao menos 8 caracteres';
      validaErroApresentadoEmTela(input, mensagemDeValidacao);
      validaErroNaoApresentadoEmTela(input, value, mensagemDeValidacao);
    });

    it('senha deve ter letra maiuscula', () => {
      const value = 'Teste';
      const mensagemDeValidacao = 'Senha deve conter pelo menos uma letra maiúscula';
      validaErroApresentadoEmTela(input, mensagemDeValidacao);
      validaErroNaoApresentadoEmTela(input, value, mensagemDeValidacao);
    });

    it('senha deve ter letra minúscula', () => {
      const value = 'Teste';
      const mensagemDeValidacao = 'Senha deve conter pelo menos uma letra minúscula';
      validaErroApresentadoEmTela(input, mensagemDeValidacao);
      validaErroNaoApresentadoEmTela(input, value, mensagemDeValidacao);
    });

    it('senha deve ter números', () => {
      const value = 'Teste 1';
      const mensagemDeValidacao = 'Senha deve conter pelo menos um número';
      validaErroApresentadoEmTela(input, mensagemDeValidacao);
      validaErroNaoApresentadoEmTela(input, value, mensagemDeValidacao);
    });

    it('senha deve ter caracteres especiais', () => {
      const value = 'Teste@1';
      const mensagemDeValidacao = 'Senha deve conter pelo menos um caractere especial';
      validaErroApresentadoEmTela(input, mensagemDeValidacao);
      validaErroNaoApresentadoEmTela(input, value, mensagemDeValidacao);
    });
  });

  it('deve garantir que senha e confirmação sejam iguais', () => {
  });

  it('deve enviar o formulário se todos os dados estiverem preenchidos corretamente', () => {
    //deve enviar o formulário se todos os dados estiverem preenchidos corretamente
    //setup
    const nome = faker.name.firstName();
    const email = faker.internet.email();
    const senha = faker.internet.password();
    const confirmacao = senha;
    //expects
    setValorInput(screen.getByPlaceholderText('Nome'), nome);
    setValorInput(screen.getByPlaceholderText('e-mail'), email);
    setValorInput(screen.getByPlaceholderText('Senha'), senha);
    setValorInput(screen.getByPlaceholderText('Confirmação de Senha'), confirmacao);
  });

  it('deve notificar o usuário que o cadastro foi efetuado com sucesso', () => {
    //setup
    const nome = faker.name.firstName();
    const email = faker.internet.email();
    const senha = faker.internet.password();
    const confirmacao = senha;
    //expects
    setValorInput(screen.getByPlaceholderText('Nome'), nome);
    setValorInput(screen.getByPlaceholderText('e-mail'), email);
    setValorInput(screen.getByPlaceholderText('Senha'), senha);
    setValorInput(screen.getByPlaceholderText('Confirmação de Senha'), confirmacao);
    //act
    const button = screen.getByText('Cadastrar');
    button.click();
    //expects
    expect(axios.post).toHaveBeenCalled();
  } );
});

