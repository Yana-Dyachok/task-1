const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = arr.filter((el) => el < pivot); // > за спаданням
    const right = arr.filter((el) => el > pivot); //< за спаданням
    const middle = arr.filter((el) => el === pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
  };
  
  const array = [5, 7, 8, 89, 45, 1, 6, 3];
  console.log(quickSort(array));
  