import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Variáveis que armazenam os dados necessários
  sorteados: number[] = [];
  aposta: number[] = [];
  resultado: number | null = null; 
  sorteadosExibidos: boolean = false;
  numeros: number[] = Array.from({ length: 60 }, (_, i) => i + 1); 
  selecaoAposta: number[] = [];
  mensagemErro: string = '';

  // Construtor que chama a função para sortear os números
  constructor() {
    this.sorteados = this.sortearNumeros();
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
    return numeros; 
  }

  
  conferirAposta() {
    this.resultado = this.selecaoAposta.filter(num => this.sorteados.includes(num)).length;
  }

  
  selecionarNumero(numero: number) {
    const index = this.selecaoAposta.indexOf(numero); // Verifica se o número já está na lista de aposta

    if (index === -1) { // Se o número não está na lista, adiciona
      if (this.selecaoAposta.length < 10) { // Garante que não ultrapasse 10 números
        this.selecaoAposta.push(numero);
        this.mensagemErro = ''; // Limpa a mensagem de erro caso esteja dentro do limite
      } else {
        this.mensagemErro = 'Você só pode selecionar até 10 números!'; 
      }
    } else { // Se o número já está na lista, remove
      this.selecaoAposta.splice(index, 1);
      this.mensagemErro = ''; // Limpa a mensagem de erro quando um número é removido
    }
  }

  // Função para verificar se um número está na seleção de aposta
  numeroFoiSelecionado(numero: number): boolean {
    return this.selecaoAposta.includes(numero); // Retorna true se o número estiver na lista de aposta
  }

  // Função para mostrar ou esconder os números sorteados
  alternarSorteados() {
    this.sorteadosExibidos = !this.sorteadosExibidos; 
  }

  // Função chamada ao submeter a aposta
  enviarAposta() {
    if (this.selecaoAposta.length >= 6 && this.selecaoAposta.length <= 10) { // Verifica se a aposta tem entre 6 e 10 números
      this.aposta = this.selecaoAposta; // Define a aposta com os números selecionados
      this.conferirAposta(); // Chama a função para conferir quantos números foram acertados
    } else {
      this.mensagemErro = "A aposta deve ter entre 6 e 10 números."; // Mensagem de erro se a aposta não tiver entre 6 e 10 números
    }
  }
}
