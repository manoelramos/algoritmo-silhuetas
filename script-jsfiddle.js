const cases = prompt('Informe o número de casos');

const casesInt = parseInt(cases, 10);

if (isNaN(casesInt) || casesInt <= 0 || casesInt > 100) {
	alert('A quantidade de casos deve estar entre 1 e 100');
}

var caseIndex = 1;
do {
	const silhouettesQuantity = prompt('Informe a quantidade de silhuetas');

	if (!silhouettesQuantity) {
  	alert('Inserção cancelada.');
  	break;
  }

  const silhouettesQuanitityInt = parseInt(silhouettesQuantity, 10);
  
  if (!isNaN(silhouettesQuanitityInt)) {
  	const silhouettes = prompt('Informe cada silhueta separada por espaço. Ex: 5 4 2');
    
    if (silhouettes) {
    	const regexSilhouettes = /^[0-9 ]*$/;
      if (regexSilhouettes.test(silhouettes)) {
      	const silhouettesArray = getArrayFromString(silhouettes);

        if (silhouettesArray.length === silhouettesQuanitityInt) {
        	getWaterQuantity(silhouettesArray);
					caseIndex++;
        } else {
        	alert('A quantidade de silhueta é diferente do tamanho inserido');
        }
      } else {
        alert('Há alguma silhueta inválida. Insira somente números separados com espaço');
      }
    } else {
			alert('Nenhuma informação inserida');
      break;
    }
  } else {
  	alert('Tamanho inválido, insira novamente.');
  }
} while (caseIndex <= cases);

export function verifyIfSilhouettesStringIsValid(silhouettes) {
  const regexSilhouettes = /^[0-9 ]*$/;
  return regexSilhouettes.test(silhouettes);
}

export function getArrayFromString(silhouettes) {
  if (silhouettes && silhouettes.length)
    return silhouettes.split(' ').map((n) => parseInt(n.trim(), 10));

  return [];
}

export function getIndexesOfMaxValue(silhouettesArray, maxNumber) {
  return silhouettesArray.map((item, index) => {
    if (item === maxNumber) {
      return index;
    }
  }).filter(indexOfNumber => indexOfNumber != undefined);
}

// pega os indeces que não estão nas pontas do array
export function getIndexesToBreak(silhouettesArray, indexesOfMaxNumber) {
  return indexesOfMaxNumber.filter((idx) => {
    if (idx !== 0 && idx < silhouettesArray.length - 1) {
      return idx;
    }
  });
}

export function breakSilhouettesByIndexes(silhouettesArray, indexesToBreak) {
  if (indexesToBreak.length === 1) {
    const indexMaxNumber = indexesToBreak[0];

    return breakArrayWithOneIndex(silhouettesArray, indexMaxNumber);
  } else if (
    indexesToBreak.length === 2 &&
    indexesToBreak[1] - indexesToBreak[0] === 1
  ) {
    return breakArrayWithTwoIndexes(
      silhouettesArray,
      0,
      indexesToBreak[0] + 1,
      indexesToBreak[1]
    );
  } else {
    let previousIndexMaxNumber = 0;
    const microSilhouettes = [];
    indexesToBreak.map((indexMaxNumber, index) => {
      if (index === 0) {
        microSilhouettes.push(silhouettesArray.slice(0, indexMaxNumber + 1));
      } else if (index < indexesToBreak.length - 1) {
        microSilhouettes.push(
          silhouettesArray.slice(previousIndexMaxNumber, indexMaxNumber).reverse()
        );
      } else {
        microSilhouettes.push(
          silhouettesArray.slice(
            previousIndexMaxNumber,
            indexMaxNumber
          ).reverse(),
          silhouettesArray.slice(indexMaxNumber, silhouettesArray.length).reverse()
        );
      }
      previousIndexMaxNumber = indexMaxNumber;
    });
    return microSilhouettes;
  }
}

function breakArrayWithOneIndex(silhouettesArray, index) {
  return [
    silhouettesArray.slice(0, index + 1),
    silhouettesArray.slice(index).reverse()
  ];
}

function breakArrayWithTwoIndexes(silhouettesArray, baseIndex, initialIndex, endIndex) {
  return [
    silhouettesArray.slice(baseIndex, initialIndex),
    silhouettesArray
      .slice(endIndex, silhouettesArray.length)
      .reverse()
  ];
}

export function calculateWaterQuantity(silhouettesArray) {
  let lastWaterQuantity = 0;

  return silhouettesArray.reduce((total, item, index) => {
    if (index < silhouettesArray.length - 1) {
      let nextItem = silhouettesArray[index + 1];
      const currentItemWithLastWaterQuantity = item + lastWaterQuantity;

      if (nextItem < currentItemWithLastWaterQuantity) {
        lastWaterQuantity = currentItemWithLastWaterQuantity - nextItem;
        total += lastWaterQuantity;
      } else {
        lastWaterQuantity = 0;
      }
    }
    
    return total;
  }, 0);
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
    console.log(totalWaterByMicroSilhouetes);
  } else {
    let orderedArray =
      indexesOfMaxNumber[0] === 0
        ? silhouettesArray.reverse()
        : silhouettesArray;
    const waterQuantity = calculateWaterQuantity(orderedArray);

    console.log(waterQuantity);
  }
}

