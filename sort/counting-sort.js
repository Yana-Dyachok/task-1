const countingSort = (array) => {
    if (array.length <= 1) return array;
    let min = Math.min(...array);
    let max = Math.max(...array);
    let count = Array(max - min + 1).fill(0);
    array.forEach((element) => count[element - min]++);
    let sortedArray = [];
    count.forEach((times, i) => {
      while (times > 0) {
        sortedArray.push(i + min);
        times--;
      }
    });
    return sortedArray;
  };
  
  const array = [5, 7, 8, 89, 45, 1, 6, 3];
  console.log(countingSort(array));
  
  