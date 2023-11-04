import { Bodies, Body } from "matter-js";
import { FRUITS } from "./fruits";

class Fruit {
  element: Body;

  constructor() {
    const index = Math.floor(Math.random() * 5);
    const fruit = FRUITS[index];

    this.element = Bodies.circle(300, 50, fruit.radius, {
      label: `${index}:fruit`,
      restitution: 0.2,
      isSleeping: true,
      render: { sprite: { texture: fruit.src, xScale: 1, yScale: 1 } },
    });
  }

  left() {
    return setInterval(() => {
      Body.setPosition(this.element, {
        x:
          this.element.position.x - this.element.circleRadius! > 30
            ? this.element.position.x - 1
            : this.element.position.x,
        y: this.element.position.y,
      });
    }, 1);
  }

  right() {
    return setInterval(() => {
      Body.setPosition(this.element, {
        x:
          this.element.position.x + this.element.circleRadius! <
          (window.screen.width >= 1000 ? 590 : window.screen.width - 30)
            ? this.element.position.x + 1
            : this.element.position.x,
        y: this.element.position.y,
      });
    }, 1);
  }
}

export default Fruit;
