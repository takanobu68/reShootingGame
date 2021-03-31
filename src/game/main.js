import { Canvas2D } from "./common/Canvas2D.js";

export function createGame() {
  /**
   * game-container
   * game-canvas
   * ゲーム画面のwidth,height,2dコンテキスト取得の為に必要な要素を取得
   */
  const GAME_CONTAINER = document.getElementById("game-container");
  const GAME_CANVAS = document.getElementById("game-canvas");

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
  /**
   * 実行開始時のタイムスタンプ
   * @type {number}
   */
  let startTime;
  /**
   * player の X 座標
   * @type {number}
   */
  let playerX = GAME_CONTAINER.clientWidth / 2;
  /**
   * player の Y 座標
   * @type {number}
   */
  let playerY = GAME_CONTAINER.clientHeight / 2;

  // Canvas2Dクラスの初期化
  util = new Canvas2D(GAME_CONTAINER, GAME_CANVAS);

  // Canvas2Dからwidthとheightを設定したcanvasを取得
  canvas = util.canvas;

  // Canvas2Dから2dコンテキストを取得
  ctx = util.context;

  util.imageLoader("../../assets/images/player.png", (loadedImage) => {
    // 引数経由で画像を受け取り変数に代入しておく
    image = loadedImage;
    // 初期化処理を行う
    initialize();
    // イベントを設定する
    eventSetting();
    // 実行開始時のタイムスタンプを取得する
    startTime = Date.now();
    // 描画処理を行う
    render();
  });

  /**
   * 初期化関数
   */
  function initialize() {}

  /**
   * イベントを設定する関数を定義
   */
  function eventSetting() {
    // キーの押下時に呼び出されるイベントリスナーを設定する
    window.addEventListener("keydown", (event) => {
      // 入力されたキーに応じて処理内容を変化させる
      switch (event.key) {
        case "ArrowLeft": // アローキーの左
          playerX -= 10;
          break;
        case "ArrowRight": // アローキーの右
          playerX += 10;
          break;
        case "ArrowUp":
          playerY -= 10; // アローキーの上
          break;
        case "ArrowDown":
          playerY += 10; // アローキーの下
          break;
      }
    });
  }

  /**
   * 描画処理を行う関数を定義
   */
  function render() {
    util.drawRect(0, 0, canvas.width, canvas.height, "#000");
    // 画像を描画する
    ctx.drawImage(image, playerX, playerY);
    // 描画処理を再帰呼出しする
    requestAnimationFrame(render);
  }
}
