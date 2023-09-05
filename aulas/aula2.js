function ePalindromo(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedStr = str.split('').reverse().join('');
    return str === reversedStr;
  }
  
  console.log(ePalindromo("arara")); // Deve imprimir true
  console.log(ePalindromo("banana")); // Deve imprimir false
  