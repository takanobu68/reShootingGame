import { Vector2 } from "../common/Vector2.js";
import { CharacterBase } from "../common/CharacterBase.js";

export class Player extends CharacterBase {
  constructor(ctx, x, y, image) {
    // CharacterBaseクラスのコンストラクタを呼び出し初期化する
    // CharacterBase constructor(ctx, x, y, life, image)
    super(ctx, x, y, 0, image);

    /**
     * playerが登場中かどうかを表すフラグ
     * @type {boolean}
     */
    this.isComing = false;

    /**
     * 登場演出を開始した際のタイムスタンプ
     * @type {number}
     */
    this.comingStart = null;

    /**
     * 登場演出を完了とする座標
     * @type {Position}
     */
    this.comingEndPosition = null;
  }

  /**
   * 登場演出に関する設定を行う
   * @param {number} startX - 登場開始時の X 座標
   * @param {number} startY - 登場開始時の Y 座標
   * @param {number} endX - 登場終了とする X 座標
   * @param {number} endY - 登場終了とする Y 座標
   */
  setComing(startX, startY, endX, endY) {
    // 登場中のフラグを立てる
    this.isComing = true;
    // 登場開始時のタイムスタンプを取得する
    this.comingStart = Date.now();
    // 登場開始位置に自機を移動させる
    this.position.set(startX, startY);
    // 登場終了とする座標を設定する
    this.comingEndPosition = new Vector2(endX, endY);
  }
}
