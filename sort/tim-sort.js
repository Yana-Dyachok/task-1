const insertionSort = (array, left, right) => {
  for (let i = left + 1; i <= right; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= left && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
};

const merge=(left, right)=>{
  let res=[];
  while(left.length&&right.length) {
      if(left[0]<right[0]) res.push(left.shift());
      else {res.push(right.shift())}
  }
return res.concat(left,right)
}

const timSort = (array) => {
  const RUN = 16;
  let n = array.length;

  for (let i = 0; i < n; i += RUN) {
    insertionSort(array, i, Math.min(i + RUN - 1, n - 1));
  }

  for (let size = RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      let mid = left + size - 1;
      let right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) {
        let leftArr = array.slice(left, mid + 1);
        let rightArr = array.slice(mid + 1, right + 1);
        merge(leftArr, rightArr);}
    }
  }

  return array;
};

const array = [5, 7, 8, 89, 45, 1, 6, 3, 13, 2,  4, 10,  12, 15, 18, 19, 21,  24,  30,  36, 39, 40, 87, 23, 42, 48, 135, 267, 270, 534, 14, 16, 90, 178];
console.log(timSort(array));
