const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      // за спаданням array[j] < key
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = key;
    }
    return array;
  };
  
  const array = [5, 7, 8, 89, 45, 1, 6, 3];
  console.log(insertionSort(array));
