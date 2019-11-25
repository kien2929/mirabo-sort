let stt = 1;
var inc = true;
function swap(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
}
const changeType = () => {
    const checkbox = document.getElementById('checkbox');
    const sort = document.getElementById("sort");
    if (checkbox.checked == true) {
        sort.innerHTML = "Giảm dần";
        inc = false;
    } else {
        sort.innerHTML = "Mặc định";
        inc = true;
    }
}
const sort = async () => {
    stt = 1;
    const line2 = document.getElementById("line2");
    const bubbleStep = document.getElementById('bubble-step');
    const quickStep = document.getElementById('quick-step');
    bubbleStep.innerHTML = "";
    quickStep.innerHTML = "";

    line2.style.display = "block";
    arrayBuble = document.getElementById('value').value.split(",").map(function (item) { return parseInt(item, 10); });;
    arrayQuick = document.getElementById('value').value.split(",").map(function (item) { return parseInt(item, 10); });;
    startBubble = new Date();
    await bubbleSort(arrayBuble);
    endBubble = new Date();
    bubbleTime=endBubble.getTime() - startBubble.getTime();
    bubbleStep.innerHTML+=`<div>Time:  ${bubbleTime}  msec</div>`

    right = arrayQuick.length;
    startQuick = new Date();
    await quickSort(arrayQuick, 0, right - 1);
    endQuick = new Date();
    quickTime=endQuick.getTime() - startQuick.getTime();
    quickStep.innerHTML+=`<div>Time:  ${quickTime}  msec</div>`
    document.getElementById("bubble-value").value = arrayBuble;
    document.getElementById('quick-value').value = arrayQuick;
}
const bubbleSort = (arr) => {
    const bubbleStep = document.getElementById('bubble-step');
    let st = 1;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            bubbleStep.innerHTML += `<br>
                    <span>Step ${st}</span><input value="${arr}"><br>`;
            st++;
            if (inc == true) {

                if (arr[j + 1] < arr[j]) {
                    temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            } else {
                if (arr[j + 1] > arr[j]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}
const quickSort = async (arr, low, high) => {
    const quickStep = document.getElementById('quick-step');
    quickStep.innerHTML += `<br>
        <span>Step ${stt}</span><input value="${arr}">
        <br>`;
    stt++;
    if (low < high) {
        pi = partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);

    }
}
let partition = (arr, low, high) => {
    pivot = arr[high];
    i = (low - 1);
    for (let j = low; j < high; j++) {
        if (inc == true) {
            if (arr[j] <= pivot) {
                i++;
                tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        } else {
            if (arr[j] >= pivot) {
                i++;
                tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
} 