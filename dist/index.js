/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/ReadIcons.ts":
/*!*******************************!*\
  !*** ./src/main/ReadIcons.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * アイコン表示に関するモジュール
 * シングルトン
 */
var fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
var path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
var electron_log_1 = __importDefault(__webpack_require__(/*! electron-log */ "electron-log"));
var randomIconList;
var idIconList;
/**
 * コンストラクタ
 * ・ランダムフォルダからアイコン名を取得してリスト化
 * ・IDフォルダからもリスト化、空の対応マップ作製
 * ・コテハン対応ファイルを読みこんでmapに格納
 */
var ReadIcons = /** @class */ (function () {
    function ReadIcons() {
        /**
         * アイコンランダム表示機能（デフォルト）
         * 起動時に作成したアイコンリストからランダムで1つ取得
         */
        this.getRandomIcons = function () {
            var iconPath = '';
            try {
                var dirName = './img/random/';
                // リストからランダム取得
                //  const size = randomIconList.size;
                var num = Math.floor(randomIconList.length * Math.random());
                iconPath = dirName + randomIconList[num];
            }
            catch (e) {
                electron_log_1.default.error(e);
            }
            return iconPath;
        };
        //画像ディレクトリ
        var randomDir = path_1.default.resolve(__dirname, "../public/img/random/");
        console.debug('[ReadIcons]loadRandomDir = ' + randomDir);
        //  ランダムアイコン取得
        randomIconList = readDir(randomDir);
        //ID用アイコンディレクトリ
        var idDir = path_1.default.resolve(__dirname, "../public/img/id/");
        console.debug('[ReadIcons]loadIDDir = ' + idDir);
        //  ランダムアイコン取得
        idIconList = readDir(idDir);
    }
    return ReadIcons;
}());
var readDir = function (imgDir) {
    var iconFileList = [];
    //  指定したディレクトリのアイコン取得
    var files = fs_1.default.readdirSync(imgDir, { withFileTypes: true });
    //pngファイルのみ返却リストに格納する
    files.forEach(function (file) {
        // asar圧縮するとfileが文字列になる。開発環境だとfileオブジェクトになる
        var target = typeof file.name !== 'string' ? file : file.name;
        var regx = /.*\.png$/.test(target);
        if (regx) {
            iconFileList.push(target);
        }
    });
    // console.log('[ReadIcons.readDir]end');
    // console.log(JSON.stringify(iconFileList));
    return iconFileList;
};
/**
 * IDによるアイコン固定機能（オプションでON,OFF可能）
 * 初出のIDならばランダムでアイコンを取得し
 * IDとファイル名のセットでマップに格納
 * @param string // ID
 * @return string filename
 */
/**
 * コテハンリスト機能（オプションでON,OFF可能）
 * koteフォルダの下にkotehan.jsonを作って
 * 名前とアイコンファイル名の対応をマップにして返すだけ
 */
exports.default = ReadIcons;


/***/ }),

/***/ "./src/main/getRes.ts":
/*!****************************!*\
  !*** ./src/main/getRes.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser")); // jsonパーサ
var router = express_1.default.Router();
var electron_log_1 = __importDefault(__webpack_require__(/*! electron-log */ "electron-log"));
var ReadIcons_1 = __importDefault(__webpack_require__(/*! ./ReadIcons */ "./src/main/ReadIcons.ts")); //アイコンファイル名取得
var readIcons = new ReadIcons_1.default();
var JSDOM = __webpack_require__(/*! jsdom */ "jsdom").JSDOM;
var $ = __webpack_require__(/*! jquery */ "jquery")(new JSDOM().window);
var readSitaraba_1 = __importDefault(__webpack_require__(/*! ./readBBS/readSitaraba */ "./src/main/readBBS/readSitaraba.ts")); // したらば読み込み用モジュール
var sitaraba = new readSitaraba_1.default();
var Read5ch_1 = __importDefault(__webpack_require__(/*! ./readBBS/Read5ch */ "./src/main/readBBS/Read5ch.ts")); // 5ch互換板読み込み用モジュール
var read5ch = new Read5ch_1.default();
// 掲示板読み込みモジュール、一度決定したら使いまわすためにグローバル宣言
var bbsModule = null;
// リクエストのbodyをパース下りエンコードしたりするためのやつ
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
/*
 * http://localhost:3000/getRes にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.post('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var threadUrl, resNum;
    return __generator(this, function (_a) {
        threadUrl = req.body.threadUrl;
        resNum = req.body.resNumber;
        //リクエストURLを解析し、使用するモジュールを変更する（初回のみ）
        if (bbsModule === null) {
            bbsModule = analysBBSName(threadUrl);
        }
        //選択したモジュールでレス取得処理を行う
        bbsModule
            .read(threadUrl, resNum)
            .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
            var result, wavfilepath;
            return __generator(this, function (_a) {
                console.log('[getRes.js]レス取得成功。件数=' + response.length);
                result = buildResponseArray(response);
                // 返却
                res.header('Content-Type', 'application/json; charset=UTF-8');
                console.log('[getRes.js]レス処理完了');
                if (result.length > 0 && config.playSe && globalThis.electron.seList.length > 0) {
                    wavfilepath = globalThis.electron.seList[Math.floor(Math.random() * globalThis.electron.seList.length)];
                    globalThis.electron.mainWindow.webContents.send('play-sound', wavfilepath);
                }
                res.send(result);
                return [2 /*return*/];
            });
        }); })
            .catch(function (err) {
            electron_log_1.default.error(err);
        });
        return [2 /*return*/];
    });
}); });
/*
 * URLをみてどこのBBSか判定して使用するモジュールを返却する
 */
