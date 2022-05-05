export class TypingScene extends Phaser.Scene {
  private static isJudgeOn: boolean = false;

  constructor() {
    super("typing");
  }

  create() {
    const { width, height } = this.game.canvas;
    this.add.text(width / 2, height / 2, "練習シーン").setOrigin(0.5);
    TypingScene.isJudgeOn = true;
    const zone = this.add.zone(width / 2, height / 2, width, height);
    zone.setInteractive({ useHandCursor: true });
    zone.on("pointerdown", () => {
      TypingScene.isJudgeOn = false;
      this.scene.start("result");
    });
  }

  public static judge(str: string) {
    if (!this.isJudgeOn) {
      return;
    }
    console.log(str);
  }
}

window.addEventListener("keydown", (e: KeyboardEvent) => {
  // ブラウザのファンクションキー等の効果を排除するには以下
  // e.preventDefault();
  const onShift = e.shiftKey;
  let keyCode = e.code;
  if (keyCode !== "ShiftRight" && keyCode !== "ShiftLeft" && onShift) {
    keyCode = keyCode + "_SH";
  }
  TypingScene.judge(keyCode);
});
