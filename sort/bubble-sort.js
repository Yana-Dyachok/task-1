const bubbleSort = (array) => {
    if (arr.length <= 1) return arr;
    let last = array.length - 1;
    
    for (let i = 0; i < last; i++) { 
        let swapped = false;
        
        for (let j = 0; j < last - i; j++) { 
            // за зростанням >, за спаданням <
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break; 
    }
    
    return array;
};

const array = [5, 7, 8, 89, 45, 1, 6, 3]
console.log(bubbleSort(array));