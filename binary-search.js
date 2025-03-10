const binarySearch = (sortedArray, el, left=0, right=sortedArray.length-1) => {
    
   if(left>right) return false;

   let middle=Math.floor((left+right)/2);

   if(sortedArray[middle]===el) return middle;

   if(sortedArray[middle]>el) return binarySearch(sortedArray, el, left, middle-1);

   return binarySearch(sortedArray, el, middle+1, right);
};

const array = [5, 7, 8, 89, 45, 1, 6, 3].sort((a, b) => a - b);
const el = 45;
console.log(binarySearch(array, el));
