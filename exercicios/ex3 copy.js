function encontrarMaiorNumero(matriz) {
    let maior = matriz[0];
    for (let i = 1; i < matriz.length; i++) {
      if (matriz[i] > maior) {
        maior = matriz[i];
      }
    }
    return maior;
  }
  