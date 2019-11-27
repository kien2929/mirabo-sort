let stt = 1;
var inc = true;
function swap(arr,a, b) {
    temp = arr[a];
    arr[a]=arr[b];
    arr[b]=temp;
}
const resetFile = () => {
    document.getElementById('file').value = ""
}
const chooseFile = () => {
    document.getElementById('file').files[0]
    const file = document.getElementById('file').files[0];
    if (file.type == "text/plain") {
        let fileReader = new FileReader();
        fileReader.readAsText(document.getElementById("file").files[0]);
        fileReader.onload = function (e) {
            document.getElementById("value").value = e.target.result;
        };
    }
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
    if (document.getElementById('value').value != "") {
        stt = 1;
        const line2 = document.getElementById("line2");
        const bubbleStep = document.getElementById('bubble-step');
        const quickStep = document.getElementById('quick-step');
        bubbleStep.innerHTML = "";
        quickStep.innerHTML = "";

        arrayBuble = await document.getElementById('value').value.split(",").map(function (item) { return parseInt(item, 10); });
        console.log(arrayBuble[0]);
        if (arrayBuble[0]-arrayBuble[0]+1) {
            arrayQuick = document.getElementById('value').value.split(",").map(function (item) { return parseInt(item, 10); });
            line2.style.display = "block";
            startBubble = new Date();
            await bubbleSort(arrayBuble);
            endBubble = new Date();
            bubbleTime = endBubble.getTime() - startBubble.getTime();
            bubbleStep.innerHTML += `<div>Time:  ${bubbleTime}  msec</div>`

            right = arrayQuick.length;
            startQuick = new Date();
            await quickSort(arrayQuick, 0, right - 1);
            endQuick = new Date();
            quickTime = endQuick.getTime() - startQuick.getTime();
            quickStep.innerHTML += `<div>Time:  ${quickTime}  msec</div>`
            document.getElementById("bubble-value").value = arrayBuble;
            document.getElementById('quick-value').value = arrayQuick;
        }else{
            line2.style.display = "none";
        }
    }
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
const quickSort =  (arr, low, high) => {
    const quickStep = document.getElementById('quick-step');
    quickStep.innerHTML += `<br>
        <span>Step ${stt}</span><input value="${arr}">
        <br>`;
    stt++;
    if (low < high) {
        pi = partition(arr, low, high);
         quickSort(arr, low, pi - 1);
         quickSort(arr, pi + 1, high);

    }
}
let partition =  (arr, low, high) => {
    pivot = arr[high];    // pivot
    left = low;
    right = high - 1;
    while(true){
        while(left <= right && arr[left] < pivot) left++;
        while(right >= left && arr[right] > pivot) right--;
        if (left >= right) break;
        swap(arr, left,right);
        left++;
        right--;
    }
    swap(arr, left,right);
    return left;
}