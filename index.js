//Add a number
$(document).ready(function () {
  $(".number").click(function () {
    const number = $(".bottom").text();
    const input = $(this).val();

    $(".bottom").text(function () {
      return `${number}${input}`;
    });
  });
});

//Convert to decimal
$(document).ready(function () {
  $(".decimal").click(function () {
    const number = $(".bottom").text();

    $(".bottom").text(function () {
      return `0.${number}`;
    });
  });
});

//Convert to negative number
$(document).ready(function () {
  $(".negative").click(function () {
    const number = $(".bottom").text();

    $(".bottom").text(function () {
      return `-(${number})`;
    });
  });
});

//Use an operator
$(document).ready(function () {
  $(".operator, .key").click(function () {
    const text = $(".top").text();
    const number = $(".bottom").text();
    const operator = $(this).val();

    $(".top").text(function () {
      if (text == "") {
        return `${number} ${operator}`;
      } else if (operator == "") {
        return `${text} ${number}`;
      }
      return `${text} ${number} ${operator}`;
    });

    $(".bottom").text(function () {
      return "";
    });
  });
});

//Calculate
$(document).ready(function () {
  $(".key").click(function () {
    const text = $(".top").text();
    let input = text.split(" "); //Reverse so that the last operation maintains its order while a new array is being created.
    let orderedInput = [];
    let output = "";
    let dynamicIndex = "";

    $(".top").text(function () {
      return "";
    });

    //Order operations (PEMDAS)
    input.forEach((entry) => {
      let operatorIndex = input.indexOf(entry);
      let firstValueIndex = operatorIndex - 1;
      let secondValueIndex = operatorIndex + 1;

      if (entry === "*" || entry === "/") {
        //For the first entry (multiplication or division)
        if (orderedInput.length === 0) {
          orderedInput.unshift(
            input[firstValueIndex],
            input[operatorIndex],
            input[secondValueIndex]
          );
          //For succeeding entries (multiplication or division)
        } else {
          orderedInput.push(input[input.indexOf(entry)]);
          orderedInput.push(input[secondValueIndex]);
          console.log(entry);
        }
      }
    });

    console.log(orderedInput);

    input.forEach((entry) => {
      const operatorIndex = input.lastIndexOf(entry);
      const firstValueIndex = operatorIndex - 1;
      const secondValueIndex = operatorIndex + 1;
      if (entry === "+" || entry === "-") {
        if (orderedInput.length === 0) {
          orderedInput.push(input[firstValueIndex]);
          orderedInput.push(input[operatorIndex]);
          orderedInput.push(input[secondValueIndex]);
        } else {
          orderedInput.push(input[operatorIndex]);
          if (input[secondValueIndex] === undefined) {
            orderedInput.push(input[firstValueIndex]);
          } else {
            orderedInput.push(input[secondValueIndex]);
          }
        }
      }
    });

    console.log(orderedInput);

    //For the first calculation
    $(".bottom").text(function () {
      if (orderedInput[1] === "+") {
        output = parseInt(orderedInput[0]) + parseInt(orderedInput[2]);
      } else if (orderedInput[1] === "-") {
        output = parseInt(orderedInput[0]) - parseInt(orderedInput[2]);
      } else if (orderedInput[1] === "*") {
        output = parseInt(orderedInput[0]) * parseInt(orderedInput[2]);
      } else if (orderedInput[1] === "/") {
        output = parseInt(orderedInput[0]) / parseInt(orderedInput[2]);
      }
      orderedInput.splice(0, 3);

      //For the following calculations
      while (orderedInput.length >= 2) {
        if (orderedInput[0] === "+") {
          output = output + parseInt(orderedInput[1]);
        } else if (orderedInput[0] === "-") {
          output = output - parseInt(orderedInput[1]);
        } else if (orderedInput[0] === "*") {
          output = output * parseInt(orderedInput[1]);
        } else if (orderedInput[0] === "/") {
          output = output / parseInt(orderedInput[1]);
        }
        orderedInput.splice(0, 2);
      }
      return output;
      //console.log(eval(calc));
    });
  });
});

//Reset
$(document).ready(function () {
  $(".clear").click(clear);
});

function clear() {
  $(".screen").text(function () {
    return "";
  });
}

// let bottom = document.querySelector(".bottom-screen").textContent;
// var btn = document.querySelectorAll("button");

// btn.addEventListener("click", function () {
//   console.log(bottom);
//   console.log("hello");
// });
