import { CharacterBase } from "../common/CharacterBase.js";

export class Enemy extends CharacterBase {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx - 描画などに利用する 2D コンテキスト
   * @param {number} x - X 座標
   * @param {number} y - Y 座標
   * @param {number} w - 幅
   * @param {number} h - 高さ
   * @param {Image} image - キャラクター用の画像のパス
   */
  constructor(ctx, x, y, w, h, imagePath) {
    // 継承元の初期化
    super(ctx, x, y, w, h, 0, imagePath);

    /**
     * 自身のタイプ
     * @type{string}
     */
    this.type = "default";

    /**
     * 自身が出現してからのフレーム数
     * @type{number}
     */
    this.frame = 0;

    /**
     * 自身の移動スピード
     * @type {number}
     */
    this.speed = 5;

    /**
     * ショットを格納する配列
     * @type {Array<Shot>}
     */
    this.shotArray = null;
  }

  /**
   * 敵を配置する
   * @param {number} x - 配置する X 座標
   * @param {number} y - 配置する Y 座標
   * @param {number} [life=1] - 設定するライフ
   */
  set(x, y, life = 1, type = "default") {
    // 登場開始位置に敵キャラクターを移動させる
    this.position.set(x, y);
    // 敵キャラクターのライフを0より大きい値(生存の状態)にする
    this.life = life;
    // 敵キャラクターのタイプを設定する
    this.type = type;
    // 敵キャラクターのフレームを設定する
    this.frame = 0;
  }

  /**
   * ショットを設定する
   * @param{Array<Shot>} - 自身に設定するショットの配列
   */
  setShotArray(shotArray) {
    // 自身のプロパティに設定する
    this.shotArray = shotArray;
  }

  /**
   * 自身から指定された方向にショットを放つ
   * @param{number}[x=-1.0] - 進行方向のX要素
   * @param{number}[y=0.0] - 進行方向のY要素
   */
  fire(x = -1.0, y = 0.0) {
    // ショットの生存を確認し非生存のものがあれば生成する
    for (let i = 0; i < this.shotArray.length; i++) {
      // 非生存かどうか確認する
      if (this.shotArray[i].life <= 0) {
        // 敵キャラクターの座標にショットを生成する
        this.shotArray[i].set(this.position.x, this.position.y);
        // ショットのスピードを設定する
        this.shotArray[i].setSpeed(10.0);
        // ショットの進行方向を設定する
        this.shotArray[i].setVector(x, y);
        // 1つ生成したらループを抜ける
        break;
      }
    }
  }

  /**
   * キャラクターの状態を更新し描画を行う
   */
  update() {
    // もし敵キャラクターのライフが0以下なら何もしない
    if (this.life <= 0) {
      return;
    }

    // タイプに応じて挙動を変える
    // タイプに応じてライフを0にする条件も変える
    switch (this.type) {
      case "default":
      default:
        // 配置後のフレームが50のときにショットを放つ
        if (this.frame === 50) {
          this.fire();
        }
        // 敵キャラクターを進行方向に沿って移動させる
        this.position.x += this.vector.x * this.speed;
        this.position.y += this.vector.y * this.speed;
        // もし敵キャラクターが画面外(画面左端)へ移動していたらライフを0(非生存の状態)にする
        if (this.position.x + this.width <= 0) {
          this.life = 0;
        }
        break;
    }
    // 描画を行う
    this.draw();
    // 自身のフレームをインクリメントする
    this.frame++;
  }
}
