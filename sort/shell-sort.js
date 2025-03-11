const shellSort = (array) => {
    let n = array.length;
    let gap = Math.floor(n / 2);
    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        let temp = array[i];
        let j = i;
        while (j >= gap && array[j - gap] > temp) {//< за спаданням
          array[j] = array[j - gap];
          j -= gap;
        }
        array[j] = temp;
      }
      gap = Math.floor(gap / 2);
    }
    return array;
  };
  
  const array = [5, 7, 8, 89, 45, 1, 6, 3];
  console.log(shellSort(array));
  
  // https://www.youtube.com/watch?v=ddeLSDsYVp8
  