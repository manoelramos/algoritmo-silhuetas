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
