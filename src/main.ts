import { Bodies, Engine, Events, Render, Runner, World } from "matter-js";
import { collision } from "./collision";
import "./style.css";
import Fruit from "./fruit";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>수박 게임</h1>
    <div class="card">
      <div id="game"></div>
    </div>
    <p class="read-the-docs">
      방향키로 과일을 움직이고, 스페이스 바로 과일을 떨어뜨립니다.
    </p>
  </div>
`;

const engine = Engine.create();
const world = engine.world;
const render = Render.create({
  engine,
  element: document.querySelector<HTMLDivElement>("#game")!,
  options: { wireframes: false, background: "#f7f4c8", width: 620, height: 850 },
});

let currentFruit: Fruit | null = null;
let disableAction = false;
let interval: number | null = null;

async function clear(event: KeyboardEvent) {
  switch (event.code) {
    case "ArrowLeft":
    case "ArrowRight":
      clearInterval(interval!);
      interval = null;
      break;
  }
}

function controlAction(event: KeyboardEvent) {
  if (currentFruit === null || disableAction) {
    return;
  }

  switch (event.code) {
    case "Space":
      disableAction = true;
      currentFruit.element.isSleeping = false;
      setTimeout(() => {
        currentFruit = new Fruit();
        World.add(world, currentFruit.element);

        disableAction = false;
      }, 1000);
      break;
    case "ArrowLeft":
      if (interval) {
        return;
      }

      interval = currentFruit.left();
      break;
    case "ArrowRight":
      if (interval) {
        return;
      }

      interval = currentFruit.right();
      break;
  }
}

function init() {
  // Walls
  const leftWall = Bodies.rectangle(15, 395, 30, 790, { isStatic: true, render: { fillStyle: "#E6B143" } });
  const rightWall = Bodies.rectangle(605, 395, 30, 790, { isStatic: true, render: { fillStyle: "#E6B143" } });
  const ground = Bodies.rectangle(310, 820, 620, 60, { isStatic: true, render: { fillStyle: "#E6B143" } });
  const topLine = Bodies.rectangle(310, 150, 620, 2, { isStatic: true, render: { fillStyle: "#E6B143" } });
  topLine.isSensor = true;

  // Add to world
  World.add(world, [leftWall, rightWall, ground, topLine]);
  Render.run(render);
  Runner.run(engine);

  // Events
  document.addEventListener("keyup", clear);
  document.addEventListener("keydown", controlAction);
  Events.on(engine, "collisionStart", collision(world));
  Events.on(engine, "collisionActive", collision(world));

  // Start
  currentFruit = new Fruit();
  World.add(world, currentFruit.element);
}

init();
