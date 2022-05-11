import { DocumentBox, DocumentBoxConfig } from "../class/DocumentBox";

export class TypingScene extends Phaser.Scene {
  private static isJudgeOn: boolean = false;
  private static lineNumber: number = 0;
  private static taskStringArr: Array<string> = [];
  private static taskYomiStringArr: Array<string> = [];

  constructor() {
    super("typing");
  }

  preload() {
    this.load.text("taskText", "../assets/docs/test.txt");
  }

  create() {
    // 課題データ読み込み
    let textData = this.cache.text.get("taskText");
    let splitedData = textData.split("\n");
    for (let idx = 0; 2 * idx < splitedData.length; idx++) {
      TypingScene.taskStringArr.push(splitedData[2 * idx]);
      TypingScene.taskYomiStringArr.push(splitedData[2 * idx + 1]);
    }
    TypingScene.lineNumber = 0;

    const { width, height } = this.game.canvas;
    // フォントの設定
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily:
        '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      fontSize: "28px",
    };
    const yomiTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily:
        '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      fontSize: "22px",
    };
    // DocumentBoxのコンフィグ
    const documentBoxHeight = 250;
    const documentBoxMargin = 20;
    const documentBoxConfig: DocumentBoxConfig = {
      x: width / 2,
      y: documentBoxMargin + documentBoxHeight / 2,
      width: width - documentBoxMargin * 2,
      height: documentBoxHeight,
      padding: 20,
      margin: documentBoxMargin,
      textStyle: textStyle,
      yomiTextStyle: yomiTextStyle,
    };
    // DocumentBoxの作成
    const documentBox = new DocumentBox(this, documentBoxConfig);

    // テキストの設定
    let firstTaskString = TypingScene.taskStringArr[0];
    let firstTaskYomiString = TypingScene.taskYomiStringArr[0];
    documentBox.setText(firstTaskString, firstTaskYomiString);

    // DocumentBoxの表示
    this.add.existing(documentBox);

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
