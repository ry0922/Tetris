class config{
	

}

function setBlockSize(){
    config.SCREEN_WIDTH = config.BLOCK_SIZE * config.BLOCK_COLS;	// キャンバスの幅
    config.SCREEN_HEIGHT = config.BLOCK_SIZE * config.BLOCK_RAWS;	// キャンバスの高さ
}
/*
 * 定数
 */
// ステージ
config.BLOCK_SIZE = 24;		// 1ブロックのサイズ
config.BLOCK_RAWS = 22;	// ステージの高さ（20ライン分をステージとして使用し、上下1ラインはあたり判定とブロックコピー用に使用）
config.BLOCK_COLS = 12;	// ステージの幅
config.SCREEN_WIDTH = config.BLOCK_SIZE * config.BLOCK_COLS;	// キャンバスの幅
config.SCREEN_HEIGHT = config.BLOCK_SIZE * config.BLOCK_RAWS;	// キャンバスの高さ

//canvasサイズ調整
config.BLOCK_SIZE=document.documentElement.clientWidth*0.02;
config.SCREEN_WIDTH = config.BLOCK_SIZE * config.BLOCK_COLS;	// キャンバスの幅
config.SCREEN_HEIGHT = config.BLOCK_SIZE * config.BLOCK_RAWS;	// キャンバスの高さ
config.bs=config.BLOCK_SIZE;


// ゲームの状態
config.GAME = 1;			// ゲーム中
config.GAMEOVER = 0;		// ゲームオーバー時
config.EFFECT = 2;			// ブロックを消すときのエフェクトモード
// ブロックの状態
config.NON_BLOCK = 0;		// ブロックが存在しない
config.NORMAL_BLOCK = 1;	// 通常のブロック（動かせる）
config.LOCK_BLOCK = 2;		// ロックした（動かせない）ブロック
config.CLEAR_BLOCK = 3;	// 消去するブロック（1ライン揃ったとき）
config.GAMEOVER_BLOCK = 4;	// 消去するブロック（1ライン揃ったとき）
config.WALL = 9;			// 壁
// エフェクト
config.EFFECT_ANIMATION = 2;	// エフェクト時のちかちかする回数
// 色
config.BACK_COLOR = "#ddd";				// 背景色
config.GAMEOVER_COLOR = "#db7093";	// ゲームオーバー時のブロックの色
config.BLOCK_COLOR = "steelblue";			// 操作ブロックの色
config.LOCK_COLOR = "lightslategray";		// ロックしたブロックの色
config.WALL_COLOR = "#666";				// 壁の色
config.ERROR_COLOR = "tomato";			// エラーブロックの色
config.EFFECT_COLOR1 = "whitesmoke";		// エフェクト時の色1
config.EFFECT_COLOR2 = "#000";			// エフェクト時の色2
// ゲーム要素
config.NEXTLEVEL = 10;					// 次のレベルまでの消去ライン数

/*
 * グローバル変数
 */
config.canvas = null;						// キャンバス取得
config.g = null;							// コンテキスト取得
config.stage = new Array(config.BLOCK_COLS);	// ゲームのステージ枠（壁の情報のみ、変化しない）
config.field = new Array(config.BLOCK_COLS);		// ゲーム中のステージ枠とブロック表示用（変化する）
config.bs=config.BLOCK_SIZE;								// ブロックサイズ
config.speed;							// 落下速度
config.frame;							// ゲームフレーム番号
config.block = new Array();				// 落ちてくるブロックの種類（７種類）

config.oBlock = new Array();				// 操作中のブロック

config.blockType;						// ブロックの種類番号

config.x;
config.y;								// ブロックの現在位置

config.sx;
config.sy;							// ブロックの元位置

config.mode;							// ゲームの状態  GAME/GAMEOVER/EFFECT
config.timer1;							// ゲームループ用のタイマー
config.FPS=60;								// 描画書き換え速度
config.clearLine;							// 消去したライン数

// エフェクト時（色の反転/エフェクトスピード/エフェクト回数）
config.effectState = {flipFlop: 0, speed: 0, count: 0};

config.MAX_LEVEL=8;
