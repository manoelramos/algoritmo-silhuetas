import {
  verifyIfSilhouettesStringIsValid,
  getArrayFromString,
  getIndexesOfMaxValue,
  getIndexesToBreak,
  breakSilhouettesByIndexes,
  calculateWaterQuantity,
} from './aux.js';

describe('test regex to verify silhouettes string is valid', () => {
  test('should pass when string has only numbers', () => {
    const silhouettes = '1 2 3';

    expect(verifyIfSilhouettesStringIsValid(silhouettes)).toBeTruthy();
  });

  test('should be false when string contains letters or symbols', () => {
    const silhouettes = '1 2 3 a';

    expect(verifyIfSilhouettesStringIsValid(silhouettes)).toBeFalsy();
  });
});

describe('test get array from silhouettes string', () => {
  test('should return empty array when receive a null value as parameter', () => {
    const silhouettes = null;

    expect(getArrayFromString(silhouettes).length).toBe(0);
  });
  
  test('should return empty array when receive a empty string', () => {
    const silhouettes = '';

    expect(getArrayFromString(silhouettes).length).toBe(0);
  });

  test('should return array with 4 items', () => {
    const silhouettes = '2 4 5 6';

    expect(getArrayFromString(silhouettes).length).toEqual(4);
  });
});

describe('get indexes of the highest value', () => {
  test('get index of the highest when has one', () => {
    const silhouettes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const maxNumber = Math.max(...silhouettes);

    const index = getIndexesOfMaxValue(silhouettes, maxNumber);

    expect(index.length).toBe(1);
    expect(index[0]).toBe(9);
  });

  test('get indexes of the highest when has two', () => {
    const silhouettes = [1, 2, 3, 4, 10, 6, 7, 8, 9, 10];
    const maxNumber = Math.max(...silhouettes);

    const indexes = getIndexesOfMaxValue(silhouettes, maxNumber);

    expect(indexes.length).toBe(2);
    expect(indexes).toEqual([4, 9]);
  });
});

describe('get indexes of highest value and after get index in silhouettes array if index is not first or last position', () => {
  test('index in the first position should be return empty array', () => {
    const silhouettes = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const maxNumber = Math.max(...silhouettes);

    const indexes = getIndexesOfMaxValue(silhouettes, maxNumber);
    const indexesToBreak = getIndexesToBreak(silhouettes, indexes);

    expect(indexesToBreak.length).toBe(0);
  });

  test('index in the last position should be return empty array', () => {
    const silhouettes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const maxNumber = Math.max(...silhouettes);

    const indexes = getIndexesOfMaxValue(silhouettes, maxNumber);
    const indexesToBreak = getIndexesToBreak(silhouettes, indexes);

    expect(indexesToBreak.length).toBe(0);
  });

  test('one index in middle should be return array with one item', () => {
    const silhouettes = [1, 2, 3, 4, 10, 6, 7, 8, 9, 2];
    const maxNumber = Math.max(...silhouettes);

    const indexes = getIndexesOfMaxValue(silhouettes, maxNumber);
    const indexesToBreak = getIndexesToBreak(silhouettes, indexes);

    expect(indexesToBreak.length).toBe(1);
    expect(indexesToBreak).toEqual([4]);
  });

  test('two index in middle should be return array with two items', () => {
    const silhouettes = [1, 2, 3, 4, 10, 6, 7, 10, 8, 9, 2];
    const maxNumber = Math.max(...silhouettes);

    const indexes = getIndexesOfMaxValue(silhouettes, maxNumber);
    const indexesToBreak = getIndexesToBreak(silhouettes, indexes);

    expect(indexesToBreak.length).toBe(2);
    expect(indexesToBreak).toEqual([4, 7]);
  });
});

describe('break silhouettes array when highest value is in middle position of the array', () => {
  test('when highest value has just one index, break silhouettes in two arrays. The second array should be reversed', () => {
    const silhouettes = [7, 10, 2, 5, 13, 3, 4, 1, 5, 9];
    const maxNumber = Math.max(...silhouettes);
    const indexesOfMaxNumber = getIndexesOfMaxValue(silhouettes, maxNumber);
    const indexesToBreak = getIndexesToBreak(silhouettes, indexesOfMaxNumber);

    const breakedArray = breakSilhouettesByIndexes(silhouettes, indexesToBreak);
    
    expect(breakedArray.length).toBe(2);
    expect(breakedArray).toEqual([[7, 10, 2, 5, 13], [9, 5, 1, 4, 3, 13]]);
  });

  test('when highest value has two indexes and the indexes are together', () => {
    const silhouettes = [7, 10, 2, 5, 13, 13, 3, 4, 1, 5, 9];
    const maxNumber = Math.max(...silhouettes);
    const indexesOfMaxNumber = getIndexesOfMaxValue(silhouettes, maxNumber);
    const indexesToBreak = getIndexesToBreak(silhouettes, indexesOfMaxNumber);

    const breakedArray = breakSilhouettesByIndexes(silhouettes, indexesToBreak);
    
    expect(breakedArray.length).toBe(2);
    expect(breakedArray).toEqual([[7, 10, 2, 5, 13], [9, 5, 1, 4, 3, 13]]);
  });

  test('when highest value has three indexes', () => {
    const silhouettes = [7, 10, 2, 5, 13, 3, 4, 1, 13, 5, 9, 4, 6, 7, 13, 2, 4, 6];
    const maxNumber = Math.max(...silhouettes);
    const indexesOfMaxNumber = getIndexesOfMaxValue(silhouettes, maxNumber);
    const indexesToBreak = getIndexesToBreak(silhouettes, indexesOfMaxNumber);

    const breakedArray = breakSilhouettesByIndexes(silhouettes, indexesToBreak);

    expect(breakedArray.length).toBe(4);
    expect(breakedArray).toEqual([
      [7, 10, 2, 5, 13],
      [1, 4, 3, 13],
      [7, 6, 4, 9, 5, 13],
      [6, 4, 2, 13]
    ]);
  });

  test('when highest value has two separate indexes or more', () => {
    const silhouettes = [7, 10, 2, 5, 13, 3, 4, 13, 1, 5, 9];
    const maxNumber = Math.max(...silhouettes);
    const indexesOfMaxNumber = getIndexesOfMaxValue(silhouettes, maxNumber);
    const indexesToBreak = getIndexesToBreak(silhouettes, indexesOfMaxNumber);

    const breakedArray = breakSilhouettesByIndexes(silhouettes, indexesToBreak);

    expect(breakedArray.length).toBe(3);
    expect(breakedArray).toEqual([[7, 10, 2, 5, 13], [4, 3, 13], [9, 5, 1, 13]]);
  });
});

describe('calculate water quantity from array', () => {
  test('calculate water on array', () => {
    const silhouettes = [5, 4, 3, 2, 1, 2, 3, 4, 5];

    expect(calculateWaterQuantity(silhouettes)).toBe(16);
  });

  test('calculate water on array where all values is equal', () => {
    const silhouettes = [5, 5, 5, 5];

    expect(calculateWaterQuantity(silhouettes)).toBe(0);
  });
});
