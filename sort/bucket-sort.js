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

const bucketSort = (array, bucketSize = array.length) => {
    if (array.length === 0) return array;

    let min = Math.min(...array);
    let max = Math.max(...array);

    let bucketCount = Math.floor((max - min) / bucketSize) + 1;
    let buckets = Array.from({ length: bucketCount }, () => []);

    array.forEach(num => {
        let bucketIndex = Math.floor((num - min) / bucketSize);
        buckets[bucketIndex].push(num);
    });

    return buckets.flatMap(bucket => insertionSort(bucket));
};

const array = [5, 7, 8, 89, 45, 1, 6, 3];
console.log(bucketSort(array));