var analysBBSName = function (threadUrl) {
    //したらばドメイン名
    var sitarabaDomain = 'jbbs.shitaraba.net';
    //こんな感じで必要に応じて増やしていけばいいんじゃね？
    //  const dokkanoBBS = 'dokka.bbs.com';
    if (threadUrl.indexOf(sitarabaDomain) !== -1) {
        // URLにしたらばドメイン名が入ってればしたらば
        return sitaraba;
    }
    // どこにも該当しなかったらとりあえず5chで
    // この辺も対応ドメインリストとか作ってちゃんと判定したほうがよさそう
    return read5ch;
};
/**
 * レスポンスの生成
 * レスポンスオブジェクトの配列をHTMLに変換
 */
var buildResponseArray = function (resObject) {
    //結果を格納する配列
    var result = [];
    console.trace('[getRes.buildResponseArray]レスポンス整形開始 件数=' + resObject.length);
    resObject.forEach(function (value) {
        result.push(buildResponse(value));
    });
    return result;
};
/**
 *レスポンスのパース
 *レス番号とHTML文字列を格納したオブジェクトを返却する
 * @param object // レスオブジェクト（ReadShitaraba.jsとか参照）
 * @return { レス番 , HTML整形後のレス }のオブジェクト
 */
function buildResponse(res) {
    console.trace('[getRes.js]パース開始');
    console.trace(res);
    //最終的にHTML文字列にするためのダミーオブジェクト
    var $dummy = $('<div />');
    var $li = $('<li />', { class: 'list-item' });
    var $iconImg = getIcon(res.name, res.id); //アイコン取得
    var $icon = $('<span />', { class: 'icon-block' }).append($iconImg); // ここにアイコン
    //レス番を取得
    var $resNumber = $('<span />', { class: 'resNumber' }).append(res.number);
    //名前を取得
    var $name = $('<span />', { class: 'name' }).append(res.name);
    //日付を取得
    var $date = $('<span />', { class: 'date' }).append(res.date);
    //レスを取得
    var $res = $('<span />', { class: 'res' }).append(res.text);
    // 名前やレスのエリア
    var $resDiv = $('<div />', { class: 'content' });
    //レス番表示
    if (globalThis.config.showNumber) {
        $resDiv.append($resNumber);
    }
    //名前表示
    if (globalThis.config.showName) {
        $resDiv.append($name);
    }
    //時刻表示
    if (globalThis.config.showTime) {
        $resDiv.append($date);
    }
    // 名前と本文を改行で分ける
    if (globalThis.config.newLine) {
        $resDiv.append('<br/>').append($res);
    }
    else {
        $resDiv.append($res);
    }
    $li.append($icon);
    $li.append($resDiv);
    //HTMLオブジェクトをダミー要素へ入れる
    $dummy.append($li);
    //レス番号更新
    //$('#resNumber').val(parseInt(res.number) + 1);
    // console.debug('[getRes.js]パース完了');
    // console.debug($dummy.html());
    // レス番とテキストをセットにしたJSONを返す
    var result = {
        resNumber: res.number,
        html: $dummy.html(),
    };
    // JSONオブジェクトを返却
    return result;
}
/**
 * アイコン画像取得表示のためのimgタグを返す
 * @param String // name 名前
 * @param String // id ID、板によっては非表示だったりする、困る
 */
function getIcon(name, id) {
    var src = getIconFileName(name, id);
    var $imgTag = $('<img />', { class: 'icon', src: src });
    return $imgTag;
}
/**
 * アイコン画像名取得、名前やIDを見て条件によって固定のアイコンを返す
 * @param String // name 名前
 * @param String // id ID、板によっては非表示だったりする、困る
 */
