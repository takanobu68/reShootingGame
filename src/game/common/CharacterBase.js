import { Vector2 } from "./Vector2.js";

export class CharacterBase {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx - 描画などに利用する 2D コンテキスト
   * @param {number} x - X 座標
   * @param {number} y - Y 座標
   * @param {number} w - 幅
   * @param {number} h - 高さ
   * @param {number} life - キャラクターのライフ（生存フラグを兼ねる）
   * @param {string} imagePath - キャラクター用の画像のパス
   */
  constructor(ctx, x, y, w, h, life, imagePath) {
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = ctx;

    /**
     * @type {Position}
     */
    this.position = new Vector2(x, y);

    /**
     * @type{number}
     */
    this.width = width;

    /**
     * @type {number}
     */
    this.height = height;

    /**
     *
     * @type {number}
     */
    this.life = life;

    /**
     * @type{boolean}
     */
    this.ready = false;

    /**
     * @type {Image}
     */
    this.image = new Image();
    this.image.addEventListener("load", () => {
      // 画像のロードが完了したら準備完了フラグを立てる
      this.ready = true;
    });
    this.image.src = imagePath;
  }

  /**
   * キャラクターを描画する
   */
  draw() {
    // キャラクターの幅を考慮してオフセットする量
    const offsetX = this.width / 2;
    const offsetY = this.height / 2;

    // キャラクターの幅やオフセットする量を加味して描画する
    this.ctx.drawImage(
      this.image,
      this.position.x - offsetX,
      this.position.y - offsetY,
      this.width,
      this.height
    );
  }
}
