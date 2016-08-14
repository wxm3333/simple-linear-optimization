var bestResult = [1000000,[]]

function sum(arr) {
    return arr.reduce(function(a, b) { return a + b }, 0)
}

function get_counts(minCost, items, counts) {
    var mostEx = Math.max.apply(null, items)
    var maxCost = minCost + mostEx
    if (items.length == 1) {
        var count = Math.max(0, Math.ceil(minCost/items[0]))
        var bestCost = Math.round((count * items[0] - minCost)*100)/100
        var newCounts = counts.concat([count])
        if (bestCost < bestResult[0] || (
            bestCost==bestResult[0] && sum(bestResult[1])>sum(newCounts))) {
            bestResult = [bestCost, newCounts]
	}
    }
    else {
        for (var c=0; c<Math.ceil(maxCost/items[0]); c++) {
            get_counts(minCost-c*items[0], items.slice(1), counts.concat([c]))
	}
    }
}

var $minCost = document.getElementById("minCost")
var $items = document.getElementById("items")
var $submit = document.getElementById("submit")
var $results = document.getElementById("results")

$submit.addEventListener("click", function() {
    var minCost = +$minCost.value
    var items = $items.value.split(",").map(function(s) { return +s })
    get_counts(minCost,items,[])
    $results.style.display = ""
    $results.innerHTML =
        "Your best option is to buy the products with prices " +
	items +
	"<br>at quantities: <br>" +
	bestResult[1] +
	"<br>with a total cost of $" +
	(bestResult[0]+minCost)
});