function getIconFileName(name, id) {
    // ランダムアイコン取得
    return readIcons.getRandomIcons();
}
exports.default = router;


/***/ }),

/***/ "./src/main/main.ts":
/*!**************************!*\
  !*** ./src/main/main.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Electronのモジュール
var path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
var electron_1 = __importDefault(__webpack_require__(/*! electron */ "electron"));
var electron_log_1 = __importDefault(__webpack_require__(/*! electron-log */ "electron-log"));
console.trace = function () { };
process.on('uncaughtException', function (err) {
    electron_log_1.default.error('electron:event:uncaughtException');
    electron_log_1.default.error(err);
    electron_log_1.default.error(err.stack);
    // app.quit();
});
//アプリケーションをコントロールするモジュール
var app = electron_1.default.app;
app.allowRendererProcessReuse = true;
// サーバー起動モジュール
var ss = __webpack_require__(/*! ./startServer */ "./src/main/startServer.ts");
console.trace(ss);
//ウィンドウを作成するモジュール
var BrowserWindow = electron_1.default.BrowserWindow;
// メインウィンドウはGCされないようにグローバル宣言
globalThis.electron = {
    mainWindow: undefined,
    seList: [],
    twitchChat: undefined,
    youtubeChat: undefined,
    socket: null,
};
//全てのウィンドウが閉じたら終了
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
// Electronの初期化完了後に実行
app.on('ready', function () {
    //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
    globalThis.electron.mainWindow = new BrowserWindow({
        width: 700,
        height: 720,
        useContentSize: true,
        icon: __dirname + './../../icon.png',
        webPreferences: {
            nodeIntegration: true,
        },
    });
    globalThis.electron.mainWindow.setTitle('unacast');
    globalThis.electron.mainWindow.setMenu(null);
    //使用するhtmlファイルを指定する
    globalThis.electron.mainWindow.loadURL(path_1.default.resolve(__dirname, '../src/html/index.html'));
    // ウィンドウが閉じられたらアプリも終了
    globalThis.electron.mainWindow.on('closed', function () {
        globalThis.electron.mainWindow = undefined;
    });
    // globalThis.electron.mainWindow.webContents.openDevTools();
});
// 音声再生できるようにする
app.commandLine.appendSwitch('--autoplay-policy', 'no-user-gesture-required');


/***/ }),

/***/ "./src/main/readBBS/Read5ch.ts":
/*!*************************************!*\
  !*** ./src/main/readBBS/Read5ch.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 5ch互換BBS読み込み用モジュール
 */
var rp = __importStar(__webpack_require__(/*! request-promise */ "request-promise")); //httpリクエスト
var iconv_lite_1 = __importDefault(__webpack_require__(/*! iconv-lite */ "iconv-lite")); // 文字コード変換用パッケージ
var log = __webpack_require__(/*! electron-log */ "electron-log");
//ステータスコード304 _NotModified
var NOT_MODIFIED = '304';
var RANGE_NOT_SATISFIABLE = '416';
// 最終取得スレッド
var lastThreadUrl = '';
// 最終レス番号
var lastResNumber = 0;
//最終更新日時
var lastModified = null;
// 最終バイト数
var lastByte = 0;
/**
 * コンストラクタ
 *
 */
