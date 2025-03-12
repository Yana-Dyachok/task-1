const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = key;
    }
    return array;
  };
  
  const merge = (left, right) => {
    let res = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) res.push(left.shift());
      else {
        res.push(right.shift());
      }
    }
    return res.concat(left, right);
  };
  
  const timSort = (array) => {
    const RUN = 32;
    let n = array.length;
  
    for (let i = 0; i < n; i += RUN) {
      insertionSort(array, i, Math.min(i + RUN - 1, n - 1));
    }
  
    for (let size = RUN; size < n; size *= 2) {
      for (let left = 0; left < n; left += 2 * size) {
        let mid = left + size - 1;
        let right = Math.min(left + 2 * size - 1, n - 1);
        if (mid < right) merge(mid, right);
      }
    }
  
    return array;
  };

  const array = [5, 7, 8, 89, 45, 1, 6, 3];
  console.log(timSort(array));

  