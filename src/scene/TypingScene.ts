import { DocumentBox, DocumentBoxConfig } from "../class/DocumentBox";

export class TypingScene extends Phaser.Scene {
  private static isJudgeOn: boolean = false;
  private static taskString: string = "課題文章 - Task - 0123'";
  private static taskYomiString: string = "かだいぶんしょう";

  constructor() {
    super("typing");
  }

  create() {
    const { width, height } = this.game.canvas;
    // フォントの設定
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily:
        '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      fontSize: "24px",
    };
    // DialogBoxのコンフィグ
    const dialogBoxHeight = 150;
    const dialogBoxMargin = 20;
    const dialogBoxConfig: DocumentBoxConfig = {
      x: width / 2,
      y: dialogBoxMargin + dialogBoxHeight / 2,
      width: width - dialogBoxMargin * 2,
      height: dialogBoxHeight,
      padding: 20,
      margin: dialogBoxMargin,
      textStyle: textStyle,
    };
    // DialogBoxの作成
    const dialogBox = new DocumentBox(this, dialogBoxConfig);

    // テキストの設定
    dialogBox.setText(TypingScene.taskString);

    // DialogBoxの表示
    this.add.existing(dialogBox);

    // 判定
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