var Read5ch = /** @class */ (function () {
    function Read5ch() {
        var _this = this;
        /**
         * レス読み込み
         * 引数で指定した板からレスを読む
         * レス番号を指定していない場合は最新1件取得
         * @param String // threadUrl スレURL
         * @param String // resNum レス番号
         */
        this.read = function (threadUrl, resNum) { return __awaiter(_this, void 0, void 0, function () {
            var rep, requestUrl, range, options, responseJson, response, statusCode, headers, str, error_1, rsArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[Read5ch] threadUrl=" + threadUrl + " resNum=" + resNum);
                        //板や最終日レス番号がかわったら最初からとり直す(lastmodifiと rangeのリセット)
                        if (threadUrl != lastThreadUrl || parseInt(resNum) < lastResNumber || resNum === '') {
                            lastThreadUrl = threadUrl;
                            lastModified = null;
                            lastByte = 0;
                            console.trace('[Read5ch.js]resete!!!!!!!!!!!!!!!!');
                        }
                        else {
                            console.trace('noresete');
                        }
                        rep = /\/test\/read.cgi(\/.+)(\/.+)\//;
                        requestUrl = threadUrl.replace(rep, '$1/dat$2.dat');
                        range = lastByte;
                        options = {
                            url: requestUrl,
                            method: 'GET',
                            encoding: null,
                            resolveWithFullResponse: true,
                            headers: {
                                'if-modified-since': lastModified,
                                range: 'bytes=' + range + '-',
                            },
                        };
                        //掲示板へのリクエスト実行
                        console.trace('[Read5ch.js]5ch系BBSレス取得API呼び出し開始');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rp.get(options)];
                    case 2:
                        response = _a.sent();
                        statusCode = response.statusCode;
                        console.trace('[Read5ch.js]5ch系BBSレス取得API呼び出し完了、statusCode=' + statusCode);
                        headers = response.headers;
                        // console.trace(headers);
                        //LastModifiedとRange更新処理
                        if (headers['last-modified'] != null) {
                            lastModified = headers['last-modified'];
                            console.trace('[Read5ch.read]lastModified=' + lastModified);
                        }
                        str = iconv_lite_1.default.decode(Buffer.from(response.body), 'Shift_JIS');
                        // レスポンスオブジェクト作成、content-rangeがある場合とない場合で処理を分ける
                        if (headers['content-range'] == null || lastByte == 0) {
                            console.trace('[Read5ch.read]content-range=' + headers['content-range']);
                            responseJson = purseNewResponse(str, resNum);
                        }
                        else {
                            responseJson = purseDiffResponse(str, resNum);
                        }
                        // 取得バイト数表示
                        if (headers['content-length'] != null && responseJson.length > 0) {
                            lastByte = lastByte + parseInt(headers['content-length']) - 1;
                            console.trace('[Read5ch.read]lastByte=' + lastByte);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        rsArray = new Array();
                        responseJson = rsArray;
                        if (error_1.status == NOT_MODIFIED) {
                            log.error('[Read5ch.js]5ch系BBSレス取得APIリクエストエラー、NOT_MODIFIED');
                        }
                        else if (error_1.status == RANGE_NOT_SATISFIABLE) {
                            log.error('[Read5ch.js]5ch系BBSレス取得APIリクエストエラー、RANGE_NOT_SATISFIABLE');
                        }
                        else {
                            log.error('[Read5ch.js]5ch系BBSレス取得APIリクエストエラー、message=' + error_1.message);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        console.trace(JSON.stringify(responseJson));
                        return [2 /*return*/, responseJson];
                }
            });
        }); };
    }
    return Read5ch;
}());
/**
 *取得したレスポンス（複数）のパース
 *戻りとしてパースしたjsonオブジェクトの配列を返す
 * @param string // res 板から返却されたdat
 * @param string // resNum リクエストされたレス番号
 */
var purseNewResponse = function (res, resNum) {
    //結果を格納する配列
    var result = new Array();
    // レス番号
    var num = 0;
    //新着レスを改行ごとにSplitする
    var resArray = res.split(/\r\n|\r|\n/);
    // 新着なしなら戻る。
    if (resArray.length === 0) {
        return result;
    }
    // 配列の最後に空の要素が入ることがあるので取り除く
    if (resArray[resArray.length - 1].length === 0) {
        resArray.pop();
    }
    // レス指定なしの場合最後の1件取得
    if (resNum === null || resNum === '') {
        num = resArray.length - 1;
    }
    else {
        num = parseInt(resNum) - 1;
    }
    console.debug('[Read5ch.purseNewResponse]取得レス番号=' + num);
    //1行ごとにパースする
    for (; num < resArray.length; num++) {
        //パースメソッド呼び出し
        if (resArray[num].length > 0) {
            result.push(purseResponse(resArray[num], num + 1));
        }
    }
    lastResNumber = num + 1;
    // パースしたオブジェクトの配列を返却
    return result;
};
/**
 *取得したレスポンス（複数）のパース
 *戻りとしてパースしたjsonオブジェクトの配列を返す
 * @param string // res 板から返却されたdat1行分
 * @param string // resNum リクエストされたレス番号
 */
var purseDiffResponse = function (res, resNum) {
    //結果を格納する配列
    var result = [];
    // レス番号
    var num = parseInt(resNum);
    //新着レスを改行ごとにSplitする
    var resArray = res.split(/\r\n|\r|\n/);
    // 新着なしなら戻る。
    if (resArray.length === 0) {
        return result;
    }
    else {
        // 配列の最後に空の要素が入ることがあるので取り除く
        if (resArray[resArray.length - 1].length == 0) {
            resArray.pop();
        }
    }
    console.trace('[Read5ch.purseDiffResponse]取得レス番号=' + num);
    //1行ごとにパースする
    resArray.forEach(function (value) {
        //パースメソッド呼び出し
        if (value.length > 0) {
            result.push(purseResponse(value, num));
            num++;
        }
    });
    // パースしたオブジェクトの配列を返却
    return result;
};
/**
 * レスポンスのパース
 *Jsonオブジェクトを返却する
 *@param String // res レスポンス1レス
 *@param Integer // num レス番（0スタート）
 *{
 * number: レス番号
 * name: 名前
 * email: メアド
 * date: 日付
 * text: 本文
 * threadTitle: スレタイ
 * id: ID
 *}
 */
