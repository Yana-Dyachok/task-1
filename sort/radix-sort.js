//(O(nk)
const radixSort = (array) => {
    let max= Math.max(...array);
    let digitPlace=1;
  
    while(Math.floor(max/digitPlace)>0)   {
        let buscket=Array.from({length:10}, ()=>[]);
        array.forEach(num => {
            let index=Math.floor(num/digitPlace)%10;
            buscket[index].push(num);
        });
        array=buscket.flat()
        digitPlace*=10;
    } 
    return array 
};

const array = [5, 7, 8, 89, 45, 1, 6, 3];
console.log(radixSort(array));
