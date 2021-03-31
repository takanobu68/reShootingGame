import { Canvas2D } from "../common/Canvas2D.js";

export function createGame() {
  /**
   * game-container
   * game-canvas
   * ゲーム画面のwidth,height,2dコンテキスト取得の為に必要な要素を取得
   */
  const gameContainer = document.getElementById("game-container");
  const gameCanvas = document.getElementById("game-canvas");

  /**
   * Canvas2D API をラップしたユーティリティクラス
   * @type {Canvas2DUtility}
   */
  let util;
  /**
   * 描画対象となる Canvas Element
   * @type {HTMLCanvasElement}
   */
  let canvas;
  /**
   * Canvas2D API のコンテキスト
   * @type {CanvasRenderingContext2D}
   */
  let ctx;
  /**
   * イメージのインスタンス
   * @type {Image}
   */
  let image;

  // Canvas2Dクラスの初期化
  util = new Canvas2D(gameContainer, gameCanvas);

  // Canvas2Dからwidthとheightを設定したcanvasを取得
  canvas = util.canvas;

  // Canvas2Dから2dコンテキストを取得
  ctx = util.context;

  util.imageLoader("../../assets/images/player.png", (loadedImage) => {
    // 引数経由で画像を受け取り変数に代入しておく
    image = loadedImage;

    // 描画処理を行う
    render();
  });

  /**
   * 描画処理を行う関数
   */
  function render() {
    util.drawRect(0, 0, canvas.width, canvas.height, "#000");
    // 画像を描画する
    ctx.drawImage(image, 0, 0);
  }
}