var purseResponse = function (res, num) {
    //APIの返却値を<>で分割
    //レスの要素
    //0:名前
    //1:メアド
    //2:日付とID （2019/11/03(日) 08:55:00 ID:kanikani）みたいに表示
    //3:本文
    //4:スレタイ （1レス目のみ）
    var splitRes = res.split('<>');
    // 日付とID分離処理、' ID:'で区切る
    var dateId = splitRes[2].split(' ID:');
    var date = dateId[0];
    // IDが取得できない場合はnullにする
    var id = dateId.length === 2 ? dateId[1] : null;
    var resJson = {
        number: num,
        name: splitRes[0],
        email: splitRes[1],
        date: date,
        text: splitRes[3],
        threadTitle: splitRes[4],
        id: id,
    };
    // オブジェクトを返却
    return resJson;
};
exports.default = Read5ch;


/***/ }),

/***/ "./src/main/readBBS/readSitaraba.ts":
/*!******************************************!*\
  !*** ./src/main/readBBS/readSitaraba.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * したらば読み込み用モジュール
 */
var request = __webpack_require__(/*! request-promise */ "request-promise"); //httpリクエスト
var iconv = __webpack_require__(/*! iconv-lite */ "iconv-lite"); // 文字コード変換用パッケージ
var log = __webpack_require__(/*! electron-log */ "electron-log");
/**
 * コンストラクタ
 *
 */
var ReadSitaraba = /** @class */ (function () {
    function ReadSitaraba() {
        /**
         * レス読み込み
         * 引数で指定した板からレスを読む
         * レス番号を指定していない場合は最新1件取得
         * @param String // threadUrl スレURL
         * @param String // resNum レス番号
         */
        this.read = function (threadUrl, resNum) {
            return __awaiter(this, void 0, void 0, function () {
                var requestUrl, options, responseJson;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestUrl = threadUrl.replace('read.cgi', 'rawmode.cgi');
                            if (resNum > 0) {
                                // レス番号がある場合レス番号以降を取得
                                requestUrl += resNum + '-';
                            }
                            else {
                                // レス番号がない場合最新の1件取得
                                requestUrl += 'l1';
                            }
                            options = {
                                url: requestUrl,
                                method: 'GET',
                                encoding: null,
                            };
                            responseJson = [];
                            //掲示板へのリクエスト実行
                            console.log('[ReadSitaraba.js]したらばレス取得API呼び出し開始');
                            return [4 /*yield*/, request(options).then(function (body) {
                                    console.debug('[ReadSitaraba.js]したらばレス取得API呼び出し成功');
                                    //したらばAPIの文字コードはEUC-JPなのでUTF-8に変換する
                                    var str = iconv.decode(Buffer.from(body), 'EUC-JP');
                                    // レスポンスオブジェクト作成
                                    responseJson = purseNewResponse(str);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, responseJson];
                    }
                });
            });
        };
    }
    return ReadSitaraba;
}());
//取得したレスポンス（複数）のパース
//戻りとしてパースしたjsonオブジェクトの配列を返す
function purseNewResponse(res) {
    //結果を格納する配列
    var result = [];
    //新着レスを改行ごとにSplitする
    var resArray = res.split(/\r\n|\r|\n/);
    //1行ごとにパースする
    resArray.forEach(function (value) {
        //パースメソッド呼び出し
        if (value.length > 0) {
            result.push(purseResponse(value));
        }
    });
    // パースした<li>オブジェクトの配列を返却
    return result;
}
/**レスポンスのパース
 *Jsonオブジェクトを返却する
 *@param String // res レスポンス1レス
 *{
 * number: レス番号
 * name: 名前
 * email: メアド
 * date: 日付
 * text: 本文
 * threadTitle: スレタイ
 * id: ID
 *}
 */
function purseResponse(res) {
    //APIの返却値を<>で分割
    //レスの要素
    //0:レス番号
    //1:名前
    //2:メアド
    //3:日付
    //4:本文
    //5:スレタイ
    //6:ID
    var splitRes = res.split('<>');
    var resJson = {
        number: splitRes[0],
        name: splitRes[1],
        email: splitRes[2],
        date: splitRes[3],
        text: splitRes[4],
        threadTitle: splitRes[5],
        id: splitRes[6],
    };
    // オブジェクトを返却
    return resJson;
}
exports.default = ReadSitaraba;


/***/ }),

/***/ "./src/main/startServer.ts":
/*!*********************************!*\
  !*** ./src/main/startServer.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var electron_log_1 = __importDefault(__webpack_require__(/*! electron-log */ "electron-log"));
