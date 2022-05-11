export type DocumentBoxConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  padding?: number;
  margin?: number;
  textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
  yomiTextStyle?: Phaser.Types.GameObjects.Text.TextStyle;
};

export class DocumentBox extends Phaser.GameObjects.Container {
  private docMargin: number = 5;
  private box: Phaser.GameObjects.Rectangle;
  private boxPadding: number;
  private taskText: Phaser.GameObjects.Text;
  private yomiText: Phaser.GameObjects.Text;

  constructor(
    public scene: Phaser.Scene,
    {
      x,
      y,
      width,
      height,
      padding = 20,
      margin = 20,
      textStyle = {},
      yomiTextStyle = {},
    }: DocumentBoxConfig
  ) {
    super(scene, 0, 0);
    this.boxPadding = padding;

    // 課題文枠の作成
    this.box = new Phaser.GameObjects.Rectangle(
      this.scene,
      x,
      y,
      width,
      height,
      0x222222
    ).setStrokeStyle(1, 0xffffff);
    this.add(this.box);

    const boxWidth = width - this.boxPadding * 2;
    const taskTextStyle = {
      ...textStyle,
      wordWrap: {
        width: boxWidth,
        useAdvancedWrap: true,
      },
    };
    const taskYomiTextStyle = {
      ...yomiTextStyle,
      wordWrap: {
        width: boxWidth,
        useAdvancedWrap: true,
      },
    };
    const textX = x;
    const textY = y - height / 2 + this.boxPadding;
    this.taskText = new Phaser.GameObjects.Text(
      this.scene,
      textX,
      textY,
      "",
      taskTextStyle
    ).setOrigin(0.5, 0);
    this.add(this.taskText);

    this.yomiText = new Phaser.GameObjects.Text(
      this.scene,
      textX,
      textY,
      "",
      taskYomiTextStyle
    ).setOrigin(0.5, 0);
    this.add(this.yomiText);
  }

  // 課題文章のセット
  public setText(task: string, yomi: string) {
    this.taskText.setText(task);
    const yomiYPosition =
      this.box.y -
      this.box.height / 2 +
      this.boxPadding +
      this.docMargin +
      this.taskText.displayHeight;
    this.yomiText.setText(yomi);
    this.yomiText.setY(yomiYPosition);
  }
}
