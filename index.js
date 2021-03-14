import {
  verifyIfSilhouettesStringIsValid,
  getArrayFromString,
  getIndexesOfMaxValue,
  getIndexesToBreak,
  breakSilhouettesByIndexes,
  calculateWaterQuantity,
} from './utils/aux.js';

const input = `8
9
5 4 3 2 1 2 3 4 5
30
7 10 2 5 13 3 4 10 5 9 4 2 6 5 18 6 8 6 15 4 20 4 8 9 5 21 4 7 19 2
1
10
10
1 2 3 4 5 6 7 8 9 10
10
10 9 8 7 6 5 4 3 2 1
15
10 10 10 10 10 10 10 10 10 10 10 10 10 10 10
20
1 2 3 4 5 6 7 8 9 10 10 9 8 7 6 5 4 3 2 1
10
7 10 2 5 13 3 4 1 5 9`;

export default function main() {
  const inputs = input.split('\n');
  const casesQuantity = inputs.find((_, index) => index === 0);
  const cases = parseInt(casesQuantity, 10);

  if (isNaN(cases) || cases <= 0 || cases > 100) {
    console.log('A quantidade de casos deve estar entre 1 e 100');
    return;
  }

  const silhouettes = inputs.filter((_, index) => index !== 0);

  if (silhouettes.length !== cases * 2) {
    console.log('A quantidade de casos está diferente do tamanho informado');
    return;
  }

  var caseIndex = 0;
  do {
    if (caseIndex % 2 !== 0) {
      caseIndex++;
      continue;
    };
    
    const silhouetteSize = parseInt(silhouettes[caseIndex], 10);
    const silhouetteValues = silhouettes[caseIndex + 1];
    let silhouettesArray = [];

    if (silhouetteValues && silhouetteValues.length > 0 && verifyIfSilhouettesStringIsValid(silhouetteValues)) {
      silhouettesArray = getArrayFromString(silhouetteValues);
    }

    if (silhouettesArray.length !== silhouetteSize) {
      console.log('Esse caso está inválido, a quantidade de itens é diferente do tamanho da silhueta.');
      caseIndex++;
      continue;
    }

    getWaterQuantity(silhouettesArray);
    caseIndex++;
    
  } while (caseIndex < silhouettes.length);
}

function getWaterQuantity(silhouettesArray) {
  const maxNumber = Math.max(...silhouettesArray);

  const indexesOfMaxNumber = getIndexesOfMaxValue(silhouettesArray, maxNumber);
  const indexesToBreak = getIndexesToBreak(silhouettesArray, indexesOfMaxNumber);

  if (indexesToBreak.length > 0) {
    const microSilhouetes = breakSilhouettesByIndexes(
      silhouettesArray,
      indexesToBreak
    );

    const totalWaterByMicroSilhouetes = microSilhouetes.reduce((total, micro) => total + calculateWaterQuantity(micro), 0);
    
    //output
    console.log(totalWaterByMicroSilhouetes);
  } else {
    let orderedArray =
      indexesOfMaxNumber[0] === 0
        ? silhouettesArray.reverse()
        : silhouettesArray;
    const waterQuantity = calculateWaterQuantity(orderedArray);
    
    //output
    console.log(waterQuantity);
  }
}

main();
