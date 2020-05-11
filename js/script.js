let queue = []

const MAX_VISOR_CHAR = 20

function options(value) {
	if(!isNaN(value)) {
		document.querySelector(".total").removeAttribute("hidden");		
		if (document.querySelector(".total").innerHTML.length < MAX_VISOR_CHAR)
	        updateForNumerics(value)
	} else {
		switch(value){
        	case 'CE': clearLatest(); break;
        	case 'C': clearAll(); break;
        	case '%': calculatePercentage(value); break;
			case '=': showResult(value); break;
        	default: updateForOperators(value)
		}
	}
}

function updateForNumerics(value) {
	document.querySelector(".total").innerHTML += value;
}

function clearLatest() {
    document.querySelector(".total").innerHTML = ""
}

function clearAll() {
    document.querySelector(".total").innerHTML = ""
    document.querySelector(".acc").innerHTML = ""
    queue = []
}

function calculatePercentage() {
    var currentNumber = document.querySelector(".total").innerHTML
    if (currentNumber != "") {
        document.querySelector(".total").innerHTML = Number(document.querySelector(".total").innerHTML) / 100
    }
}

function showResult(value) {
	currentAcc = document.querySelector(".acc").innerHTML
    currentNumber = document.querySelector(".total").innerHTML

    if (currentAcc[currentAcc.length - 1] === "=" && currentNumber.length > 0)
        document.querySelector(".total").innerHTML = decideOperation(Number(currentNumber), Number(currentNumber), value).toString().substring(0, MAX_VISOR_CHAR)

    if (queue.length === 0) { return }

    queue.push(Number(document.querySelector(".total").innerHTML))
    document.querySelector(".acc").innerHTML += ` ${document.querySelector(".total").innerHTML} = `
    proccessResult()
}

function updateForOperators(value) {
	var currentNumber = document.querySelector(".total").innerHTML

    if (currentNumber.length === 0) { return }

    queue.push(Number(document.querySelector(".total").innerHTML))

    document.querySelector(".acc").innerHTML += ` ${document.querySelector(".total").innerHTML} ${value} `
    document.querySelector(".total").innerHTML = ""

    queue.push(value)
}

function decideOperation(num1, num2, action) {
    switch (action) {
        case '+': return num1 + num2
        case '-': return num1 - num2
        case '*': return num1 * num2
        case '/': return num1 / num2
    }
}

function proccessResult() {
    let action = null
    let current = null

    let total = 0;

    if (isNaN(queue[queue.length - 1]))
        queue.pop()

    queue.forEach(n => {
        if (!isNaN(n)) {
            if (current == null)
                current = n
            else {
                total += decideOperation(current, n, action)
                current = null
            }
        } else {
            action = n
        }
    })

    if (current != null)
        total = decideOperation(total, current, action)

    document.querySelector(".total").innerHTML = total.toString().substring(0, MAX_VISOR_CHAR)
    queue = []
}