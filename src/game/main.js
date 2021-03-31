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

  util.imageLoader("../../assets/images/viper.png", (loadedImage) => {
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
    player = new Player(ctx, 0, 0, image);

    player.setComing(-100, canvas.height / 2, 0, canvas.height / 2);
  }

  /**
   * イベントを設定する関数を定義
   */
  function eventSetting() {
    // キーの押下時に呼び出されるイベントリスナーを設定する
    window.addEventListener("keydown", (e) => {
      // 入力されたキーに応じて処理内容を変化させる
      switch (e.key) {
        case "ArrowLeft": // アローキーの左
          player.position.x -= 10;
          break;
        case "ArrowRight": // アローキーの右
          player.position.x += 10;
          break;
        case "ArrowUp":
          player.position.y -= 10; // アローキーの上
          break;
        case "ArrowDown":
          player.position.y += 10; // アローキーの下
          break;
      }
    });
  }

  /**
   * 描画処理を行う関数を定義
   */
  function render() {
    // グローバルなアルファを必ず 1.0 で描画処理を開始する
    ctx.globalAlpha = 1.0;
    util.drawRect(0, 0, canvas.width, canvas.height, "#000");

    // 登場シーンの処理
    if (player.isComing === true) {
      // 登場シーンが始まってからの経過時間
      let justTime = Date.now();
      let comingTime = (justTime - player.comingStart) / 1000;
      // 登場中は時間が経つほど右に向かって進む
      let x = -100 + comingTime * 50;
      // 一定の位置まで移動したら登場シーンを終了する
      if (x >= player.comingEndPosition.x) {
        player.isComing = false; // 登場シーンフラグを下ろす
        x = player.comingEndPosition.x; // 行き過ぎの可能性もあるので位置を再設定
      }
      // 求めたX座標を自機に設定する
      player.position.set(x, player.position.y);
      // justTime を 100 で割ったとき余りが 50 より小さくなる場合だけ半透明にする
      if (justTime % 100 < 50) {
        ctx.globalAlpha = 0.5;
      }
    }

    // 画像を描画する
    player.draw();
    // 描画処理を再帰呼出しする
    requestAnimationFrame(render);
  }
}
