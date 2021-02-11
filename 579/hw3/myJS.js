/* Excercise 1 */

/* Write a function that changes the text and the color inside the div */
function changeColor(self){
    //// Write a condition determine what color it should be changed to
    // https://stackoverflow.com/questions/10556185/style-backgroundcolor-is-an-empty-string-in-javascript
    let myText = document.getElementById("color-name");

    if(window.getComputedStyle(self)['backgroundColor'] === "rgb(240, 128, 128)"){
        //// Change the background color using JS
        //// Change the text of the color using the span id color-name
        self.style.backgroundColor = "#6A0DAD";
        myText.textContent = "#6A0DAD";
    }
    else{
        //// Change the background color using JS
        //// Change the text of the color using the span id color-name
        self.style.backgroundColor = "#F08080";
        myText.textContent = "#F08080";
    }
}


/* For excercise 2, you need to write an event handler for the button id "convertbtn"
* on mouse click. For best practice use addEventListener. */

var myButton = document.getElementById("convertbtn");
if(myButton){
    myButton.addEventListener("click", () => { convertTemp();})
}

/* Then write a function that calculates Fahrenheit to Celsius and display it on the webpage */
function convertTemp(){
    //// Calculate the temperature here
    let inTemp = document.getElementById('f-input').value
    let outTemp = (inTemp - 32) * (5/9);
    //console.log(inTemp, outTemp);

    //// Send the calculated temperature to HTML
    let output = document.getElementById('c-output')
    console.log(output);
    output.innerText = outTemp;
}