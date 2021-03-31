export class Canvas2D {
  /**
   * @constructor
   * @param {HTMLDivElement} container
   * @param {HTMLCanvasElement} canvas
   */
  constructor(container, canvas) {
    /**
     * @type {HTMLDivElement}
     */
    this.container = container;
    /**
     * @type{HTMLCanvasElement}
     */
    this.canvasElement = canvas;
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.context2d = canvas.getContext("2d");
  }

  /**
   * @return {HTMLCanvasElement}
   * containerと同じwidthとheightを設定した要素を返す
   */
  get canvas() {
    this.canvasElement.width = this.container.clientWidth;
    this.canvasElement.height = this.container.clientHeight;
    return this.canvasElement;
  }

  /**
   * @return {CanvasRenderingContext2D}
   */
  get context() {
    return this.context2d;
  }

  drawRect(x, y, width, height, color) {
    if (color != null) {
      this.context2d.fillStyle = color;
    }
    this.context2d.fillRect(x, y, width, height);
  }

  /**
   * 画像をロードしてコールバック関数にロードした画像を与え呼び出す
   * @param {string} path - 画像ファイルのパス
   * @param {function} [callback] - コールバック関数
   */
  imageLoader(path, callback) {
    // 画像のインスタンスを生成する
    let target = new Image();
    // 画像がロード完了したときの処理を先に記述する
    target.addEventListener(
      "load",
      () => {
        // もしコールバックがあれば呼び出す
        if (callback != null) {
          // コールバック関数の引数に画像を渡す
          callback(target);
        }
      },
      false
    );
    // 画像のロードを開始するためにパスを指定する
    target.src = path;
  }
}
