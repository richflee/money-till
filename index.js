
window.onload = function() {

    function loadScript(url) {
        var script = document.createElement("script");  // create a script DOM node
        script.src = url;  // set its src to the provided URL
        document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function displayRandomItemPrice() {
        var randomNum = Math.round(getRandomArbitrary(1, 33) * 100) / 100;
        var priceDisplayPara = document.getElementById("price-display");
        priceDisplayPara.textContent = '$' + randomNum;
    }

    loadScript('calculate-change.js');
    displayRandomItemPrice();
    
    
    
    var submitBtn = document.getElementById("submit-payment");
    var refreshBtn = document.getElementById("refresh-button");
    
    refreshBtn.addEventListener("click", function() {
        displayRandomItemPrice();
        document.getElementById("payment-input").value = '';
    });

    submitBtn.addEventListener("click", function() {
        var paymentInput = +document.getElementById("payment-input").value;
        var itemPrice = +document.getElementById("price-display").innerText.replace('$', '');
        console.log(changeMachine.pay(itemPrice, paymentInput));
    });
}