import { Canvas2D } from "./common/Canvas2D.js";
import { Player } from "./character/Player.js";
import { Shot } from "./character/Shot.js";
import { BackgroundStar } from "./character/BackgroundStar.js";
import { Enemy } from "./character/Enemy.js";
import { SceneManager } from "./common/SceneManager.js";

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
   * 実行開始時のタイムスタンプ
   * @type {number}
   */
  let startTime;

  /**
   * 自機キャラクターのインスタンス
   * @type {Player}
   */
  let player = null;

  /**
   * ショットの最大個数
   * @type {number}
   */
  const SHOT_MAX_COUNT = 10;

  /**
   * ショットのインスタンスを格納する配列
   * @type {Array<Shot>}
   */
  const shotArray = [];

  /**
   * 斜めショットのインスタンスを格納する配列
   */
  const slantingShotArray = [];

  /**
   * 敵キャラクターのインスタンス数
   * @type{number}
   */
  const EMEMY_MAX_COUNT = 10;

  /**
   * 敵キャラクターのインスタンスを格納する配列
   * @type{Array<Enemy>}
   */
  const enemyArray = [];

  /**
   * 敵キャラクターのショットの最大個数
   * @type {number}
   */
  const ENEMY_SHOT_MAX_COUNT = 50;

  /**
   * 敵キャラクターのショットのインスタンスを格納する配列
   * @type {Array<Shot>}
   */
  let enemyShotArray = [];

  /**
   * 流れる星のインスタンスを格納する配列
   * @type {Array<BackgroundStar>}
   */
  let backgroundStarArray = [];

  /**
   * 背景を流れる星の個数
   * @type {number}
   */
  const BACKGROUND_STAR_MAX_COUNT = 100;
  /**
   * 背景を流れる星の最大サイズ
   * @type {number}
   */
  const BACKGROUND_STAR_MAX_SIZE = 3;
  /**
   * 背景を流れる星の最大速度
   * @type {number}
   */
  const BACKGROUND_STAR_MAX_SPEED = 4;

  /**
   * シーンマネージャー
   * @type{SceneManager}
   */
  let scene;

  // Canvas2Dクラスの初期化
  util = new Canvas2D(GAME_CONTAINER, GAME_CANVAS);

  // Canvas2Dからwidthとheightを設定したcanvasを取得
  canvas = util.canvas;

  // Canvas2Dから2dコンテキストを取得
  ctx = util.context;

  // 初期化処理を行う
  initialize();

  // インスタンスの状態を確認する
  loadCheck();

  /**
   * 初期化関数
   */
  function initialize() {
    let i;

    // シーンを初期化する
    scene = new SceneManager();

    // 自機キャラクターを初期化する
    player = new Player(ctx, 0, 0, 64, 64, "../../assets/images/player.png");

    player.setComing(-50, canvas.height / 2, 32, canvas.height / 2);

    // ショットを初期化する;
    for (i = 0; i < SHOT_MAX_COUNT; ++i) {
      shotArray[i] = new Shot(
        ctx,
        0,
        0,
        32,
        32,
        "../../assets/images/DRshoot.png"
      );
      slantingShotArray[i * 2] = new Shot(
        ctx,
        0,
        0,
        32,
        32,
        "../../assets/images/pwupshoot.png"
      );
      slantingShotArray[i * 2 + 1] = new Shot(
        ctx,
        0,
        0,
        32,
        32,
        "../../assets/images/pwupshoot.png"
      );
    }

    // playerにショットを設定する
    player.setShotArray(shotArray, slantingShotArray);

    // 敵キャラクターを初期化する
    for (i = 0; i < EMEMY_MAX_COUNT; i++) {
      enemyArray[i] = new Enemy(
        ctx,
        0,
        0,
        48,
        48,
        "../../assets/images/Bbug2.png"
      );
    }

    // 流れる星を初期化する
    for (i = 0; i < BACKGROUND_STAR_MAX_COUNT; ++i) {
      // 星の速度と大きさはランダムと最大値によって決まるようにする
      let size = 1 + Math.random() * (BACKGROUND_STAR_MAX_SIZE - 1);
      let speed = 1 + Math.random() * (BACKGROUND_STAR_MAX_SPEED - 1);
      // 星のインスタンスを生成する
      backgroundStarArray[i] = new BackgroundStar(ctx, size, speed);
      // 星の初期位置もランダムに決まるようにする
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      backgroundStarArray[i].set(x, y);
    }
  }

  // 画像のロードが完了しているかを確認
  function loadCheck() {
    // 準備完了を意味する真偽値
    let ready = true;
    // playerの準備が完了しているかチェック
    ready = ready && player.ready;
    // shotの準備が完了しているかチェック
    checkReadiness(shotArray, ready);
    // slantingShotの準備が完了しているかチェック
    checkReadiness(slantingShotArray, ready);
    // 敵キャラクターの準備が完了しているかチェックする
    checkReadiness(enemyArray, ready);

    // 全ての準備が完了したら次の処理に進む
    if (ready) {
      // シーンを定義する
      sceneSetting();
      // イベントを設定する
      eventSetting();
      // 実行開始時のタイムスタンプを取得する
      startTime = Date.now();
      // 描画処理を行う
      render();
    } else {
      // 準備が完了していない場合は0.1秒ごとに再帰呼び出しを行う
      setTimeout(loadCheck, 100);
    }
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
   * シーンを設定する
   */
  function sceneSetting() {
    // イントロシーン
    scene.add("intro", (time) => {
      // 2秒経過したらシーンをinvadeに変更する
      if (time > 2.0) {
        scene.use("invade");
      }
    });

    // invadeシーン
    scene.add("invade", (time) => {
      // シーンのフレーム数が0のときは敵キャラクターを配置する
      if (scene.frame === 0) {
        // ライフが0の状態の敵キャラクターが見つかったら配置する
        for (let i = 0; i < EMEMY_MAX_COUNT; i++) {
          if (enemyArray[i].life <= 0) {
            let e = enemyArray[i];
            // 出現場所はXが画面右端の外側、Yが画面中央に設定する
            e.set(canvas.width + e.width, canvas.height / 2, 1, "default");
            // 進行方向は左に向かうように設定する
            e.setVector(-1.0, 0.0);
            // 処理を終了する
            break;
          }
        }
      }
      // シーンフレーム数が100になったときに再度invadeを設定する
      if (scene.frame === 100) {
        scene.use("invade");
      }
    });
    // 最初にシーンにはintroを設定する
    scene.use("intro");
  }

  /**
   * 描画処理を行う関数を定義
   */
  function render() {
    // グローバルなアルファを必ず 1.0 で描画処理を開始する
    ctx.globalAlpha = 1.0;
    util.drawRect(0, 0, canvas.width, canvas.height, "#000");

    // playerの状態を更新
    player.update();

    // sceneを更新する
    scene.update();

    // ショットの状態を更新
    statusUpdate(shotArray);

    // 斜め方向のショットの状態を更新
    statusUpdate(slantingShotArray);

    // 敵キャラクターの状態を更新
    statusUpdate(enemyArray);

    // 流れる星の状態を更新する
    statusUpdate(backgroundStarArray);

    // 描画処理を再帰呼出しする
    requestAnimationFrame(render);
  }

  /**
   * 配列の個別の要素のreadyがtrueになっているか調べる関数
   * loadCheck関数内で使用
   * @param {Array} targetArray
   * @param {boolean} ready
   */
  function checkReadiness(targetArray, ready) {
    targetArray.forEach((target) => {
      ready = ready && target.ready;
    });
    return ready;
  }

  /**
   * 配列の個別の要素にupdateをかける際に使用する関数
   * render関数内で使用
   * @param {Array} targetArray
   */
  function statusUpdate(targetArray) {
    targetArray.forEach((target) => {
      target.update();
    });
  }
}
