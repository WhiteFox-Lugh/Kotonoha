export class LoadingScene extends Phaser.Scene {
  constructor() {
    super("loading");
  }

  preload() {}

  create() {
    const { width, height } = this.game.canvas;
    this.add.text(width / 2, height / 2, "Now Loading...").setOrigin(0.5);
    this.load.image("fursona", "assets/dev_icon.png");
    this.load.on("complete", () => {
      this.scene.start("title");
    });
    // アセットのロード開始
    // preload 以外の load
    this.load.start();
  }
}
