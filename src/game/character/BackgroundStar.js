import { Vector2 } from "../common/Vector2.js";

export class BackgroundStar {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx - 描画などに利用する 2D コンテキスト
   * @param {number} size - 星の大きさ（幅・高さ）
   * @param {number} speed - 星の移動速度
   * @param {string} [color='#ffffff'] - 星の色
   */
  constructor(ctx, size, speed, color = "#ffffff") {
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = ctx;
    /**
     * 星の大きさ（幅・高さ）
     * @type {number}
     */
    this.size = size;
    /**
     * 星の移動速度
     * @type {number}
     */
    this.speed = speed;
    /**
     * 星を fill する際の色
     * @type {string}
     */
    this.color = color;
    /**
     * 自身の座標
     * @type {Position}
     */
    this.position = null;
  }

  /**
   * 星を設定する
   * @param {number} x - 星を発生させる X 座標
   * @param {number} y - 星を発生させる Y 座標
   */
  set(x, y) {
    // 引数を元に位置を決める
    this.position = new Vector2(x, y);
  }

  /**
   * 星を更新する
   */
  update() {
    // 星の色を設定する
    this.ctx.fillStyle = this.color;
    // 星の現在位置を速度に応じて動かす
    this.position.x += this.speed;
    // 星の矩形を描画する
    this.ctx.fillRect(
      this.position.x - this.size / 2,
      this.position.y - this.size / 2,
      this.size,
      this.size
    );
    // もし画面下端よりも外に出てしまっていたら上端側に戻す
    if (this.position.x + this.size > this.ctx.canvas.width) {
      this.position.x = this.size;
    }
  }
}