var dank_twitch_irc_1 = __webpack_require__(/*! dank-twitch-irc */ "dank-twitch-irc");
var youtube_chat_1 = __webpack_require__(/*! ./youtube-chat */ "./src/main/youtube-chat/index.ts");
var electron_1 = __webpack_require__(/*! electron */ "electron");
var express_ws_1 = __importDefault(__webpack_require__(/*! express-ws */ "express-ws"));
var util_1 = __webpack_require__(/*! ./util */ "./src/main/util.ts");
// レス取得APIをセット
var getRes_1 = __importDefault(__webpack_require__(/*! ./getRes */ "./src/main/getRes.ts"));
var app;
// サーバーをグローバル変数にセットできるようにする（サーバー停止処理のため）
var server;
/**
 * サーバー起動
 * config:設定を格納したjson、以下jsonの中身
 * url:掲示板URL
 * resNumber:読み込み開始レス位置
 * port:ポート番号
 */
electron_1.ipcMain.on('start-server', function (event, config) { return __awaiter(void 0, void 0, void 0, function () {
    var ejs, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = express_ws_1.default(express_1.default()).app;
                ejs = __webpack_require__(/*! ejs */ "ejs");
                app.set('view engine', 'ejs');
                // viewディレクトリの指定
                app.set('views', path_1.default.resolve(__dirname, '../views'));
                // 設定情報をグローバル変数へセットする
                globalThis.config = config;
                console.log('[startServer]設定値 = ');
                console.log(globalThis.config);
                app.get('/', function (req, res, next) {
                    res.render('server', config);
                    req.connection.end();
                });
                //静的コンテンツはpublicディレクトリの中身を使用するという宣言
                app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
                // 2ch互換掲示板の取得
                app.use('/getRes', getRes_1.default);
                if (!globalThis.config.playSe) return [3 /*break*/, 2];
                return [4 /*yield*/, util_1.readWavFiles(globalThis.config.sePath)];
            case 1:
                list = _a.sent();
                globalThis.electron.seList = list.map(function (file) { return globalThis.config.sePath + "/" + file; });
                console.log("SE\u30D5\u30A1\u30A4\u30EB\u6570=" + globalThis.electron.seList.length);
                _a.label = 2;
            case 2:
                // Twitchに接続
                if (globalThis.config.twitchId) {
                    globalThis.electron.twitchChat = new dank_twitch_irc_1.ChatClient();
                    globalThis.electron.twitchChat.connect();
                    globalThis.electron.twitchChat.join(globalThis.config.twitchId);
                    globalThis.electron.twitchChat.on('PRIVMSG', function (msg) {
                        var imgUrl = './img/twitch.png';
                        var name = msg.displayName;
                        var text = msg.messageText;
                        sendDom(name, text, imgUrl);
                    });
                    // Youtubeチャット
                    if (globalThis.config.youtubeId) {
                        try {
                            console.log('[Youtube Chat] connect started');
                            globalThis.electron.youtubeChat = new youtube_chat_1.LiveChat({ channelId: globalThis.config.youtubeId });
                            // 接続開始イベント
                            globalThis.electron.youtubeChat.on('start', function (liveId) {
                                console.log('[Youtube Chat] connected');
                            });
                            // 接続終了イベント
                            globalThis.electron.youtubeChat.on('end', function (reason) {
                                console.log('[Youtube Chat] disconnect');
                            });
                            // // チャット受信
                            globalThis.electron.youtubeChat.on('comment', function (comment) {
                                var _a, _b;
                                var imgUrl = (_b = (_a = comment.author.thumbnail) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : '';
                                var name = comment.author.name;
                                var text = comment.message[0].text;
                                sendDom(name, text, imgUrl);
                            });
                            // // 何かエラーがあった
                            globalThis.electron.youtubeChat.on('error', function (err) {
                                electron_log_1.default.error('[Youtube Chat] error');
                                electron_log_1.default.error(err);
                                globalThis.electron.youtubeChat.stop();
                            });
                            globalThis.electron.youtubeChat.start();
                        }
                        catch (e) {
                            process.exit(1);
                        }
                    }
                }
                // WebSocketを立てる
                app.ws('/ws', function (ws, req) {
                    globalThis.electron.socket = ws;
                    ws.on('message', function (message) {
                        console.trace('Received: ' + message);
                        if (message === 'ping') {
                            ws.send('pong');
                        }
                    });
                    ws.on('close', function () {
                        console.log('I lost a client');
                    });
                });
                //指定したポートで待ち受け開始
                server = app.listen(config.port, function () {
                    console.log('[startServer]start server on port:' + config.port);
                });
                //成功メッセージ返却
                event.returnValue = 'success';
                return [2 /*return*/];
        }
    });
}); });
/**
 * サーバー停止
 */
