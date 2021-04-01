import { Vector2 } from "../common/Vector2.js";
import { CharacterBase } from "../common/CharacterBase.js";

export class Shot extends CharacterBase {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {image} image
   */
  constructor(ctx, x, y, w, h, imagePath) {
    // 継承元の初期化
    super(ctx, x, y, w, h, 0, imagePath);
    /**
     * 自身の移動スピード(update1回あたりの移動量)
     * @type{number}
     */
    this.speed = 7;
  }

  /**
   * ショットを配置する
   * @param{number} x
   * @param{number} y
   */
  set(x, y) {
    // 登場配置位置にショットを移動させる
    this.position.set(x, y);
    // ショットのライフを0より大きい値に設定する
    this.life = 1;
  }

  /**
   * キャラクターの状態を更新し、描画も行う
   */
  update() {
    // もしショットのライフが0以下の場合、何もしない
    if (this.life <= 0) {
      return;
    }
    // もしショットが画面外へ移動していたらライフを0に設定する
    if (this.position.x + this.width > this.ctx.canvas.width) {
      this.life = 0;
    }
    // ショットを右に向かって移動させる
    this.position.x += this.speed;
    // ショットを描画する
    this.draw();
  }
}
