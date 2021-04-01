import { Vector2 } from "../common/Vector2.js";
import { CharacterBase } from "../common/CharacterBase.js";

export class Player extends CharacterBase {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx - 描画などに利用する 2D コンテキスト
   * @param {number} x - X 座標
   * @param {number} y - Y 座標
   * @param {Image} image - キャラクターの画像
   */
  constructor(ctx, x, y, w, h, imagePath) {
    // Character クラスのコンストラクタを呼び出し初期化
    // constructor(ctx, x, y, life, image)
    super(ctx, x, y, w, h, 0, imagePath);

    /**
     * 自身の移動スピード（update 一回あたりの移動量）
     * @type {number}
     */
    this.speed = 3;

    /**
     * viper が登場中かどうかを表すフラグ
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

    /**
     * 自身が持つショットインスタンスの配列
     * @type{Array<Shot>}
     */
    this.slantingShotArray = null;

    /**
     * 自身が持つslantingショットインスタンスの配列
     * @type{Array<Shot>}
     */
    this.slantingShotArray = null;

    /**
     * ショットを打った後のチェック用カウンター
     */
    this.shotCheckCounter = 0;

    /**
     * ショットを打つことができる間隔(フレーム数を基準とする)
     */
    this.shotInterval = 10;
  }

  /**
   * ショットを設定する
   * @param{Array<Shot>} - 自身に設定するショットの配列
   */
  setShotArray(shotArray, slantingShotArray) {
    // 自身のプロパティに設定する
    this.shotArray = shotArray;
    this.slantingShotArray = slantingShotArray;
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

  update() {
    // 登場シーンの処理
    if (this.isComing === true) {
      // 登場シーンが始まってからの経過時間
      let justTime = Date.now();
      this.comingTime = (justTime - this.comingStart) / 1000;
      // 登場中は時間が経つほど右に向かって進む
      let x = -50 + this.comingTime * 50;
      // 一定の位置まで移動したら登場シーンを終了する
      if (x >= this.comingEndPosition.x) {
        this.isComing = false; // 登場シーンフラグを下ろす
        x = this.comingEndPosition.x; // 行き過ぎの可能性もあるので位置を再設定
      }
      // 求めたX座標を自機に設定する
      this.position.set(x, this.position.y);
      // justTime を 100 で割ったとき余りが 50 より小さくなる場合だけ半透明にする
      if (justTime % 100 < 50) {
        this.ctx.globalAlpha = 0.5;
      }
    } else {
      // キーの押下状態を調べて挙動を変える
      if (window.isKeyDown.key_ArrowLeft === true) {
        this.position.x -= this.speed; // アローキーの左
      }
      if (window.isKeyDown.key_ArrowRight === true) {
        this.position.x += this.speed; // アローキーの右
      }
      if (window.isKeyDown.key_ArrowUp === true) {
        this.position.y -= this.speed; // アローキーの上
      }
      if (window.isKeyDown.key_ArrowDown === true) {
        this.position.y += this.speed; // アローキーの下
      }
      // 移動後の位置が画面外へ出ていないか確認して修正する
      let canvasWidth = this.ctx.canvas.width;
      let canvasHeight = this.ctx.canvas.height;
      let tx = Math.min(Math.max(this.position.x, 0), canvasWidth);
      let ty = Math.min(Math.max(this.position.y, 0), canvasHeight);
      this.position.set(tx, ty);

      // キーの押下状態を調べてショットを生成する
      if (window.isKeyDown.key_z === true) {
        // ショットを打てる状態なのか確認する
        // ショットチェック用カウンターが0以上ならショットを生成できる
        if (this.shotCheckCounter >= 0) {
          // iを何度も使用する為あらかじめっ初期化する
          let i;
          // ショットの生存を確認し非生存の物があれば生成する
          for (let i = 0; i < this.shotArray.length; i++) {
            if (this.shotArray[i].life <= 0) {
              this.shotArray[i].set(this.position.x, this.position.y);
              // ショットを生成したのでインターバルを設定する
              this.shotCheckCounter = -this.shotInterval;
              // 1つ生成したらループを抜ける
              break;
            }
          }
        }
      }
      // ショットチェック用のカウンターをインクリメントする
      ++this.shotCheckCounter;
    }
    // 自機キャラクターを描画する
    this.draw();

    // 念の為グローバルなアルファの状態を元に戻す
    this.ctx.globalAlpha = 1.0;
  }
}
