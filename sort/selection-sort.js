const selectionSort = (array) => {
    if (array.length <= 1) return array;
    for (let i = 0; i < array.length; i++) {
      let minInd = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minInd]) minInd = j;  //> за спаданням
      }
      [array[i], array[minInd]] = [array[minInd], array[i]];
    }
    return array;
  };
  
  const array = [5, 7, 8, 89, 45, 1, 6, 3];
  console.log(selectionSort(array));
  