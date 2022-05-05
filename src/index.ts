import * as Phaser from "phaser";
import { Scenes } from "./scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // webGLを使うかcanvasを使うかをphaserが自動で判断してくれる
  width: 1280,
  height: 720,
  //resolution: window.devicePixelRatio, // Retina環境で多少見た目がよくなる
  parent: "game-app", // #game-app内にcanvasを生成
  scene: Scenes,
};

new Phaser.Game(config);
