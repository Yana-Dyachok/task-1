const heapSort = (arr) => {
    if (arr.length <= 1) return arr;
    let heapArr = [...arr];
    for (let i = Math.floor(heapArr.length / 2); i >= 0; i--) {
      heapify(heapArr, i, heapArr.length);
    }
    return heapArr;
  };
  
  const heapify = (array, i, n) => {
    let left = 2 * i + 1;
    let rigth = 2 * i + 2;
    let large = i;
    if (left < n && array[left] > array[large]) large = left; // за зростанням <
    if (rigth < n && array[rigth] > array[large]) large = rigth; // за зростанням <
    if (large !== i) {
      [array[i], array[large]] = [array[large], array[i]];
      heapify(array, large, n);
    }
  };
  
  const array = [5, 7, 8, 89, 45, 1, 6, 3];
  console.log(heapSort(array));
  