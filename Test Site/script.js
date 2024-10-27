document.getElementById("submitButton").addEventListener("click", function() {
    const svg = document.getElementById("logo");
    if (svg) {
        svg.style.transform = "scale(1.5) skew(10deg, 10deg)"; // Apply distortion
    } else {
        console.log("SVG element not found!");
    }
});

function test () {
    console.log("test");
}