import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Variáveis que armazenam os dados necessários
  sorteados: number[] = []; // Números sorteados aleatoriamente
  aposta: number[] = []; // Números escolhidos pelo usuário
  resultado: number | null = null; // Resultado da conferência de acertos (ou null se ainda não foi conferido)
  sorteadosExibidos: boolean = false; // Controle para exibir ou ocultar os números sorteados
  numeros: number[] = Array.from({ length: 60 }, (_, i) => i + 1); // Números de 1 a 60 para o usuário escolher
  selecaoAposta: number[] = []; // Números selecionados pelo usuário para aposta
  mensagemErro: string = ''; // Mensagem de erro (por exemplo, se o usuário tentar selecionar mais de 10 números)

  // Construtor que chama a função para sortear os números
  constructor() {
    this.sorteados = this.sortearNumeros(); // Sorteia os números ao iniciar o componente
  }

  // Função que sorteia 6 números únicos entre 1 e 60
  sortearNumeros(): number[] {
    let numeros: number[] = [];
    while (numeros.length < 6) {
      let num = Math.floor(Math.random() * 60) + 1; // Sorteia um número aleatório entre 1 e 60
      if (!numeros.includes(num)) { // Garante que não haja repetições
        numeros.push(num);
      }
    }
    return numeros; // Retorna a lista de números sorteados
  }

  // Função que compara a aposta do usuário com os números sorteados e conta os acertos
  conferirAposta() {
    this.resultado = this.selecaoAposta.filter(num => this.sorteados.includes(num)).length;
  }

  // Função para adicionar ou remover números da seleção de aposta
  selecionarNumero(numero: number) {
    const index = this.selecaoAposta.indexOf(numero); // Verifica se o número já está na lista de aposta

    if (index === -1) { // Se o número não está na lista, adiciona
      if (this.selecaoAposta.length < 10) { // Garante que não ultrapasse 10 números
        this.selecaoAposta.push(numero);
        this.mensagemErro = ''; // Limpa a mensagem de erro caso esteja dentro do limite
      } else {
        this.mensagemErro = 'Você só pode selecionar até 10 números!'; // Mensagem de erro se tentar selecionar mais de 10
      }
    } else { // Se o número já está na lista, remove
      this.selecaoAposta.splice(index, 1);
      this.mensagemErro = ''; // Limpa a mensagem de erro quando um número é removido
    }
  }

  // Função para verificar se um número está na seleção de aposta
  isSelecionado(numero: number): boolean {
    return this.selecaoAposta.includes(numero); // Retorna true se o número estiver na lista de aposta
  }

  // Função para alternar a visibilidade dos números sorteados
  toggleSorteados() {
    this.sorteadosExibidos = !this.sorteadosExibidos; // Inverte o valor de sorteadosExibidos (mostra ou esconde)
  }

  // Função chamada ao submeter a aposta
  onSubmit() {
    if (this.selecaoAposta.length >= 6 && this.selecaoAposta.length <= 10) { // Verifica se a aposta tem entre 6 e 10 números
      this.aposta = this.selecaoAposta; // Define a aposta com os números selecionados
      this.conferirAposta(); // Chama a função para conferir quantos números foram acertados
    } else {
      this.mensagemErro = "A aposta deve ter entre 6 e 10 números."; // Mensagem de erro se a aposta não tiver entre 6 e 10 números
    }
  }
}
