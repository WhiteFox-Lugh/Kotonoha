import { DocumentBox, DocumentBoxConfig } from "../class/DocumentBox";
import { TextEdit } from "phaser3-rex-plugins/plugins/textedit.js";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext.js";

export class TypingScene extends Phaser.Scene {
  private readonly fontFamily =
    '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif';
  private readonly taskTextSize = "28px";
  private readonly yomiTextSize = "20px";
  private readonly documentBoxHeight = 250;
  private readonly documentBoxMargin = 20;
  private readonly documentBoxPadding = 20;
  private readonly inputFieldHeight = 50;
  private readonly inputFieldBgColor = "#222222";
  private readonly inputFieldFontSize = "22px";
  private static isJudgeOn = false;
  private static lineNumber = 0;
  private static taskStringArr: string[] = [];
  private static taskYomiStringArr: string[] = [];
  private static documentBox: DocumentBox;

  constructor() {
    super("typing");
  }

  preload() {
    this.load.text("taskText", "../assets/docs/test.txt");
  }

  create() {
    // 課題文読み込み
    this.readTaskData();

    // UI の初期化
    this.initUI();

    // テキストの設定
    TypingScene.lineNumber = 0;
    const firstTaskString = TypingScene.taskStringArr[0];
    const firstTaskYomiString = TypingScene.taskYomiStringArr[0];
    TypingScene.documentBox.setText(firstTaskString, firstTaskYomiString);

    // 判定
    TypingScene.isJudgeOn = true;
  }

  private initUI(): void {
    const { width, height } = this.game.canvas;
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: this.fontFamily,
      fontSize: this.taskTextSize,
    };
    const yomiTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: this.fontFamily,
      fontSize: this.yomiTextSize,
    };

    // DocumentBox の生成
    const documentBoxPosX = width / 2;
    const documentBoxPosY = this.documentBoxMargin + this.documentBoxHeight / 2;
    const documentBoxWidth = width - this.documentBoxMargin * 2;
    const documentBoxConfig: DocumentBoxConfig = {
      x: documentBoxPosX,
      y: documentBoxPosY,
      width: documentBoxWidth,
      height: this.documentBoxHeight,
      padding: this.documentBoxPadding,
      margin: this.documentBoxMargin,
      textStyle: textStyle,
      yomiTextStyle: yomiTextStyle,
    };
    TypingScene.documentBox = new DocumentBox(this, documentBoxConfig);
    this.add.existing(TypingScene.documentBox);

    // 入力フィールドの生成
    const inputY = this.documentBoxMargin * 2 + this.documentBoxHeight;
    const inputWidth = width - this.documentBoxMargin * 2;
    const textGameObject = this.add
      .text(width / 2, inputY, "", {
        align: "center",
        fixedHeight: this.inputFieldHeight,
        fixedWidth: inputWidth,
        backgroundColor: this.inputFieldBgColor,
        fontFamily: this.fontFamily,
        fontSize: this.inputFieldFontSize,
      })
      .setOrigin(0.5, 0)
      .setInteractive();

    const editor = new TextEdit(textGameObject);

    textGameObject.on(
      "pointerdown",
      function () {
        editor.open({
          type: "text",
          enterClose: false,
          onTextChanged(_, text) {
            textGameObject.text = text;
          },
        });
      },
      this
    );
    this.add.existing(textGameObject);
  }

  /**
   * 課題文章を読み込む
   * 存在しなければセレクト画面へ戻る
   * @returns なし
   */
  private readTaskData(): void {
    // 課題データ読み込み
    const textData: string | null | undefined = this.cache.text.get("taskText");
    if (textData == null) {
      this.scene.start("select");
      return;
    }
    const splitedData = textData.split("\n");
    for (let idx = 0; 2 * idx < splitedData.length; idx++) {
      TypingScene.taskStringArr.push(splitedData[2 * idx]);
      TypingScene.taskYomiStringArr.push(splitedData[2 * idx + 1]);
    }
  }

  /**
   * [一時的] 入力を key で受け取る
   * judge ではなくなると思う
   * @param str
   * @returns
   */
  public static judge(str: string): void {
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