electron_1.ipcMain.on('stop-server', function (event) {
    console.log('[startServer]server stop');
    server.close();
    app = null;
    event.returnValue = 'stop';
    if (globalThis.electron.twitchChat) {
        globalThis.electron.twitchChat.close();
        globalThis.electron.twitchChat.removeAllListeners();
    }
    if (globalThis.electron.youtubeChat) {
        globalThis.electron.youtubeChat.stop();
        globalThis.electron.youtubeChat.removeAllListeners();
    }
});
var sendDom = function (name, text, imgUrl) {
    var domStr = "<li class=\"list-item\"><span class=\"icon-block\"><img class=\"icon\" src=\"" + imgUrl + "\"></span><div class=\"content\">";
    if (globalThis.config.showName) {
        domStr += "<span class=\"name\">" + name + "</span>";
    }
    domStr += "<span class=\"res\">" + text + "</span></div></li>";
    if (globalThis.electron.socket)
        globalThis.electron.socket.send(domStr);
    if (config.playSe && globalThis.electron.seList.length > 0) {
        var wavfilepath = globalThis.electron.seList[Math.floor(Math.random() * globalThis.electron.seList.length)];
        globalThis.electron.mainWindow.webContents.send('play-sound', wavfilepath);
    }
};


/***/ }),

/***/ "./src/main/util.ts":
/*!**************************!*\
  !*** ./src/main/util.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
exports.readWavFiles = function (path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readdir(path, function (err, files) {
            if (err)
                reject(err);
            var fileList = files.filter(function (file) {
                return isExistFile(path + '/' + file) && /.*\.wav$/.test(file); //絞り込み
            });
            resolve(fileList);
        });
    });
};
var isExistFile = function (file) {
    try {
        fs_1.default.statSync(file).isFile();
        return true;
    }
    catch (err) {
        if (err.code === 'ENOENT')
            return false;
    }
};


/***/ }),

/***/ "./src/main/youtube-chat/index.ts":
/*!****************************************!*\
  !*** ./src/main/youtube-chat/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var live_chat_1 = __webpack_require__(/*! ./live-chat */ "./src/main/youtube-chat/live-chat.ts");
exports.LiveChat = live_chat_1.LiveChat;


/***/ }),

/***/ "./src/main/youtube-chat/live-chat.ts":
/*!********************************************!*\
  !*** ./src/main/youtube-chat/live-chat.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(/*! events */ "events");
var axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
var parser_1 = __webpack_require__(/*! ./parser */ "./src/main/youtube-chat/parser.ts");
/**
 * YouTubeライブチャット取得イベント
 */
var LiveChat = /** @class */ (function (_super) {
    __extends(LiveChat, _super);
    function LiveChat(options, interval) {
        if (interval === void 0) { interval = 1000; }
        var _this = _super.call(this) || this;
        _this.interval = interval;
        _this.prevTime = Date.now();
        if ('channelId' in options) {
            _this.channelId = options.channelId;
        }
        else if ('liveId' in options) {
            _this.liveId = options.liveId;
        }
        else {
            throw TypeError('Required channelId or liveId.');
        }
        return _this;
    }
    LiveChat.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, liveRes, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.channelId) return [3 /*break*/, 4];
                        url = "https://www.youtube.com/channel/" + this.channelId + "/live";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url, { headers: LiveChat.headers })];
                    case 2:
                        liveRes = _a.sent();
                        //   if (liveRes.data.match(/LIVE_STREAM_OFFLINE/)) {
                        //     this.emit('error', new Error('Live stream offline'));
                        //     return false;
                        //   }
                        this.liveId = liveRes.data.match(/videoId\\":\\"(.+?)\\/)[1];
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.emit('error', new Error("connection error url = " + url));
                        return [2 /*return*/, false];
                    case 4:
                        if (!this.liveId) {
                            this.emit('error', new Error('Live stream not found'));
                            return [2 /*return*/, false];
                        }
                        // console.log(`liveId = ${this.liveId}`);
                        this.observer = setInterval(function () { return _this.fetchChat(); }, this.interval);
                        this.emit('start', this.liveId);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    LiveChat.prototype.stop = function (reason) {
        if (this.observer) {
            clearInterval(this.observer);
            this.emit('end', reason);
        }
    };
    LiveChat.prototype.fetchChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, items, item, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://www.youtube.com/live_chat?v=" + this.liveId + "&pbj=1";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url, { headers: LiveChat.headers })];
                    case 2:
                        res = _a.sent();
                        items = res.data[1].response.contents.liveChatRenderer.actions
                            .slice(0, -1)
                            .filter(function (v) {
                            var messageRenderer = parser_1.actionToRenderer(v);
                            if (messageRenderer !== null) {
                                if (messageRenderer) {
                                    return parser_1.usecToTime(messageRenderer.timestampUsec) > _this.prevTime;
                                }
                            }
                            return false;
                        })
                            .map(function (v) { return parser_1.parseData(v); });
                        items.forEach(function (v) {
                            if (v) {
                                _this.emit('comment', v);
                            }
                        });
                        if (items.length > 0) {
                            item = items[items.length - 1];
                            if (item)
                                this.prevTime = item.timestamp;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.emit('error', new Error("Error occured at fetchchat url=" + url));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LiveChat.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    LiveChat.headers = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36' };
    return LiveChat;
}(events_1.EventEmitter));
exports.LiveChat = LiveChat;


