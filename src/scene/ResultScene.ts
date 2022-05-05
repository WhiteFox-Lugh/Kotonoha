export class ResultScene extends Phaser.Scene {
  constructor() {
    super("result");
  }

  create() {
    const { width, height } = this.game.canvas;
    this.add.text(width / 2, height / 2, "結果シーン").setOrigin(0.5);

    const zone = this.add.zone(width / 2, height / 2, width, height);
    zone.setInteractive({ useHandCursor: true });
    zone.on("pointerdown", () => {
      this.scene.start("select");
    });
  }
}
