function somaNumerosPares(N) {
    let soma = 0;
    for (let i = 2; i <= N; i += 2) {
      soma += i;
    }
    return soma;
  }
  
  console.log(somaNumerosPares(10)); // Deve imprimir 30 (2 + 4 + 6 + 8 + 10)
  