/***/ }),

/***/ "./src/main/youtube-chat/parser.ts":
/*!*****************************************!*\
  !*** ./src/main/youtube-chat/parser.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function parseThumbnailToImageItem(data, alt) {
    var thumbnail = data.pop();
    if (thumbnail) {
        return {
            url: thumbnail.url,
            width: thumbnail.width,
            height: thumbnail.height,
            alt: alt,
        };
    }
    return;
}
function parseEmojiToImageItem(data) {
    return parseThumbnailToImageItem(data.emoji.image.thumbnails, data.emoji.shortcuts.shift());
}
function parseMessages(runs) {
    return runs.map(function (run) {
        if ('text' in run) {
            return run;
        }
        else {
            return parseEmojiToImageItem(run);
        }
    });
}
function actionToRenderer(action) {
    if (!action.addChatItemAction) {
        return null;
    }
    var item = action.addChatItemAction.item;
    if (item.liveChatTextMessageRenderer) {
        return item.liveChatTextMessageRenderer;
    }
    else if (item.liveChatPaidMessageRenderer) {
        return item.liveChatPaidMessageRenderer;
    }
    else if (item.liveChatPaidStickerRenderer) {
        return item.liveChatPaidStickerRenderer;
    }
    else {
        return item.liveChatMembershipItemRenderer;
    }
}
exports.actionToRenderer = actionToRenderer;
function usecToTime(usec) {
    return Math.floor(Number(usec) / 1000);
}
exports.usecToTime = usecToTime;
function parseData(data) {
    var messageRenderer = actionToRenderer(data);
    if (messageRenderer === null) {
        return null;
    }
    var message = [];
    if ('message' in messageRenderer) {
        message = messageRenderer.message.runs;
    }
    else if ('headerSubtext' in messageRenderer) {
        message = messageRenderer.headerSubtext.runs;
    }
    var ret = {
        id: messageRenderer.id,
        author: {
            name: messageRenderer.authorName.simpleText,
            thumbnail: parseThumbnailToImageItem(messageRenderer.authorPhoto.thumbnails, messageRenderer.authorName.simpleText),
            channelId: messageRenderer.authorExternalChannelId,
        },
        message: parseMessages(message),
        membership: Boolean('headerSubtext' in messageRenderer),
        isOwner: false,
        timestamp: usecToTime(messageRenderer.timestampUsec),
    };
    if (messageRenderer.authorBadges) {
        var badge = messageRenderer.authorBadges[0].liveChatAuthorBadgeRenderer;
        if (badge.customThumbnail) {
            ret.author.badge = {
                thumbnail: parseThumbnailToImageItem(badge.customThumbnail.thumbnails, badge.tooltip),
                label: badge.tooltip,
            };
        }
        else {
            ret.isOwner = true;
        }
    }
    if ('sticker' in messageRenderer) {
        ret.superchat = {
            amount: messageRenderer.purchaseAmountText.simpleText,
            color: messageRenderer.backgroundColor,
            sticker: parseThumbnailToImageItem(messageRenderer.sticker.thumbnails, messageRenderer.sticker.accessibility.accessibilityData.label),
        };
    }
    else if ('purchaseAmountText' in messageRenderer) {
        ret.superchat = {
            amount: messageRenderer.purchaseAmountText.simpleText,
            color: messageRenderer.bodyBackgroundColor,
        };
    }
    return ret;
}
exports.parseData = parseData;


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "dank-twitch-irc":
/*!**********************************!*\
  !*** external "dank-twitch-irc" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dank-twitch-irc");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "electron-log":
/*!*******************************!*\
  !*** external "electron-log" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-log");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-ws":
/*!*****************************!*\
  !*** external "express-ws" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-ws");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "iconv-lite":
/*!*****************************!*\
  !*** external "iconv-lite" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iconv-lite");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jquery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),

/***/ "jsdom":
/*!************************!*\
  !*** external "jsdom" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsdom");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map