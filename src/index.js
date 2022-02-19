import "../node_modules/reset-css";
import * as THREE from "../node_modules/three";
import Nebula, { SpriteRenderer } from "../node_modules/three-nebula";
import getThreeApp from "./three-app";
import json from "./my-particle-system.json";

function animate(nebula, app) {
  requestAnimationFrame(() => animate(nebula, app));

  nebula.update();
  app.renderer.render(app.scene, app.camera);
}

Nebula.fromJSONAsync(json, THREE).then(loaded => {
  const app = getThreeApp();
  const nebulaRenderer = new SpriteRenderer(app.scene, THREE);
  const nebula = loaded.addRenderer(nebulaRenderer);

  animate(nebula, app);
});

