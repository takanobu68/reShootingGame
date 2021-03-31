import { Vector2 } from "./Vector2.js";

export class CharacterBase {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx - 描画などに利用する 2D コンテキスト
   * @param {number} x - X 座標
   * @param {number} y - Y 座標
   * @param {number} life - キャラクターのライフ（生存フラグを兼ねる）
   * @param {Image} image - キャラクターの画像
   */

  constructor(ctx, x, y, life, image) {
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = ctx;
    /**
     * @type {Position}
     */
    this.position = new Position(x, y);
    /**
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
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
