import { Canvas2D } from "./common/Canvas2D.js";
import { Player } from "./character/Player.js";

export function createGame() {
  /**
   * game-container
   * game-canvas
   * ゲーム画面のwidth,height,2dコンテキスト取得の為に必要な要素を取得
   */
  const GAME_CONTAINER = document.getElementById("game-container");
  const GAME_CANVAS = document.getElementById("game-canvas");

  /*****************************************************************
   * 必要な変数の定義
   ******************************************************************/

  /**
   * キーの押下状態を調べるためのオブジェクト
   */
  window.isKeyDown = {};

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
   * 自機キャラクターのインスタンス
   * @type {Player}
   */
  let player = null;

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
  function initialize() {
    // 自機キャラクターを初期化する
    player = new Player(ctx, 0, 0, 64, 64, image);

    player.setComing(-50, canvas.height / 2, 0, canvas.height / 2);
  }

  /**
   * イベントを設定する関数を定義
   */
  function eventSetting() {
    // キーの押下時に呼び出されるイベントリスナーを設定する
    window.addEventListener("keydown", (e) => {
      // キーの押下状態を管理するオブジェクトに押下されたことを設定する
      isKeyDown[`key_${e.key}`] = true;
    });
    // キーが離された時に呼び出されるイベントリスナーを設定する
    window.addEventListener("keyup", (e) => {
      // キーが離されたことを設定する
      isKeyDown[`key_${e.key}`] = false;
    });
  }

  /**
   * 描画処理を行う関数を定義
   */
  function render() {
    // グローバルなアルファを必ず 1.0 で描画処理を開始する
    ctx.globalAlpha = 1.0;
    util.drawRect(0, 0, canvas.width, canvas.height, "#000");

    player.update();
    // 描画処理を再帰呼出しする
    requestAnimationFrame(render);
  }
}
