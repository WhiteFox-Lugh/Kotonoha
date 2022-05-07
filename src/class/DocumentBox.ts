export type DocumentBoxConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  padding?: number;
  margin?: number;
  textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
};

export class DocumentBox extends Phaser.GameObjects.Container {
  private box: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;

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
    }: DocumentBoxConfig
  ) {
    super(scene, 0, 0);

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

    const boxWidth = width - padding * 2;
    const DocumentBoxTextStyle = {
      ...textStyle,
      wordWrap: {
        width: boxWidth,
        useAdvancedWrap: true,
      },
    };
    const textX = x + padding;
    const textY = y - height / 2 + padding;
    this.text = new Phaser.GameObjects.Text(
      this.scene,
      textX,
      textY,
      "",
      DocumentBoxTextStyle
    ).setOrigin(0.5, 0);
    this.add(this.text);
  }

  // 課題文章のセット
  public setText(text: string) {
    this.text.setText(text);
  }
}
