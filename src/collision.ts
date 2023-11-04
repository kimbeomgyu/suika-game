import { Bodies, Engine, IEventCollision, World } from "matter-js";
import { FRUITS } from "./fruits";

export const collision = (world: World) => (event: IEventCollision<Engine>) => {
  event.pairs.forEach((collision) => {
    const { bodyA, bodyB } = collision;
    if (!bodyA.label.includes("fruit") || !bodyB.label.includes("fruit")) {
      return;
    }

    console.log(bodyA.label, bodyB.label);
    if (bodyA.label === bodyB.label) {
      const [index] = bodyA.label.split(":");
      World.remove(world, [bodyA, bodyB]);

      const fruit = FRUITS[Number(index) + 1];
      const newBody = Bodies.circle(
        collision.collision.supports[0].x,
        collision.collision.supports[0].y,
        fruit.radius,
        {
          restitution: 0.2,
          label: `${Number(index) + 1}:fruit`,
          render: { sprite: { texture: fruit.src, xScale: 1, yScale: 1 } },
        }
      );
      World.add(world, newBody);
    }
  });
};
