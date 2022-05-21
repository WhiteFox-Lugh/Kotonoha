import * as Phaser from "phaser";
import { Scenes } from "./scene";
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: "game-app",
  scene: Scenes,
  dom: {
    createContainer: true,
  },
};

new Phaser.Game(config);
