export class TitleScene extends Phaser.Scene {
  constructor() {
    super("title");
  }

  create() {
    const { width, height } = this.game.canvas;
    const widthCenter = width / 2;
    const heightCenter = height / 2;
    const clickToStartYOffset = 60;
    this.add
      .text(widthCenter, heightCenter, "Title")
      .setOrigin(0.5)
      .setFontSize(36);
    this.add
      .text(widthCenter, heightCenter + clickToStartYOffset, "Click to Start")
      .setOrigin(0.5);

    const clickZone = this.add.zone(widthCenter, heightCenter, width, height);
    clickZone.setInteractive({ useHandCursor: true });
    clickZone.on("pointerdown", () => {
      this.scene.start("select", { timelineID: "start" });
    });
  }
}
