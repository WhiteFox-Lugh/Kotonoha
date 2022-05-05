export class SelectScene extends Phaser.Scene {
  constructor() {
    super("select");
  }

  create() {
    const { width, height } = this.game.canvas;

    this.add.image(width / 2, height / 2, "fursona");
    this.add.text(width / 2, height / 2 + 180, "セレクトシーン").setOrigin(0.5);

    const zone = this.add.zone(width / 2, height / 2, width, height);
    zone.setInteractive({
      useHandCursor: true,
    });
    zone.on("pointerdown", () => {
      this.scene.start("typing"); // TypingSceneに遷移
    });
  }
}
