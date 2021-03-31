import { Vector2 } from "./Vector2.js";

export class CharacterBase {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx - 描画などに利用する 2D コンテキスト
   * @param {number} x - X 座標
   * @param {number} y - Y 座標
   * @param {number} life - 生存フラグ
   * @param {Image} image - キャラクターの画像
   */
  constructor(ctx, x, y, width, height, life, image) {
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
     * @type {Image}
     */
    this.image = image;
  }

  /**
   * キャラクターを描画する
   */
  draw() {
    // キャラクターの幅を考慮してオフセットする量
    const offsetY = this.height / 2;

    // キャラクターの幅やオフセットする量を加味して描画する
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y - offsetY,
      this.width,
      this.height
    );
  }
}
