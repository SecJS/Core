export function isCnpj(cnpj: string | number) {
  cnpj = cnpj.toString()
  cnpj = cnpj.replace(/[^0-9]/g, '')

  const primeirosNumerosCnpj = cnpj.substr(0, 12)
  const primeiroCalculo = calcDigitosPosicoes(primeirosNumerosCnpj, 5)
  const segundoCalculo = calcDigitosPosicoes(primeiroCalculo, 6)

  if (cnpj === segundoCalculo) {
    return true
  }

  return false
}

function calcDigitosPosicoes(digitos: any, posicoes = 10, somaDigitos = 0) {
  digitos = digitos.toString()

  for (let i = 0; i < digitos.length; i++) {
    somaDigitos = somaDigitos + digitos[i] * posicoes

    posicoes--

    if (posicoes < 2) {
      posicoes = 9
    }
  }

  somaDigitos = somaDigitos % 11

  if (somaDigitos < 2) {
    somaDigitos = 0
  } else {
    somaDigitos = 11 - somaDigitos
  }

  return digitos + somaDigitos
}