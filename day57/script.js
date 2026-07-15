console.log("heyy");

// let box = document.getElementsByClassName("box")
// console.log(box)

// box[2].style.backgroundColor = "green"
// document.getElementById("red").style.backgroundColor = "red"

// document.querySelector(".box").style.backgroundColor = "red";

console.log(document.querySelectorAll(".box"));

document.querySelectorAll(".box").forEach(e => {
    e.style.backgroundColor = "green";
});