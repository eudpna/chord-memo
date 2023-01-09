// Arrayから要素を削除する関数
export function removeItemOnce(arr: any[], value: any) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}