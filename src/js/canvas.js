import utils, { randomColor, randomIntFromRange } from "./utils";
import * as dat from "dat.gui";
const swift = new dat.GUI();
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;
// canvas.style.backgroundColor = "black";

const bacgroundcolor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01,
};

const backgroundfolder = swift.addFolder("Background");
backgroundfolder.add(bacgroundcolor, "r", 0, 255);
backgroundfolder.add(bacgroundcolor, "g", 0, 255);
backgroundfolder.add(bacgroundcolor, "b", 0, 255);
backgroundfolder.add(bacgroundcolor, "a", 0.01, 1);

const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitube: 70,
  frequency: 0.04,
  width: 2,
};
const wavefolder = swift.addFolder("wave");
wavefolder.add(wave, "y", 0, canvas.height);
wavefolder.add(wave, "length", -0.01, 0.001);
wavefolder.add(wave, "amplitube", -100, 100);
wavefolder.add(wave, "frequency", -0.01, 1);
wavefolder.add(wave, "width", 1, 10);

let strokecoloe = {
  h: 200,
  s: 50,
  l: 50,
};
const strokefolder = swift.addFolder("strokes");
strokefolder.add(strokecoloe, "h", 0, 255);
strokefolder.add(strokecoloe, "s", 0, 100);
strokefolder.add(strokecoloe, "l", 0, 100);

let increment = wave.frequency;
// let color = randomIntFromRange(0, 255);
// let show = 50;
// let light = 50;

// let cr2 = "hsl(" + color + "," + show + "%," + light + "%)";
let ping;

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.1)";
  // c.fillStyle = `rgba(${bacgroundcolor.r},${bacgroundcolor.g},${bacgroundcolor.b},${bacgroundcolor.a})`
  c.fillRect(0, 0, canvas.width, canvas.height);
  // c.clearRect(0, 0,canvas.width, canvas.height);
  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(
      i,
      wave.y +
        Math.sin(i * wave.length + increment) *
          (wave.amplitube * Math.sin(increment))
    );
  }
  c.strokeStyle = `hsl(${Math.abs(strokecoloe.h * Math.sin(increment))},${
    strokecoloe.s
  }%,${strokecoloe.l}%)`;
  c.stroke();
  c.lineWidth = wave.width;
  increment += wave.frequency;
}

animate();
