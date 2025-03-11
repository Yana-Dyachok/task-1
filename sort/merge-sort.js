const mergeSort=(arr)=>{
    if (arr.length <= 1) return arr;
    let middle=Math.floor(arr.length/2);
    let left= mergeSort(arr.slice(0, middle));
    let right= mergeSort(arr.slice(middle));
    return merge(left, right)
}

const merge=(left, right)=>{
    let res=[];
    while(left.length&&right.length) {
        if(left[0]<right[0]) res.push(left.shift()); //> за спаданням
        else {res.push(right.shift())}
    }
return res.concat(left,right)
}
const array = [5, 7, 8, 89, 45, 1, 6, 3];
console.log(mergeSort(array));


