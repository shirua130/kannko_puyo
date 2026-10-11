//=============================================================================
// RPG Maker MZ - Puyo Game (13-Row Specification Standard AI Version)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ぷよぷよ風の1人用ゲームとCPU対戦画面を追加します。（13段仕様・CPU先読みAI版）
 * @author Codex
 *
 * @param CellSize
 * @text 1マスの大きさ
 * @type number
 * @min 24
 * @max 64
 * @default 40
 * @desc ぷよ1個の表示サイズ（ピクセル）です。
 *
 * @param FallFrames
 * @text 自然落下間隔
 * @type number
 * @min 3
 * @max 120
 * @default 30
 * @desc ぷよが1マス落下するまでのフレーム数です。
 *
 * @param SpawnFallDelayFrames
 * @text 出現後の落下開始待ち
 * @type number
 * @min 0
 * @max 600
 * @default 60
 * @desc ぷよが出現してから自然落下を開始するまでの待ち時間です。60フレームで約1秒（60FPS時）。その間も移動・回転できます。
 *
 * @param ClearFrames
 * @text 消去演出時間
 * @type number
 * @min 6
 * @max 120
 * @default 36
 * @desc つながったぷよが点滅して消えるまでのフレーム数です。
 *
 * @param PlacementJudgeDelayFrames
 * @text 設置判定猶予
 * @type number
 * @min 0
 * @max 60
 * @default 6
 * @desc ぷよを設置してから連鎖判定を開始するまでのフレーム数です。0で即時判定します。
 *
 * @param CpuNormalThinkFrames
 * @text よわい：思考待ち
 * @type number
 * @min 0
 * @max 120
 * @default 36
 *
 * @param CpuNormalFastFallFrames
 * @text よわい：落下間隔
 * @type number
 * @min 1
 * @max 30
 * @default 10
 *
 * @param CpuNormalRandomness
 * @text よわい：ランダム性
 * @type number
 * @min 0
 * @max 100
 * @default 35
 *
 * @param CpuNormalMistakeRate
 * @text よわい：判断ミス率
 * @type number
 * @min 0
 * @max 100
 * @default 20
 *
 * @param CpuNormalLookaheadDepth
 * @text よわい：連鎖先読み
 * @type number
 * @min 1
 * @max 10
 * @default 3
 *
 * @param CpuNormalChainBuildBias
 * @text よわい：連鎖構築重視度
 * @type number
 * @min 0
 * @max 100
 * @default 40
 *
 * @param CpuNormalTargetChainCount
 * @text よわい：目標連鎖数
 * @type number
 * @min 1
 * @max 10
 * @default 3
 * @desc 連鎖構築で目指す連鎖数です。消去開始連鎖数とは独立して評価します。
 *
 * @param CpuNormalClearChainThreshold
 * @text よわい：消去開始連鎖数
 * @type number
 * @min 1
 * @max 10
 * @default 1
 *
 * @param CpuNormalGarbageEmergencyRows
 * @text よわい：緊急段数
 * @type number
 * @min 1
 * @max 6
 * @default 3
 * @desc 盤面上部からこの段数以内にぷよ・おじゃまが迫ったとき、消去して段数を減らす緊急動作を優先します。
 *
 * @param CpuStrongThinkFrames
 * @text ふつう：思考待ち
 * @type number
 * @min 0
 * @max 120
 * @default 24
 *
 * @param CpuStrongFastFallFrames
 * @text ふつう：落下間隔
 * @type number
 * @min 1
 * @max 30
 * @default 6
 *
 * @param CpuStrongRandomness
 * @text ふつう：ランダム性
 * @type number
 * @min 0
 * @max 100
 * @default 10
 *
 * @param CpuStrongMistakeRate
 * @text ふつう：判断ミス率
 * @type number
 * @min 0
 * @max 100
 * @default 5
 *
 * @param CpuStrongLookaheadDepth
 * @text ふつう：連鎖先読み
 * @type number
 * @min 1
 * @max 10
 * @default 5
 * @desc CPUが先読みする連鎖判定の深さです。最大10連鎖まで指定できます。
 *
 * @param CpuStrongChainBuildBias
 * @text ふつう：連鎖構築重視度
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param CpuStrongTargetChainCount
 * @text ふつう：目標連鎖数
 * @type number
 * @min 1
 * @max 10
 * @default 5
 * @desc 連鎖構築で目指す連鎖数です。消去開始連鎖数とは独立して評価します。
 *
 * @param CpuStrongClearChainThreshold
 * @text ふつう：消去開始連鎖数
 * @type number
 * @min 1
 * @max 10
 * @default 2
 *
 * @param CpuStrongGarbageEmergencyRows
 * @text ふつう：緊急段数
 * @type number
 * @min 1
 * @max 6
 * @default 3
 * @desc 盤面上部からこの段数以内にぷよ・おじゃまが迫ったとき、消去して段数を減らす緊急動作を優先します。
 *
 * @param CpuGodThinkFrames
 * @text 卍ゴッド卍：思考待ち
 * @type number
 * @min 0
 * @max 120
 * @default 12
 *
 * @param CpuGodFastFallFrames
 * @text 卍ゴッド卍：落下間隔
 * @type number
 * @min 1
 * @max 30
 * @default 3
 *
 * @param CpuGodRandomness
 * @text 卍ゴッド卍：ランダム性
 * @type number
 * @min 0
 * @max 100
 * @default 0
 *
 * @param CpuGodMistakeRate
 * @text 卍ゴッド卍：判断ミス率
 * @type number
 * @min 0
 * @max 100
 * @default 0
 *
 * @param CpuGodLookaheadDepth
 * @text 卍ゴッド卍：連鎖先読み
 * @type number
 * @min 1
 * @max 10
 * @default 8
 * @desc CPUが先読みする連鎖判定の深さです。最大10連鎖まで指定できます。
 *
 * @param CpuGodChainBuildBias
 * @text 卍ゴッド卍：連鎖構築重視度
 * @type number
 * @min 0
 * @max 100
 * @default 92
 *
 * @param CpuGodTargetChainCount
 * @text 卍ゴッド卍：目標連鎖数
 * @type number
 * @min 1
 * @max 10
 * @default 8
 * @desc 連鎖構築で目指す連鎖数です。消去開始連鎖数とは独立して評価します。
 *
 * @param CpuGodClearChainThreshold
 * @text 卍ゴッド卍：消去開始連鎖数
 * @type number
 * @min 1
 * @max 10
 * @default 2
 *
 * @param CpuGodGarbageEmergencyRows
 * @text 卍ゴッド卍：緊急段数
 * @type number
 * @min 1
 * @max 6
 * @default 3
 * @desc 盤面上部からこの段数以内にぷよ・おじゃまが迫ったとき、消去して段数を減らす緊急動作を優先します。
 *
 * @param CpuSearchBeamWidth
 * @text CPU：先読み探索幅
 * @type number
 * @min 5
 * @max 64
 * @default 16
 * @desc CPUの先読み探索で各段階に残す上位候補数です。大きいほど多くの構築ルートを比較します。
 *
 * @param CpuSearchNodeBudget
 * @text CPU：展開ノード上限
 * @type number
 * @min 180
 * @max 1000000
 * @default 1200
 * @desc CPUの先読み探索で評価する配置候補の上限です。大きいほど探索量と計算時間が増えます。
 *
 * @param CpuNextPairReferenceCount
 * @text CPU：実際のNEXT参照数（組）
 * @type number
 * @min 1
 * @max 40
 * @default 4
 * @desc CPUの主探索で実際の色ペアを順番どおりに使う組数です。最大40組まで設定でき、指定数を超えた先は推定した色ペアを使用します。
 *
 * @param DisableCpuAttackToPlayer
 * @text 攻撃無効フラグ
 * @type boolean
 * @on ON
 * @off OFF
 * @default false
 * @desc ON時、CPUからプレイヤーへのお邪魔ぷよは予告表示を維持したまま降ってこなくなります。プレイヤーからCPUへの攻撃には影響しません。
 *
 * @param DetailDisplayFlag
 * @text 詳細表示フラグ
 * @type boolean
 * @on ON
 * @off OFF
 * @default false
 * @desc ON時、CPU戦画面の右上に現在の展開ノード数とWorker数を表示します。
 *
 * @param BluePuyo
 * @text 青ぷよ画像
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵の青ぷよを使用します。1個のぷよ画像を指定してください。
 *
 * @param RedPuyo
 * @text 赤ぷよ画像
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵の赤ぷよを使用します。1個のぷよ画像を指定してください。
 *
 * @param YellowPuyo
 * @text 黄ぷよ画像
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵の黄ぷよを使用します。1個のぷよ画像を指定してください。
 *
 * @param GreenPuyo
 * @text 緑ぷよ画像
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵の緑ぷよを使用します。1個のぷよ画像を指定してください。
 *
 * @param GarbagePuyo
 * @text お邪魔ぷよ画像
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵のお邪魔ぷよを使用します。盤面に降るお邪魔ぷよの画像です。
 *
 * @param PreviewSmallPuyo
 * @text 予告：小ぷよ画像 (1個)
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵アイコンを描画します。小ぷよ（1個分）の予告画像です。
 *
 * @param PreviewBigPuyo
 * @text 予告：大ぷよ画像 (6個)
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵アイコンを描画します。大ぷよ（6個分）の予告画像です。
 *
 * @param PreviewRockPuyo
 * @text 予告：岩ぷよ画像 (30個)
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵アイコンを描画します。岩ぷよ（30個分）の予告画像です。
 *
 * @param PreviewStarPuyo
 * @text 予告：星ぷよ画像 (180個)
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵アイコンを描画します。星ぷよ（180個分）の予告画像です。
 *
 * @param PreviewMoonPuyo
 * @text 予告：月ぷよ画像 (360個)
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵アイコンを描画します。月ぷよ（360個分）の予告画像です。
 *
 * @param PreviewCometPuyo
 * @text 予告：彗星ぷよ画像 (720個)
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵アイコンを描画します。彗星ぷよ（720個分）の予告画像です。
 *
 * @param PreviewSaturnPuyo
 * @text 予告：土星ぷよ画像 (1440個)
 * @type file
 * @dir img/puyo
 * @default
 * @desc 未指定時は内蔵アイコンを描画します。土星ぷよ（1440個分）の予告画像です。
 *
 * @param PreviewPuyoSize
 * @text 予告ぷよ表示サイズ
 * @type number
 * @min 0
 * @max 38
 * @default 0
 * @desc 画面上部に表示される予告ぷよの表示サイズ（ピクセル、10〜38）です。0を指定した場合は規定サイズ（13〜22px）を使用します。
 *
 * @param PreviewPuyoScaleByType
 * @text 予告ぷよ比率スケーリング
 * @type boolean
 * @on ON
 * @off OFF
 * @default false
 * @desc ON時、予告ぷよ表示サイズを基準にして小ぷよ〜土星ぷよのサイズ比率を維持してスケーリングします。OFF時は全種類を指定サイズで統一します。
 *
 * @param ChainVoice1
 * @text 1連鎖目ボイス
 * @type file
 * @dir audio/puyose
 * @default
 * @desc 1連鎖目に再生するボイスです。未指定の場合は再生しません。
 *
 * @param ChainVoice2
 * @text 2連鎖目ボイス
 * @type file
 * @dir audio/puyose
 * @default
 * @desc 2連鎖目に再生するボイスです。未指定の場合は再生しません。
 *
 * @param ChainVoice3
 * @text 3連鎖目ボイス
 * @type file
 * @dir audio/puyose
 * @default
 * @desc 3連鎖目に再生するボイスです。未指定の場合は再生しません。
 *
 * @param ChainVoice4
 * @text 4連鎖目ボイス
 * @type file
 * @dir audio/puyose
 * @default
 * @desc 4連鎖目に再生するボイスです。未指定の場合は再生しません。
 *
 * @param ChainVoice5
 * @text 5連鎖目ボイス
 * @type file
 * @dir audio/puyose
 * @default
 * @desc 5連鎖目に再生するボイスです。未指定の場合は再生しません。
 *
 * @param ChainVoice6
 * @text 6連鎖目以降ボイス
 * @type file
 * @dir audio/puyose
 * @default
 * @desc 6連鎖目以降に再生するボイスです。7連鎖目以降もこのボイスを再生します。
 *
 * @command start
 * @text ぷよゲーム開始
 * @desc ぷよぷよ風ゲームの1人用画面を開始します。
 *
 * @command startCpu
 * @text CPU戦開始
 * @desc CPUと対戦するぷよぷよ風ゲームを開始します。
 *
 * @help
 * PuyoGame.js
 *
 * 6列×12段表示（内部13段）、4つ以上つながると消えるぷよぷよ風ゲームです。
 * 「CPU戦開始」からCPUとの対戦を開始できます。
 * CPUの連鎖先読み・目標連鎖数・消去開始連鎖数は最大10を指定できます。探索幅は最大64、展開ノード上限は最大1000000です。
 * CPU戦では配置候補の評価をWeb Workerに分散します。Workerが利用できない環境では自動的に同期CPU探索へ戻ります。
 * 「目標連鎖数」と「消去開始連鎖数」は独立しています。実際のNEXT列で途中消去なしに目標連鎖へ到達できる配置が見つかった場合、小連鎖を起こす候補を避けます。緊急時や到達ルートが見つからない場合は消去を許可します。
 * 「CPU：実際のNEXT参照数（組）」で1〜40組を設定できます。設定した数まで実際の色ペアを順番どおりに使い、それより先は推定色ペアを使用します。
 * CPU探索は最大10連鎖まで対応します。
 * 13段目（画面外）のぷよは消去グループ判定に含めず、消去後に画面内へ落下してから連鎖判定に参加します。
 * 3列目以外は13段目の使用による高さ超過減点を行いません。3列目はゲームオーバーリスクを評価します。
 */

(() => {
    "use strict";

    const pluginName = (() => {
        const script = document.currentScript;
        const match = script && script.src.match(/([^/]+)\.js$/);
        return match ? match[1] : "PuyoGame";
    })();
    const parameters = PluginManager.parameters(pluginName);

    const BOARD_WIDTH = 6;
    const VISIBLE_HEIGHT = 12;
    const BOARD_HEIGHT = 13;
    const ACTIVE_MIN_Y = -2; // -1=14段目, -2=15段目
    const COLORS = 4;
    const EMPTY = -1;
    const GARBAGE = -2;
    const GARBAGE_TARGET_POINTS = 70;
    const CHAIN_ATTACK_POWERS = [
        0, 0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256,
        288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608,
        640, 672
    ];
    const GARBAGE_DROP_FRAMES = 18;
    const GARBAGE_PREVIEW_UNITS = [
        { value: 1440, size: 22, color: "#e0c15a", inner: "#f2dc7d", symbol: "土" },
        { value: 720, size: 21, color: "#62aebe", inner: "#91d4df", symbol: "彗" },
        { value: 360, size: 20, color: "#ad72c4", inner: "#d19ae1", symbol: "月" },
        { value: 180, size: 19, color: "#d6883f", inner: "#f0b76f", symbol: "★" },
        { value: 30, size: 18, color: "#aa4652", inner: "#d36b72", symbol: "" },
        { value: 6, size: 16, color: "#727d87", inner: "#aeb8c0", symbol: "" },
        { value: 1, size: 13, color: "#727d87", inner: "#c2c9ce", symbol: "" }
    ];
    const imageFiles = [
        String(parameters.BluePuyo || "").trim(),
        String(parameters.RedPuyo || "").trim(),
        String(parameters.YellowPuyo || "").trim(),
        String(parameters.GreenPuyo || "").trim()
    ];
    const garbagePuyoFile = String(parameters.GarbagePuyo || "").trim();
    const garbagePreviewFiles = {
        1440: String(parameters.PreviewSaturnPuyo || parameters.SaturnGarbagePuyo || "").trim(),
        720: String(parameters.PreviewCometPuyo || parameters.CometGarbagePuyo || "").trim(),
        360: String(parameters.PreviewMoonPuyo || parameters.MoonGarbagePuyo || "").trim(),
        180: String(parameters.PreviewStarPuyo || parameters.StarGarbagePuyo || "").trim(),
        30: String(parameters.PreviewRockPuyo || parameters.RockGarbagePuyo || "").trim(),
        6: String(parameters.PreviewBigPuyo || parameters.BigGarbagePuyo || "").trim(),
        1: String(parameters.PreviewSmallPuyo || parameters.SmallGarbagePuyo || "").trim()
    };
    const chainVoiceFiles = [
        String(parameters.ChainVoice1 || "").trim(),
        String(parameters.ChainVoice2 || "").trim(),
        String(parameters.ChainVoice3 || "").trim(),
        String(parameters.ChainVoice4 || "").trim(),
        String(parameters.ChainVoice5 || "").trim(),
        String(parameters.ChainVoice6 || "").trim()
    ];
    const cellSize = Math.max(24, Number(parameters.CellSize || 40));
    const fallFrames = Math.max(3, Number(parameters.FallFrames || 30));
    const spawnFallDelayFrames = readIntegerParameter(
        "SpawnFallDelayFrames", 60, 0, 600
    );
    const clearFrames = Math.max(6, Number(parameters.ClearFrames || 36));
    const configuredPlacementJudgeDelayFrames = Number(
        parameters.PlacementJudgeDelayFrames
    );
    const placementJudgeDelayFrames = Number.isFinite(
        configuredPlacementJudgeDelayFrames
    ) ? Math.max(0, Math.floor(configuredPlacementJudgeDelayFrames)) : 6;

    function normalizePuyoFileName(file) {
        return String(file || "")
            .trim()
            .replace(/^.*[\\/]/, "")
            .replace(/\.(png|jpe?g|webp)$/i, "");
    }

    function normalizeAudioFileName(file) {
        return String(file || "")
            .trim()
            .replace(/^.*[\\/]/, "")
            .replace(/\.(ogg|m4a|wav|mp3)$/i, "");
    }

    function readIntegerParameter(name, defaultValue, min, max) {
        const value = Number(parameters[name]);
        if (!Number.isFinite(value)) {
            return defaultValue;
        }
        return Math.min(max, Math.max(min, Math.floor(value)));
    }

    const previewPuyoSize = readIntegerParameter(
        "PreviewPuyoSize", 0, 0, 38
    );
    const previewPuyoScaleByType =
        String(parameters.PreviewPuyoScaleByType || "false").toLowerCase() === "true";

    function getPreviewPuyoIconSize(unit, hasCustomImage) {
        if (previewPuyoSize > 0) {
            if (previewPuyoScaleByType) {
                const ratio = unit.size / 22;
                return Math.max(10, Math.round(previewPuyoSize * ratio));
            }
            return previewPuyoSize;
        }
        return hasCustomImage ? Math.min(unit.size, 22) : Math.min(unit.size, 18);
    }

    function readCpuDifficultyConfig(prefix, fallback) {
        const lookaheadDepth = readIntegerParameter(
            `${prefix}LookaheadDepth`,
            fallback.lookaheadDepth,
            1,
            10
        );
        return {
            thinkFrames: readIntegerParameter(
                `${prefix}ThinkFrames`, fallback.thinkFrames, 0, 120
            ),
            fastFallFrames: readIntegerParameter(
                `${prefix}FastFallFrames`, fallback.fastFallFrames, 1, 30
            ),
            randomness: readIntegerParameter(
                `${prefix}Randomness`, fallback.randomness, 0, 100
            ),
            mistakeRate: readIntegerParameter(
                `${prefix}MistakeRate`, fallback.mistakeRate, 0, 100
            ),
            lookaheadDepth,
            chainBuildBias: readIntegerParameter(
                `${prefix}ChainBuildBias`, fallback.chainBuildBias, 0, 100
            ),
            targetChainCount: readIntegerParameter(
                `${prefix}TargetChainCount`, fallback.targetChainCount, 1, 10
            ),
            // 消去開始の閾値は探索深度とは独立。目標連鎖数より低く設定できる。
            clearChainThreshold: readIntegerParameter(
                `${prefix}ClearChainThreshold`, fallback.clearChainThreshold, 1, 10
            ),
            emergencyRows: readIntegerParameter(
                `${prefix}EmergencyRows`,
                readIntegerParameter(
                    `${prefix}GarbageEmergencyRows`,
                    fallback.emergencyRows || fallback.garbageEmergencyRows || 3,
                    1,
                    6
                ),
                1,
                6
            ),
            get garbageEmergencyRows() {
                return this.emergencyRows;
            }
        };
    }

    // CPU探索設定。旧プロジェクトのGpuSearch*値も互換目的で読み取る。
    const CPU_SEARCH_BEAM_WIDTH = readIntegerParameter(
        "CpuSearchBeamWidth",
        readIntegerParameter("GpuSearchBeamWidth", 16, 5, 64),
        5,
        64
    );
    const CPU_SEARCH_NODE_BUDGET = readIntegerParameter(
        "CpuSearchNodeBudget",
        readIntegerParameter("GpuSearchNodeBudget", 1200, 180, 1000000),
        180,
        1000000
    );
    // 探索で実際の色ペアを順番どおりに参照する組数（現在の手ではなく、次に置くNEXTから数える）。
    const CPU_NEXT_PAIR_REFERENCE_COUNT = readIntegerParameter(
        "CpuNextPairReferenceCount",
        4,
        1,
        40
    );

    // ON時はCPUからプレイヤーへのお邪魔落下だけを無効化する。
    // pendingGarbage自体は維持するため、予告表示や相殺処理は通常どおり動作する。
    const DISABLE_CPU_ATTACK_TO_PLAYER =
        String(parameters.DisableCpuAttackToPlayer || "false").toLowerCase() === "true";
    const SHOW_AI_DETAIL_DISPLAY =
        String(parameters.DetailDisplayFlag || "false").toLowerCase() === "true";

    // 実行環境が報告する論理プロセッサ数をWorker数として使用する。
    // hardwareConcurrencyが取得できない環境に限り、最低1 Workerを使用する。
    const CPU_AI_WORKER_COUNT = (() => {
        const reportedCount = typeof navigator !== "undefined"
            ? Number(navigator.hardwareConcurrency)
            : 0;
        return Number.isFinite(reportedCount) && reportedCount >= 1
            ? Math.floor(reportedCount)
            : 1;
    })();
    let cpuAiWorkersPermanentlyDisabled = false;
    let cpuAiWorkerWarningShown = false;

    const cpuDifficultyConfigs = {
        normal: readCpuDifficultyConfig("CpuNormal", {
            thinkFrames: 36,
            fastFallFrames: 10,
            randomness: 35,
            mistakeRate: 20,
            lookaheadDepth: 3,
            chainBuildBias: 40,
            targetChainCount: 3,
            clearChainThreshold: 1,
            emergencyRows: 3,
            garbageEmergencyRows: 3
        }),
        strong: readCpuDifficultyConfig("CpuStrong", {
            thinkFrames: 24,
            fastFallFrames: 6,
            randomness: 10,
            mistakeRate: 5,
            lookaheadDepth: 5,
            chainBuildBias: 90,
            targetChainCount: 5,
            clearChainThreshold: 2,
            emergencyRows: 3,
            garbageEmergencyRows: 3
        }),
        god: readCpuDifficultyConfig("CpuGod", {
            thinkFrames: 12,
            fastFallFrames: 3,
            randomness: 0,
            mistakeRate: 0,
            lookaheadDepth: 8,
            chainBuildBias: 92,
            targetChainCount: 8,
            clearChainThreshold: 2,
            emergencyRows: 3,
            garbageEmergencyRows: 3
        })
    };
    const cpuDifficultyNames = {
        normal: "よわい",
        strong: "ふつう",
        god: "卍ゴッド卍"
    };

    class PuyoGameModel {
        constructor() {
            this.onAttack = null;
            this.reset();
        }

        reset() {
            this.cells = Array.from({ length: BOARD_HEIGHT }, () => {
                return Array(BOARD_WIDTH).fill(EMPTY);
            });
            // 現在の手を含む色ペアキュー。CPUが参照する未来の色も、実際のゲームで順番に出現する。
            this.nextPairQueue = [];
            this.ensureNextPairQueue(CPU_NEXT_PAIR_REFERENCE_COUNT + 1);
            this.syncNextPairPreview();
            this.active = null;
            this.phase = "falling";
            this.phaseTimer = 0;
            this.fallTimer = 0;
            this.clearingCells = [];
            this.garbageClearingCells = [];
            this.chain = 0;
            this.maxChain = 0;
            this.score = 0;
            this.pendingGarbage = 0;
            this.garbageDropCells = [];
            this.garbageDropAllowed = true;
            this.attackRemainder = 0;
            this.gameOver = false;
            this.spawnPair();
        }

        makePair() {
            return [this.randomColor(), this.randomColor()];
        }

        randomColor() {
            return Math.floor(Math.random() * COLORS);
        }

        ensureNextPairQueue(minCount = CPU_NEXT_PAIR_REFERENCE_COUNT + 1) {
            if (!Array.isArray(this.nextPairQueue)) {
                this.nextPairQueue = [];
            }
            while (this.nextPairQueue.length < minCount) {
                this.nextPairQueue.push(this.makePair());
            }
        }

        syncNextPairPreview() {
            this.ensureNextPairQueue(2);
            this.nextColors = this.nextPairQueue[0].slice();
            this.nextNextColors = this.nextPairQueue[1].slice();
        }

        spawnPair() {
            if (this.applyPendingGarbage()) {
                return;
            }
            this.ensureNextPairQueue(CPU_NEXT_PAIR_REFERENCE_COUNT + 1);
            const activeColors = this.nextPairQueue.shift();
            this.ensureNextPairQueue(CPU_NEXT_PAIR_REFERENCE_COUNT + 1);
            this.syncNextPairPreview();
            this.active = {
                x: 2,
                // 初期位置は縦向きで、下側が表示盤面の最上段（12段目）、
                // 上側が非表示の内部13段目になるようにする。
                y: 1,
                rotation: 0,
                colors: activeColors.slice()
            };
            this.phase = "falling";
            this.phaseTimer = 0;
            this.fallTimer = 0;
            this.spawnFallDelayTimer = 0;
            this.chain = 0;
            this.clearingCells = [];
            this.garbageClearingCells = [];
            if (!this.canPlacePair(this.active.x, this.active.y, this.active.rotation)) {
                // 出現位置が塞がっている場合のみ、さらに1段上の非表示位置を試す。
                this.active.y = 0;
                if (!this.canPlacePair(this.active.x, this.active.y, this.active.rotation)) {
                    this.setGameOver();
                }
            }
        }

        applyPendingGarbage() {
            if (this.pendingGarbage <= 0 || !this.garbageDropAllowed) {
                return false;
            }
            this.applyGravity();
            let remaining = this.pendingGarbage;
            this.pendingGarbage = 0;
            const dropCells = [];
            while (remaining > 0) {
                let placed = 0;
                for (let x = 0; x < BOARD_WIDTH && remaining > 0; x++) {
                    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
                        if (this.cells[y][x] === EMPTY) {
                            this.cells[y][x] = GARBAGE;
                            dropCells.push({ x, y });
                            remaining -= 1;
                            placed += 1;
                            break;
                        }
                    }
                }
                if (placed === 0) {
                    this.setGameOver();
                    return true;
                }
            }
            this.garbageDropCells = dropCells;
            this.phase = "garbageDropping";
            this.phaseTimer = GARBAGE_DROP_FRAMES;
            this.active = null;
            return true;
        }

        receiveGarbage(amount) {
            this.pendingGarbage += Math.max(0, Math.floor(amount));
        }

        setGarbageDropAllowed(allowed) {
            this.garbageDropAllowed = !!allowed;
        }

        cancelGarbage(amount) {
            const requested = Math.max(0, Math.floor(amount));
            const canceled = Math.min(this.pendingGarbage, requested);
            this.pendingGarbage -= canceled;
            return requested - canceled;
        }

        setGameOver() {
            this.gameOver = true;
            this.phase = "gameover";
            this.active = null;
        }

        pairCells(x, y, rotation) {
            const directions = [
                { x: 0, y: -1 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 0 }
            ];
            const direction = directions[((rotation % 4) + 4) % 4];
            return [
                { x: x, y: y },
                { x: x + direction.x, y: y + direction.y }
            ];
        }

        canPlacePair(x, y, rotation) {
            const cells = this.pairCells(x, y, rotation);
            return cells.every(cell => {
                return cell.x >= 0 && cell.x < BOARD_WIDTH &&
                    cell.y >= ACTIVE_MIN_Y && cell.y < BOARD_HEIGHT &&
                    (cell.y < 0 || this.cells[cell.y][cell.x] === EMPTY);
            });
        }

        moveHorizontal(amount) {
            if (this.phase !== "falling" || !this.active) {
                return false;
            }
            const x = this.active.x + amount;
            if (this.canPlacePair(x, this.active.y, this.active.rotation)) {
                this.active.x = x;
                return true;
            }
            return false;
        }

        rotate(direction) {
            if (this.phase !== "falling" || !this.active) {
                return false;
            }
            const turn = direction < 0 ? -1 : 1;
            const rotation = (this.active.rotation + turn + 4) % 4;
            const offsets = [
                { x: 0, y: 0 },
                { x: -1, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: -1, y: -1 },
                { x: 1, y: -1 }
            ];
            for (const offset of offsets) {
                if (this.canPlacePair(
                    this.active.x + offset.x,
                    this.active.y + offset.y,
                    rotation
                )) {
                    this.active.x += offset.x;
                    this.active.y += offset.y;
                    this.active.rotation = rotation;
                    return true;
                }
            }
            if (this.active.rotation % 2 === 0) {
                const verticalRotation = (this.active.rotation + 2) % 4;
                const verticalY = this.active.y +
                    (this.active.rotation === 0 ? -1 : 1);
                if (this.canPlacePair(
                    this.active.x,
                    verticalY,
                    verticalRotation
                )) {
                    this.active.y = verticalY;
                    this.active.rotation = verticalRotation;
                    return true;
                }
            }
            return false;
        }

        moveDown() {
            if (this.phase !== "falling" || !this.active) {
                return false;
            }
            if (this.canPlacePair(
                this.active.x,
                this.active.y + 1,
                this.active.rotation
            )) {
                this.active.y += 1;
                return true;
            }
            this.lockPair();
            return false;
        }

        hardDrop() {
            if (this.phase !== "falling" || !this.active) {
                return;
            }
            while (this.canPlacePair(
                this.active.x,
                this.active.y + 1,
                this.active.rotation
            )) {
                this.active.y += 1;
            }
            this.lockPair();
        }

        lockPair() {
            if (this.phase !== "falling" || !this.active) {
                return;
            }
            const pair = this.pairCells(
                this.active.x,
                this.active.y,
                this.active.rotation
            );
            pair.forEach((cell, index) => {
                if (cell.y >= 0 && cell.y < BOARD_HEIGHT) {
                    this.cells[cell.y][cell.x] = this.active.colors[index];
                }
            });
            if (this.gameOver) {
                return;
            }
            this.active = null;
            this.phase = "checking";
            this.phaseTimer = placementJudgeDelayFrames;
            this.fallTimer = 0;
            this.clearingCells = [];
            this.garbageClearingCells = [];
            if (placementJudgeDelayFrames <= 0) {
                this.resolveBoard();
            }
        }

        update() {
            if (this.gameOver) {
                return;
            }
            if (this.phase === "falling") {
                // 出現直後は指定フレーム数だけ自然落下を待つ。
                // 待機中も入力による左右移動・回転は通常どおり受け付ける。
                if (this.spawnFallDelayTimer < spawnFallDelayFrames) {
                    this.spawnFallDelayTimer += 1;
                    return;
                }
                this.fallTimer += 1;
                if (this.fallTimer >= fallFrames) {
                    this.fallTimer = 0;
                    this.moveDown();
                }
            } else if (this.phase === "checking") {
                this.phaseTimer -= 1;
                if (this.phaseTimer <= 0) {
                    this.resolveBoard();
                }
            } else if (this.phase === "clearing") {
                this.phaseTimer -= 1;
                if (this.phaseTimer <= 0) {
                    this.finishClearing();
                }
            } else if (this.phase === "garbageDropping") {
                this.phaseTimer -= 1;
                if (this.phaseTimer <= 0) {
                    this.finishGarbageDropping();
                }
            }
        }

        finishGarbageDropping() {
            this.garbageDropCells = [];
            this.spawnPair();
        }

        resolveBoard() {
            this.applyGravity();
            const matches = this.findMatches();
            if (matches.length > 0) {
                const adjacentGarbage = this.findAdjacentGarbage(matches);
                this.chain += 1;
                this.maxChain = Math.max(this.maxChain, this.chain);
                this.clearingCells = matches;
                this.garbageClearingCells = adjacentGarbage;
                this.phase = "clearing";
                this.phaseTimer = clearFrames;
            } else {
                if (this.cells[1][2] !== EMPTY) {
                    this.setGameOver();
                } else {
                    this.spawnPair();
                }
            }
        }

        finishClearing() {
            const count = this.clearingCells.length;

            const connectionBonusTable = [0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 10];
            const clearSet = new Set(this.clearingCells.map(c => `${c.x},${c.y}`));
            const visitedClear = new Set();
            const colorGroups = [];
            const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];

            for (const cell of this.clearingCells) {
                const key = `${cell.x},${cell.y}`;
                if (visitedClear.has(key)) continue;
                const color = this.cells[cell.y][cell.x];
                if (color < 0) continue;
                const queue = [cell];
                visitedClear.add(key);
                let size = 0;
                while (queue.length > 0) {
                    const cur = queue.shift();
                    size++;
                    for (const d of dirs) {
                        const nx = cur.x + d.x;
                        const ny = cur.y + d.y;
                        const nk = `${nx},${ny}`;
                        if (!visitedClear.has(nk) &&
                            clearSet.has(nk) &&
                            this.cells[ny][nx] === color) {
                            visitedClear.add(nk);
                            queue.push({ x: nx, y: ny });
                        }
                    }
                }
                colorGroups.push({ color, size });
            }

            const connectionBonus = colorGroups.reduce((sum, g) => {
                const idx = Math.min(g.size, connectionBonusTable.length - 1);
                return sum + connectionBonusTable[idx];
            }, 0);

            const colorSet = new Set(colorGroups.map(g => g.color));
            const colorCountBonusTable = [0, 0, 3, 6, 12, 24];
            const colorBonus = colorCountBonusTable[
                Math.min(colorSet.size, colorCountBonusTable.length - 1)
            ];

            const chainPower = CHAIN_ATTACK_POWERS[
                Math.min(this.chain, CHAIN_ATTACK_POWERS.length - 1)
            ];

            const totalBonus = Math.max(1, chainPower + connectionBonus + colorBonus);
            const points = count * 10 * totalBonus;
            this.score += points;

            this.attackRemainder += points;
            const attack = Math.floor(this.attackRemainder / GARBAGE_TARGET_POINTS);
            this.attackRemainder %= GARBAGE_TARGET_POINTS;
            if (attack > 0 && this.onAttack) {
                this.onAttack(attack);
            }

            [...this.clearingCells, ...this.garbageClearingCells].forEach(cell => {
                this.cells[cell.y][cell.x] = EMPTY;
            });
            this.applyGravity();
            this.clearingCells = [];
            this.garbageClearingCells = [];
            this.phase = "checking";
            this.phaseTimer = 8;
        }

        findColorGroups(board = this.cells, includeHiddenRow = true) {
            // y=0は画面外の13段目。消去・連鎖構築の判定では、画面内のy=1〜12だけで
            // 連結グループを作る。画面外セルを経由して画面内のグループ同士が
            // つながったように扱わないことも重要。
            const firstRow = includeHiddenRow ? 0 : 1;
            const visited = Array.from({ length: BOARD_HEIGHT }, () => {
                return Array(BOARD_WIDTH).fill(false);
            });
            const groups = [];
            const directions = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 }
            ];

            for (let y = firstRow; y < BOARD_HEIGHT; y++) {
                for (let x = 0; x < BOARD_WIDTH; x++) {
                    if (visited[y][x] || board[y][x] < 0) {
                        continue;
                    }
                    const color = board[y][x];
                    const group = [];
                    const queue = [{ x: x, y: y }];
                    visited[y][x] = true;
                    while (queue.length > 0) {
                        const current = queue.shift();
                        group.push(current);
                        directions.forEach(direction => {
                            const nx = current.x + direction.x;
                            const ny = current.y + direction.y;
                            if (nx < 0 || nx >= BOARD_WIDTH ||
                                ny < firstRow || ny >= BOARD_HEIGHT ||
                                visited[ny][nx] ||
                                board[ny][nx] !== color) {
                                return;
                            }
                            visited[ny][nx] = true;
                            queue.push({ x: nx, y: ny });
                        });
                    }
                    groups.push(group);
                }
            }
            return groups;
        }

        findMatches(board = this.cells) {
            const matches = [];
            // 13段目（y=0）のぷよは、画面内のぷよとつながっていても消去数に含めない。
            // 消去による重力でy=1〜12へ落ちた後、次の連鎖判定から参加する。
            this.findColorGroups(board, false).forEach(group => {
                if (group.length >= 4) {
                    matches.push(...group);
                }
            });
            return matches;
        }

        findAdjacentGarbage(matches, board = this.cells) {
            const adjacentGarbage = [];
            const seen = new Set();
            const directions = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 }
            ];
            matches.forEach(cell => {
                directions.forEach(direction => {
                    const x = cell.x + direction.x;
                    const y = cell.y + direction.y;
                    if (x < 0 || x >= BOARD_WIDTH ||
                        y < 0 || y >= BOARD_HEIGHT ||
                        board[y][x] !== GARBAGE) {
                        return;
                    }
                    const key = `${x},${y}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        adjacentGarbage.push({ x, y });
                    }
                });
            });
            return adjacentGarbage;
        }

        applyGravity(board = this.cells) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                const colors = [];
                for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
                    if (board[y][x] !== EMPTY) {
                        colors.push(board[y][x]);
                    }
                }
                for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
                    const index = BOARD_HEIGHT - 1 - y;
                    board[y][x] = index < colors.length ? colors[index] : EMPTY;
                }
            }
        }

        activeCells() {
            if (!this.active) {
                return [];
            }
            const cells = this.pairCells(
                this.active.x,
                this.active.y,
                this.active.rotation
            );
            return cells.map((cell, index) => {
                return { x: cell.x, y: cell.y, color: this.active.colors[index] };
            });
        }

        isClearingCell(x, y) {
            return this.clearingCells.some(cell => cell.x === x && cell.y === y) ||
                this.garbageClearingCells.some(cell => cell.x === x && cell.y === y);
        }

        isGarbageDroppingCell(x, y) {
            return this.garbageDropCells.some(cell => cell.x === x && cell.y === y);
        }

        garbageDropProgress() {
            return 1 - this.phaseTimer / GARBAGE_DROP_FRAMES;
        }
    }

    class PuyoCpuModel extends PuyoGameModel {
        getAiConfig() {
            return this._aiConfig || cpuDifficultyConfigs.normal;
        }

        setAiConfig(config) {
            this._aiConfig = config || cpuDifficultyConfigs.normal;
            this.reset();
        }

        reset() {
            super.reset();
            this.aiWait = 0;
            this.aiTarget = null;
            this.aiExpandedNodeCount = 0;
            this.aiWorkerCount = 0;
            this._searchExpandedNodes = 0;
            this._searchProgressReporter = null;
        }

        spawnPair() {
            super.spawnPair();
            this.aiWait = 0;
            this.aiTarget = null;
            this.requestAiPlacement();
        }

        update() {
            if (this.gameOver) {
                return;
            }
            if (this.phase === "falling") {
                if (!this.active) {
                    return;
                }
                if (this._aiThinking) {
                    return;
                }
                if (!this.aiTarget) {
                    this.requestAiPlacement();
                    return;
                }
                const config = this.getAiConfig();
                this.aiWait += 1;
                if (this.aiWait < config.thinkFrames) {
                    return;
                }
                this.fallTimer += 1;
                if (this.fallTimer >= config.fastFallFrames) {
                    this.fallTimer = 0;
                    this.applyAiTarget();
                    this.moveDown();
                }
                return;
            }
            super.update();
        }

        requestAiPlacement() {
            if (!this.active || this.gameOver) {
                this.aiTarget = null;
                this._aiThinking = false;
                this.aiExpandedNodeCount = 0;
                this.aiWorkerCount = 0;
                return;
            }
            this._aiRequestId = (this._aiRequestId || 0) + 1;
            const requestId = this._aiRequestId;
            this._aiThinking = true;
            this.aiTarget = null;
            this._searchExpandedNodes = 0;
            this.aiExpandedNodeCount = 0;
            this.aiWorkerCount = this._aiWorkerPool ? this._aiWorkerPool.workerCount : 0;
            this._searchProgressReporter = count => {
                if (requestId !== this._aiRequestId) return;
                this.aiExpandedNodeCount = Math.max(0, Math.floor(Number(count) || 0));
            };

            // 候補生成を先に済ませ、重い配置評価・先読みをWorkerへ分散する。
            // Workerが利用できない環境では従来の同期CPU評価にフォールバックする。
            setTimeout(() => {
                if (requestId !== this._aiRequestId || !this.active || this.gameOver) {
                    if (requestId === this._aiRequestId) {
                        this._aiThinking = false;
                    }
                    return;
                }

                let candidates;
                try {
                    candidates = this.getPlacementCandidatesCpu();
                    if (candidates.length === 0) {
                        this.aiTarget = null;
                        this._aiThinking = false;
                        return;
                    }
                } catch (error) {
                    console.error("[PuyoGame] CPU候補生成でエラーが発生しました", error);
                    this.aiTarget = null;
                    this._aiThinking = false;
                    return;
                }

                const pool = this._aiWorkerPool ||
                    (this._aiWorkerPool = createPuyoAiWorkerPool(CPU_AI_WORKER_COUNT));
                if (!pool) {
                    // Web Worker非対応・CSP制限・生成失敗時の互換経路。
                    this.aiWorkerCount = 0;
                    this._searchExpandedNodes = 0;
                    this.aiExpandedNodeCount = 0;
                    try {
                        this.aiTarget = this.selectPlacementCandidate(
                            this.evaluatePlacementCandidatesCpu(candidates)
                        );
                    } catch (error) {
                        console.error("[PuyoGame] CPU思考処理でエラーが発生しました", error);
                        this.aiTarget = null;
                    } finally {
                        if (requestId === this._aiRequestId) {
                            this.aiExpandedNodeCount = this._searchExpandedNodes || 0;
                            this._aiThinking = false;
                        }
                    }
                    return;
                }
                this.aiWorkerCount = pool.workerCount;

                const activeSnapshot = {
                    x: this.active.x,
                    y: this.active.y,
                    rotation: this.active.rotation,
                    colors: this.active.colors.slice()
                };
                const snapshot = {
                    board: this.cells.map(row => row.slice()),
                    active: activeSnapshot,
                    nextColors: this.nextColors.slice(),
                    nextNextColors: this.nextNextColors.slice(),
                    nextPairQueue: this.nextPairQueue.map(pair => pair.slice()),
                    config: cloneCpuAiConfig(this.getAiConfig())
                };

                pool.evaluate(candidates, snapshot, requestId, (expandedNodes, workerCount) => {
                    if (requestId !== this._aiRequestId) return;
                    this.aiExpandedNodeCount = Math.max(0, Math.floor(Number(expandedNodes) || 0));
                    this.aiWorkerCount = Math.max(0, Math.floor(Number(workerCount) || 0));
                })
                    .then(evaluatedCandidates => {
                        if (requestId !== this._aiRequestId || !this.active || this.gameOver) {
                            return;
                        }
                        this.aiTarget = this.selectPlacementCandidate(evaluatedCandidates);
                    })
                    .catch(error => {
                        if (requestId !== this._aiRequestId || !this.active || this.gameOver) {
                            return;
                        }
                        console.warn(
                            "[PuyoGame] 並列CPU探索に失敗したため、同期CPU探索へ切り替えます",
                            error
                        );
                        if (this._aiWorkerPool === pool) {
                            this._aiWorkerPool = null;
                        }
                        this.aiWorkerCount = 0;
                        this._searchExpandedNodes = 0;
                        this.aiExpandedNodeCount = 0;
                        try {
                            this.aiTarget = this.selectPlacementCandidate(
                                this.evaluatePlacementCandidatesCpu(candidates)
                            );
                        } catch (fallbackError) {
                            console.error("[PuyoGame] CPUフォールバックにも失敗しました", fallbackError);
                            this.aiTarget = null;
                        } finally {
                            if (requestId === this._aiRequestId) {
                                this.aiExpandedNodeCount = this._searchExpandedNodes || 0;
                            }
                        }
                    })
                    .finally(() => {
                        if (requestId === this._aiRequestId) {
                            this._aiThinking = false;
                        }
                    });
            }, 0);
        }

        getPlacementCandidatesCpu() {
            if (!this.active) {
                return [];
            }
            const candidates = [];
            for (let rotation = 0; rotation < 4; rotation++) {
                for (let x = 0; x < BOARD_WIDTH; x++) {
                    if (!this.canPlacePair(x, this.active.y, rotation)) {
                        continue;
                    }
                    let y = this.active.y;
                    while (this.canPlacePair(x, y + 1, rotation)) {
                        y += 1;
                    }
                    candidates.push({ x, rotation, y });
                }
            }
            return candidates;
        }

        evaluatePlacementCandidatesCpu(candidates) {
            return candidates.map(candidate => {
                const evaluation = this.evaluatePlacement(
                    candidate.x,
                    candidate.y,
                    candidate.rotation
                );
                return {
                    x: candidate.x,
                    rotation: candidate.rotation,
                    y: candidate.y,
                    score: evaluation.score,
                    predictedChainCount: evaluation.chainCount,
                    emergencyClear: evaluation.emergencyClear,
                    gameOver: evaluation.gameOver,
                    prematureClear: evaluation.prematureClear,
                    targetReachableWithoutEarlyClear: evaluation.targetReachableWithoutEarlyClear,
                    ignitionDistance: evaluation.ignitionDistance,
                    ignitionScore: evaluation.ignitionScore,
                    isDeadEnd: evaluation.isDeadEnd,
                    allowBailoutClear: evaluation.allowBailoutClear
                };
            });
        }

        choosePlacementCpu() {
            const candidates = this.getPlacementCandidatesCpu();
            return this.selectPlacementCandidate(
                this.evaluatePlacementCandidatesCpu(candidates)
            );
        }

        selectPlacementCandidate(candidates) {
            const config = this.getAiConfig();
            // 実際の盤面解決後にゲームオーバーとなる候補は終端状態として扱い、
            // ゲームオーバーにならない候補が1つでもあれば選択対象から除外する。
            // さらに、未来のツモで発火できずに詰むデッドエンド候補も可能な限り除外する。
            const nonTerminalCandidates = candidates.filter(candidate => candidate.gameOver !== true);
            const nonDeadEndCandidates = nonTerminalCandidates.filter(candidate => candidate.isDeadEnd !== true);
            const viableCandidates = nonDeadEndCandidates.length > 0
                ? nonDeadEndCandidates
                : (nonTerminalCandidates.length > 0 ? nonTerminalCandidates : candidates);
            const emergencyCandidates = viableCandidates.filter(candidate => candidate.emergencyClear);
            // 緊急時の消去だけは安全上優先する。ただしゲームオーバー候補・デッドエンド候補は先に除外する。
            let selectableCandidates = emergencyCandidates.length > 0
                ? emergencyCandidates
                : viableCandidates;

            // 実際のNEXT列を使い、途中で一度も消さずに目標連鎖へ到達できる
            // ルートが見つかっている場合は、そのルートを壊す早期消去候補を除外する。
            // ただし抱え落ち防止（allowBailoutClear）の手は除外しない。
            if (emergencyCandidates.length === 0) {
                const noEarlyClearRoutes = selectableCandidates.filter(candidate => {
                    return (candidate.targetReachableWithoutEarlyClear && !candidate.prematureClear) ||
                        candidate.allowBailoutClear;
                });
                if (noEarlyClearRoutes.length > 0) {
                    selectableCandidates = noEarlyClearRoutes;
                }
            }

            selectableCandidates.sort((a, b) => b.score - a.score);
            const bestScore = selectableCandidates.length > 0
                ? selectableCandidates[0].score
                : 0;
            if (selectableCandidates.length > 0 &&
                Math.random() * 100 < config.mistakeRate) {
                return selectableCandidates[
                    Math.floor(Math.random() * selectableCandidates.length)
                ];
            }
            const tolerance = config.randomness * 10;
            const finalists = selectableCandidates.filter(candidate => {
                return candidate.score >= bestScore - tolerance;
            });
            return finalists.length > 0
                ? finalists[Math.floor(Math.random() * finalists.length)]
                : null;
        }

        evaluatePlacement(x, y, rotation) {
            const config = this.getAiConfig();
            // 配置直後の盤面と、実際の消去・落下を適用した盤面を分ける。
            // simulateResolutionは渡された盤面を書き換えるため、コピー上で実行する。
            const placedBoard = this.cells.map(row => row.slice());
            const cells = this.pairCells(x, y, rotation);
            cells.forEach((cell, index) => {
                if (cell.y >= 0 && cell.y < BOARD_HEIGHT) {
                    placedBoard[cell.y][cell.x] = this.active.colors[index];
                }
            });
            const simulated = placedBoard.map(row => row.slice());
            const resolution = this.simulateResolution(simulated);

            const heights = [];
            for (let xIndex = 0; xIndex < BOARD_WIDTH; xIndex++) {
                let height = 0;
                for (let yIndex = 0; yIndex < BOARD_HEIGHT; yIndex++) {
                    if (simulated[yIndex][xIndex] !== EMPTY) {
                        height = BOARD_HEIGHT - yIndex;
                        break;
                    }
                }
                heights.push(height);
            }
            // 一般的な高さ減点では、3列目以外の13段目を12段相当として扱う。
            // 13段目固有の危険度は3列目にだけ適用する。
            const maxHeightForPenalty = Math.max(...heights.map((height, index) => {
                return index === 2 ? height : Math.min(height, VISIBLE_HEIGHT);
            }));
            const danger = simulated[1][2] !== EMPTY ? 150 : 0;
            const buildBias = config.chainBuildBias / 100;
            const targetChainCount = this.getEffectiveTargetChainCount(config);
            const clearChainThreshold = this.getEffectiveClearChainThreshold(config);
            const prematureClear = resolution.chainCount > 0 &&
                resolution.chainCount < targetChainCount;

            const isEmergency = this.isEmergency(this.cells) || this.isEmergency(simulated);
            const inDangerZone = this.isDangerZone(this.cells) || this.isDangerZone(simulated);
            const emergencyClear = isEmergency && resolution.totalCleared > 0;
            let emergencyScore = 0;
            if (emergencyClear) {
                const heightReductionBonus = Math.max(0, BOARD_HEIGHT - maxHeightForPenalty) * 500;
                emergencyScore = 25000 +
                    resolution.totalCleared * 800 +
                    resolution.garbageCleared * 1500 +
                    heightReductionBonus;
            }
            const emergencyHeightPenalty = isEmergency ? maxHeightForPenalty * 40 : 0;

            const nextPairsToCheck = Array.isArray(this.nextPairQueue) && this.nextPairQueue.length > 0
                ? this.nextPairQueue.slice(0, CPU_NEXT_PAIR_REFERENCE_COUNT)
                : (this.nextColors ? [this.nextColors, this.nextNextColors].filter(Boolean) : []);
            const hasIgnitionColor = this.hasIgnitionColorInNext(this.cells, nextPairsToCheck, targetChainCount);
            // 抱え落ち防止: NEXTに発火色が存在せず、かつ盤面の高さが危険域（緊急段数以内）に達している場合、
            // prematureClearの減点を解除し、2〜3連鎖以上での妥協発火（掃き出し・リセット）を許可する
            const allowBailoutClear = inDangerZone && !hasIgnitionColor && resolution.chainCount >= 2;

            let chainScore = 0;
            if (resolution.chainCount >= targetChainCount) {
                chainScore = 35000 + resolution.chainCount * 5000 + resolution.totalCleared * 300;
            } else if (allowBailoutClear) {
                // 抱え落ち防止: 妥協発火（掃き出し・リセット）を許可し、盤面掃除ボーナスを与える
                const heightReductionBonus = Math.max(0, BOARD_HEIGHT - maxHeightForPenalty) * 400;
                chainScore = 15000 + resolution.chainCount * 3000 + resolution.totalCleared * 200 + heightReductionBonus;
            } else if (prematureClear && !isEmergency) {
                // 消去開始閾値を満たしていても、目標連鎖に届かない即時消去は原則として避ける。
                // ただし探索で消去なしの目標到達ルートが見つからない場合は候補に残す。
                const shortfall = targetChainCount - resolution.chainCount;
                chainScore = -(22000 + shortfall * 1200) * Math.max(0.75, buildBias);
            } else if (resolution.chainCount >= clearChainThreshold && resolution.chainCount > 0) {
                // 目標連鎖数を達成した消去は上で評価済み。ここは目標未満の緊急消去用。
                chainScore = 6500 + resolution.chainCount * 1600 + resolution.totalCleared * 100;
            }

            let potentialScore = 0;
            if (resolution.chainCount === 0) {
                const trigger = this.findMaxTriggerableChain(simulated);
                potentialScore = Math.pow(trigger.maxChain, 2) * 900 * buildBias +
                    trigger.maxCleared * 40 * buildBias;
            }

            const shapeScore = this.evaluateBoardShape(simulated) * buildBias;
            const colorGroupScore = this.evaluateChainPotential(simulated) * (1 - buildBias * 0.5);

            const futureScore = this.evaluateNextMovePotential(
                simulated,
                this.nextColors,
                config
            );
            const ignition = this.estimateIgnitionDistance(
                simulated,
                this.nextColors,
                config,
                this.nextPairQueue.slice(0, CPU_NEXT_PAIR_REFERENCE_COUNT)
            );

            // デッドエンド（詰み手）への致命的ペナルティ: -50,000点
            const deadEndPenalty = ignition.isDeadEnd ? 50000 : 0;

            const score = chainScore +
                potentialScore +
                shapeScore +
                colorGroupScore +
                futureScore -
                maxHeightForPenalty * 8 -
                danger +
                emergencyScore -
                emergencyHeightPenalty -
                deadEndPenalty +
                Math.random() * config.randomness * 2;

            const ignitionDistanceBonus = Number.isFinite(ignition.distance)
                ? Math.max(0, this.getEffectiveLookaheadDepth(config) - ignition.distance + 1) * 4500 * buildBias
                : 0;
            const targetReachableWithoutEarlyClear = !resolution.gameOver && (
                resolution.chainCount >= targetChainCount ||
                (resolution.chainCount === 0 && ignition.targetReachableWithoutEarlyClear === true)
            );

            return {
                score: score + ignitionDistanceBonus + ignition.score * buildBias,
                chainCount: resolution.chainCount,
                emergencyClear,
                gameOver: resolution.gameOver,
                prematureClear,
                targetReachableWithoutEarlyClear,
                ignitionDistance: ignition.distance,
                ignitionScore: ignition.score,
                isDeadEnd: ignition.isDeadEnd || false,
                allowBailoutClear
            };
        }

        estimateIgnitionDistance(board, pairColors, config, knownPairs = null) {
            const target = this.getEffectiveTargetChainCount(config);
            const maxDepth = this.getEffectiveLookaheadDepth(config);
            // knownPairsは、この探索状態から先に置く実際のNEXT列。既知の範囲は順番どおり固定する。
            const knownPairSequence = Array.isArray(knownPairs)
                ? knownPairs
                : (pairColors && pairColors.length >= 2 ? [pairColors] : []);

            const beamWidth = CPU_SEARCH_BEAM_WIDTH;
            const nodeBudget = CPU_SEARCH_NODE_BUDGET;
            // NEXT列が先読み深度を満たす場合は1ツモあたり最大24配置、
            // 既知のNEXTを使い切った後は推定ペアを2候補に絞る。
            // ノード予算を深さ方向にも配分し、最初の数段だけで予算を使い切るのを防ぐ。
            const expectedPairOptions = knownPairSequence.length >= maxDepth ? 1 : 2;
            const depthAwareBeamWidth = Math.max(1, Math.min(
                beamWidth,
                Math.floor(nodeBudget / (maxDepth * BOARD_WIDTH * 4 * expectedPairOptions))
            ));
            let expandedNodes = 0;
            let states = [{
                board: board.map(row => row.slice()),
                score: this.estimateIgnitionReadinessCheap(board, target)
            }];

            // 構築フェーズでは、目標連鎖に届かない消去が発生した枝を継続しない。
            // これにより、消去後の盤面を前提にした「小連鎖で整えてから組む」経路を
            // 消去なしで組み続ける経路より高く評価してしまう問題を防ぐ。
            let isDeadEnd = false;
            for (let depth = 1; depth <= maxDepth; depth++) {
                const generated = [];
                let branchAttempted = false;
                let viableBranchFound = false;

                for (const state of states) {
                    const fixedPair = knownPairSequence[depth - 1];
                    const pairOptions = fixedPair && fixedPair.length >= 2
                        ? [fixedPair]
                        : this.getPromisingPairColorCombinations(state.board, 2);

                    for (const colors of pairOptions) {
                        if (expandedNodes >= nodeBudget) break;
                        for (let rotation = 0; rotation < 4; rotation++) {
                            if (expandedNodes >= nodeBudget) break;
                            for (let x = 0; x < BOARD_WIDTH; x++) {
                                if (expandedNodes >= nodeBudget) break;
                                branchAttempted = true;
                                const drop = this.findDropYOnBoard(state.board, x, rotation);
                                if (drop === null) continue;

                                const projected = this.placePairOnBoard(
                                    state.board, colors, x, drop, rotation
                                );
                                if (!projected) continue;
                                expandedNodes++;
                                this._searchExpandedNodes = (this._searchExpandedNodes || 0) + 1;
                                if (this._searchProgressReporter &&
                                    this._searchExpandedNodes % 128 === 0) {
                                    this._searchProgressReporter(this._searchExpandedNodes);
                                }

                                // シミュレーション用コピーで実際の連鎖数を測り、探索元盤面を保持する。
                                const resolved = projected.map(row => row.slice());
                                const resolution = this.simulateResolution(resolved, maxDepth);
                                // ゲームオーバーになる未来盤面は連鎖構築ルートとして継続しない。
                                if (resolution.gameOver) continue;

                                // ゲームオーバーにならず配置できた有効な枝が存在する
                                viableBranchFound = true;

                                if (resolution.chainCount >= target) {
                                    return {
                                        distance: depth,
                                        score: 100 - depth * 10,
                                        targetReachableWithoutEarlyClear: true,
                                        isDeadEnd: false
                                    };
                                }

                                // 目標未達の消去が起きる配置は、消去なし構築ルートから除外する。
                                if (resolution.chainCount > 0) continue;

                                const readiness = this.estimateIgnitionReadinessCheap(
                                    projected, target
                                );
                                const localScore = readiness +
                                    this.evaluateChainPotential(projected) * 0.12 +
                                    this.evaluateBoardShape(projected) * 0.015;
                                generated.push({
                                    board: projected,
                                    score: localScore,
                                    colors,
                                    x,
                                    rotation,
                                    depth
                                });
                            }
                        }
                    }
                    if (expandedNodes >= nodeBudget) break;
                }

                // 探索深さの途中で、生き残る盤面が1つもなくなった（全枝がゲームオーバーまたは配置不能）場合
                if (!viableBranchFound && branchAttempted && expandedNodes < nodeBudget) {
                    isDeadEnd = true;
                    break;
                }

                if (generated.length === 0) break;
                generated.sort((a, b) => b.score - a.score);
                states = generated.slice(0, depthAwareBeamWidth);
                if (expandedNodes >= nodeBudget) break;
            }

            const bestReadiness = states.reduce((best, state) => {
                return Math.max(best, this.estimateIgnitionReadinessCheap(state.board, target));
            }, 0);

            return {
                distance: maxDepth + 1,
                score: isDeadEnd ? 0 : Math.min(60, Math.max(0, bestReadiness)),
                targetReachableWithoutEarlyClear: false,
                isDeadEnd: isDeadEnd
            };
        }

        estimateIgnitionReadinessCheap(board, target) {
            const groups = this.findColorGroups(board, false);
            let maxGroup = 0;
            let nearGroups = 0;
            let totalPotential = 0;

            for (const group of groups) {
                if (group.length > maxGroup) {
                    maxGroup = group.length;
                }
                if (group.length === 3) {
                    nearGroups++;
                    totalPotential += 70;
                } else if (group.length === 2) {
                    nearGroups++;
                    totalPotential += 35;
                } else if (group.length >= 4) {
                    totalPotential += 100;
                }
            }

            const targetProgress = Math.min(1, maxGroup / 4);
            const groupProgress = Math.min(1, totalPotential / Math.max(100, target * 100));
            const thresholdBonus = maxGroup >= 3 ? 35 : maxGroup >= 2 ? 15 : 0;
            return target <= 1
                ? thresholdBonus + groupProgress * 50
                : targetProgress * 60 + groupProgress * 25 + thresholdBonus;
        }

        getPromisingPairColorCombinations(board, limit = 6) {
            const colorScores = Array(COLORS).fill(0);
            const groups = this.findColorGroups(board, false);
            for (const group of groups) {
                if (group.length >= 2 && group.length <= 3) {
                    colorScores[board[group[0].y][group[0].x]] += group.length * 10;
                } else if (group.length >= 4) {
                    colorScores[board[group[0].y][group[0].x]] += 4;
                }
            }

            const colors = Array.from({ length: COLORS }, (_, color) => color)
                .sort((a, b) => colorScores[b] - colorScores[a]);
            const sameColorPairs = colors.map(color => [color, color]);
            const orderedMixedPairs = [];
            for (let i = 0; i < colors.length; i++) {
                for (let j = i + 1; j < colors.length; j++) {
                    // 順序も保持する。横置き・縦置きでは色の順序によって
                    // 接続先が変わるため、[A,B]と[B,A]は別候補として扱う。
                    orderedMixedPairs.push([colors[i], colors[j]]);
                    orderedMixedPairs.push([colors[j], colors[i]]);
                }
            }

            // NEXT枯渇後の仮想ツモは、同色ペアだけに偏らないようにする。
            // limit=2では「有望な同色ペア1組＋有望な異色ペア1組」を必ず返す。
            // 追加枠は逆順の異色ペアや別の同色ペアへ配分し、色の多様性を保つ。
            const pairs = [];
            if (sameColorPairs.length > 0) pairs.push(sameColorPairs[0]);
            if (orderedMixedPairs.length > 0 && pairs.length < limit) {
                pairs.push(orderedMixedPairs[0]);
            }
            if (orderedMixedPairs.length > 1 && pairs.length < limit) {
                pairs.push(orderedMixedPairs[1]);
            }
            if (sameColorPairs.length > 1 && pairs.length < limit) {
                pairs.push(sameColorPairs[1]);
            }

            let mixedIndex = 2;
            let sameIndex = 2;
            while (pairs.length < limit &&
                (mixedIndex < orderedMixedPairs.length || sameIndex < sameColorPairs.length)) {
                if (mixedIndex < orderedMixedPairs.length && pairs.length < limit) {
                    pairs.push(orderedMixedPairs[mixedIndex++]);
                }
                if (sameIndex < sameColorPairs.length && pairs.length < limit) {
                    pairs.push(sameColorPairs[sameIndex++]);
                }
            }
            return pairs.slice(0, Math.max(0, limit));
        }

        getAllPairColorCombinations() {
            const pairs = [];
            for (let first = 0; first < COLORS; first++) {
                for (let second = 0; second < COLORS; second++) {
                    pairs.push([first, second]);
                }
            }
            return pairs;
        }

        estimateIgnitionReadiness(board, target) {
            const trigger = this.findMaxTriggerableChain(board);
            if (trigger.maxChain >= target) {
                return 100;
            }
            if (target <= 1) {
                return trigger.maxChain > 0 ? 80 : 0;
            }
            const chainProgress = trigger.maxChain / target;
            const clearedProgress = Math.min(1, trigger.maxCleared / (target * 4));
            return chainProgress * 70 + clearedProgress * 30;
        }

        evaluateNextMovePotential(board, pairColors, config) {
            if (!pairColors || pairColors.length < 2 || config.lookaheadDepth < 2) {
                return 0;
            }

            const target = this.getEffectiveTargetChainCount(config);
            const candidates = [];

            for (let rotation = 0; rotation < 4; rotation++) {
                for (let x = 0; x < BOARD_WIDTH; x++) {
                    const drop = this.findDropYOnBoard(board, x, rotation);
                    if (drop === null) {
                        continue;
                    }
                    const projected = this.placePairOnBoard(
                        board, pairColors, x, drop, rotation
                    );
                    if (!projected) {
                        continue;
                    }
                    const cheap = this.estimateIgnitionReadinessCheap(projected, target);
                    candidates.push({
                        board: projected,
                        score: cheap + this.evaluateBoardShape(projected) * 0.015
                    });
                }
            }

            if (candidates.length === 0) {
                return -3000;
            }

            candidates.sort((a, b) => b.score - a.score);
            const topCandidates = candidates.slice(0, 3);
            const detailedScores = topCandidates.map(candidate => {
                const resolution = this.simulateResolution(
                    candidate.board,
                    this.getEffectiveLookaheadDepth(config)
                );

                if (resolution.gameOver) {
                    return -30000;
                }
                if (resolution.chainCount >= target) {
                    return 24000 + resolution.chainCount * 5000 +
                        resolution.totalCleared * 180;
                }

                if (resolution.chainCount > 0) {
                    // 次の一手で目標未満の連鎖を起こす未来候補は、構築計画として大きく減点。
                    const shortfall = target - resolution.chainCount;
                    return -(14000 + Math.max(0, shortfall) * 900) *
                        Math.max(0.75, config.chainBuildBias / 100);
                }

                const remainingKnownPairs = Array.isArray(this.nextPairQueue)
                    ? this.nextPairQueue.slice(1, CPU_NEXT_PAIR_REFERENCE_COUNT)
                    : null;
                const ignition = this.estimateIgnitionDistance(
                    candidate.board,
                    this.nextNextColors,
                    config,
                    remainingKnownPairs
                );
                const distanceBonus = Number.isFinite(ignition.distance)
                    ? Math.max(0, this.getEffectiveLookaheadDepth(config) - ignition.distance + 1) * 1200
                    : 0;
                return Math.pow(
                    this.findMaxTriggerableChain(candidate.board).maxChain,
                    2
                ) * 420 + distanceBonus;
            });

            detailedScores.sort((a, b) => b - a);
            const top = detailedScores.slice(0, 2);
            const average = top.reduce((sum, value) => sum + value, 0) / top.length;
            const weight = config.chainBuildBias / 100;
            return (detailedScores[0] * 0.65 + average * 0.35) * weight;
        }

        findDropYOnBoard(board, x, rotation) {
            // 実際の出現位置（下側が12段目、上側が盤面外）と同じy=1から探索する。
            // そこが塞がっている場合はspawnPair()と同様にy=0を試す。
            let spawnY = 1;
            if (!this.canPlacePairOnBoard(board, x, spawnY, rotation)) {
                spawnY = 0;
                if (!this.canPlacePairOnBoard(board, x, spawnY, rotation)) {
                    return null;
                }
            }

            let y = spawnY;
            while (this.canPlacePairOnBoard(board, x, y + 1, rotation)) {
                y += 1;
            }
            if (!this.canPlacePairOnBoard(board, x, y, rotation)) {
                return null;
            }
            return y;
        }

        canPlacePairOnBoard(board, x, y, rotation) {
            return this.pairCells(x, y, rotation).every(cell => {
                return cell.x >= 0 && cell.x < BOARD_WIDTH &&
                    cell.y >= ACTIVE_MIN_Y && cell.y < BOARD_HEIGHT &&
                    (cell.y < 0 || board[cell.y][cell.x] === EMPTY);
            });
        }

        placePairOnBoard(board, colors, x, y, rotation) {
            if (!this.canPlacePairOnBoard(board, x, y, rotation)) {
                return null;
            }
            const projected = board.map(row => row.slice());
            this.pairCells(x, y, rotation).forEach((cell, index) => {
                if (cell.y >= 0 && cell.y < BOARD_HEIGHT) {
                    projected[cell.y][cell.x] = colors[index];
                }
            });
            this.applyGravity(projected);
            return projected;
        }

        findMaxTriggerableChain(board) {
            let maxChain = 0;
            let maxCleared = 0;
            let bestColor = -1;
            let bestX = -1;
            const depthLimit = this.getEffectiveLookaheadDepth(this.getAiConfig());

            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (board[0][x] !== EMPTY) {
                    continue;
                }
                let topY = 0;
                while (topY + 1 < BOARD_HEIGHT && board[topY + 1][x] === EMPTY) {
                    topY++;
                }

                for (let color = 0; color < COLORS; color++) {
                    const testBoard = board.map(row => row.slice());
                    testBoard[topY][x] = color;
                    const res = this.simulateResolution(testBoard, depthLimit);
                    // ゲームオーバーになる仮想発火は、成立可能な連鎖として評価しない。
                    if (res.gameOver) continue;
                    if (res.chainCount > maxChain ||
                        (res.chainCount === maxChain && res.totalCleared > maxCleared)) {
                        maxChain = res.chainCount;
                        maxCleared = res.totalCleared;
                        bestColor = color;
                        bestX = x;
                    }
                }
            }

            return { maxChain, maxCleared, bestColor, bestX };
        }

        evaluateBoardShape(board) {
            let score = 0;
            const heights = [];
            let activeColumns = 0;

            for (let x = 0; x < BOARD_WIDTH; x++) {
                let height = 0;
                for (let y = 0; y < BOARD_HEIGHT; y++) {
                    if (board[y][x] !== EMPTY) {
                        height = BOARD_HEIGHT - y;
                        break;
                    }
                }
                // 3列目（x=2）以外は13段目を配置しても、高さ評価では12段相当として扱う。
                // 3列目だけはゲームオーバーリスクがあるため、13段目超過を減点する。
                const scoringHeight = x === 2 ? height : Math.min(height, VISIBLE_HEIGHT);
                heights.push(scoringHeight);
                if (height > 0) {
                    activeColumns++;
                }

                if (x === 2 && height > VISIBLE_HEIGHT) {
                    score -= (height - VISIBLE_HEIGHT) * 200;
                }

                let currentRunColor = EMPTY;
                let currentRunLen = 0;
                // 縦方向の色まとまり評価にも画面外の13段目を混ぜない。
                // 13段目の色は、消去で画面内へ落ちてから初めて評価に参加する。
                for (let y = BOARD_HEIGHT - 1; y >= Math.max(1, BOARD_HEIGHT - height); y--) {
                    const c = board[y][x];
                    if (c === currentRunColor) {
                        currentRunLen++;
                    } else {
                        if (currentRunColor !== GARBAGE && currentRunColor !== EMPTY) {
                            if (currentRunLen === 2) score += 160;
                            if (currentRunLen === 3) score += 380;
                            if (currentRunLen >= 4) score -= 600;
                        }
                        currentRunColor = c;
                        currentRunLen = 1;
                    }
                }
                if (currentRunColor !== GARBAGE && currentRunColor !== EMPTY) {
                    if (currentRunLen === 2) score += 160;
                    if (currentRunLen === 3) score += 380;
                    if (currentRunLen >= 4) score -= 600;
                }
            }

            score += activeColumns * 120;

            const centerHeight = heights[2];
            const avgOtherHeight = (heights[0] + heights[1] + heights[3] + heights[4] + heights[5]) / 5;
            if (centerHeight <= avgOtherHeight) {
                score += (avgOtherHeight - centerHeight) * 90;
            } else {
                score -= (centerHeight - avgOtherHeight) * 180;
            }

            for (let x = 0; x < BOARD_WIDTH - 1; x++) {
                const diff = Math.abs(heights[x] - heights[x + 1]);
                if (diff === 0) {
                    score += 40;
                } else if (diff === 1) {
                    score += 80;
                } else {
                    score -= (diff - 1) * 70;
                }
            }

            return score;
        }

        getEffectiveLookaheadDepth(config = this.getAiConfig()) {
            return Math.max(1, Math.min(10, Number(config && config.lookaheadDepth) || 1));
        }

        getEffectiveTargetChainCount(config = this.getAiConfig()) {
            const configured = Math.max(1, Number(config && config.targetChainCount) || 1);
            return Math.max(1, Math.min(10, configured));
        }

        getEffectiveClearChainThreshold(config = this.getAiConfig()) {
            // 消去開始の閾値は目標連鎖数・探索深度と独立して設定できる。
            const configured = Math.max(1, Number(config && config.clearChainThreshold) || 1);
            return Math.max(1, Math.min(10, configured));
        }

        isSimulatedGameOver(board) {
            // 実ゲームの終端条件を再現する。
            // 1) 連鎖解決後も3列目の所定位置(cells[1][2])が埋まっている。
            if (board[1][2] !== EMPTY) {
                return true;
            }
            // 2) 次のペアを通常位置(y=1)にも救済位置(y=0)にも出現させられない。
            return !this.canPlacePairOnBoard(board, 2, 1, 0) &&
                !this.canPlacePairOnBoard(board, 2, 0, 0);
        }

        isGameOverAfterFullResolution(board) {
            // 評価用シミュレーションの深度上限に達していても、終端判定だけは
            // 残りの連鎖を最後まで解決した盤面で行う。元のboardは変更しない。
            const terminalBoard = board.map(row => row.slice());
            this.applyGravity(terminalBoard);
            // 1回の消去で最低4個減るため、78回あれば必ず安定状態に到達する。
            for (let step = 0; step < BOARD_WIDTH * BOARD_HEIGHT; step++) {
                const matches = this.findMatches(terminalBoard);
                if (matches.length === 0) {
                    return this.isSimulatedGameOver(terminalBoard);
                }
                const adjacentGarbage = this.findAdjacentGarbage(matches, terminalBoard);
                matches.forEach(cell => {
                    terminalBoard[cell.y][cell.x] = EMPTY;
                });
                adjacentGarbage.forEach(cell => {
                    terminalBoard[cell.y][cell.x] = EMPTY;
                });
                this.applyGravity(terminalBoard);
            }
            return this.isSimulatedGameOver(terminalBoard);
        }

        simulateResolution(board, maxDepth = this.getEffectiveLookaheadDepth()) {
            maxDepth = Math.max(1, Math.min(this.getEffectiveLookaheadDepth(), Number(maxDepth) || 1));
            // 実ゲームのresolveBoard()と同様、判定前に重力を適用する。
            // これで13段目のぷよも、実際に画面内へ落ちた後でのみ消去判定に参加する。
            this.applyGravity(board);
            let chainCount = 0;
            let totalCleared = 0;
            let garbageCleared = 0;
            let firstCleared = 0;
            let resolutionStable = false;
            for (let depth = 0; depth < maxDepth; depth++) {
                const matches = this.findMatches(board);
                if (matches.length === 0) {
                    resolutionStable = true;
                    break;
                }
                const adjacentGarbage = this.findAdjacentGarbage(matches, board);
                matches.forEach(cell => {
                    board[cell.y][cell.x] = EMPTY;
                });
                adjacentGarbage.forEach(cell => {
                    board[cell.y][cell.x] = EMPTY;
                });
                garbageCleared += adjacentGarbage.length;
                if (chainCount === 0) {
                    firstCleared = matches.length;
                }
                chainCount += 1;
                totalCleared += matches.length;
                this.applyGravity(board);
            }
            // ゲームオーバーは全連鎖が落ち着いた後に決まる。
            // maxDepthで評価用の連鎖数を打ち切った場合は、終端判定だけ別コピーで最後まで解決する。
            const gameOver = resolutionStable
                ? this.isSimulatedGameOver(board)
                : this.isGameOverAfterFullResolution(board);
            return { chainCount, totalCleared, garbageCleared, firstCleared, gameOver };
        }

        isEmergency(board = this.cells) {
            const emergencyRows = this.getAiConfig().emergencyRows ||
                this.getAiConfig().garbageEmergencyRows || 3;
            // 緊急判定の対象は3列目のみ（x=2、0始まり）とする。
            // 他の列の高積みは緊急扱いにせず、内部13段盤面での連鎖構築を許容する。
            for (let y = 1; y < Math.min(BOARD_HEIGHT, emergencyRows + 1); y++) {
                if (board[y][2] !== EMPTY) {
                    return true;
                }
            }
            return false;
        }

        isGarbageEmergency(board = this.cells) {
            return this.isEmergency(board);
        }

        isDangerZone(board = this.cells) {
            const emergencyRows = this.getAiConfig().emergencyRows ||
                this.getAiConfig().garbageEmergencyRows || 3;
            // 盤面上部から emergencyRows 段以内（y = 1 〜 emergencyRows）にぷよが存在するか
            for (let x = 0; x < BOARD_WIDTH; x++) {
                for (let y = 1; y <= emergencyRows; y++) {
                    if (board[y][x] !== EMPTY) {
                        return true;
                    }
                }
            }
            return false;
        }

        getTriggerColors(board, minChain = 1) {
            const triggerColors = new Set();
            const depthLimit = this.getEffectiveLookaheadDepth(this.getAiConfig());
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (board[0][x] !== EMPTY) {
                    continue;
                }
                let topY = 0;
                while (topY + 1 < BOARD_HEIGHT && board[topY + 1][x] === EMPTY) {
                    topY++;
                }
                for (let color = 0; color < COLORS; color++) {
                    const testBoard = board.map(row => row.slice());
                    testBoard[topY][x] = color;
                    const res = this.simulateResolution(testBoard, depthLimit);
                    if (!res.gameOver && res.chainCount >= minChain) {
                        triggerColors.add(color);
                    }
                }
            }
            return triggerColors;
        }

        hasIgnitionColorInNext(board, nextPairs, targetChain = 1) {
            let triggerColors = this.getTriggerColors(board, targetChain);
            if (triggerColors.size === 0 && targetChain > 2) {
                // 目標連鎖に届く色がない場合、2連鎖以上を起こせる発火色を探す
                triggerColors = this.getTriggerColors(board, 2);
            }
            if (triggerColors.size === 0) {
                return false;
            }
            if (!Array.isArray(nextPairs) || nextPairs.length === 0) {
                return false;
            }
            for (const pair of nextPairs) {
                if (Array.isArray(pair)) {
                    for (const color of pair) {
                        if (triggerColors.has(color)) {
                            return true;
                        }
                    }
                } else if (typeof pair === "number") {
                    if (triggerColors.has(pair)) {
                        return true;
                    }
                }
            }
            return false;
        }

        evaluateChainPotential(board) {
            return this.findColorGroups(board, false).reduce((score, group) => {
                if (group.length === 3) {
                    return score + 180;
                }
                if (group.length === 2) {
                    return score + 45;
                }
                return score;
            }, 0);
        }

        disposeAiWorkers() {
            this._aiRequestId = (this._aiRequestId || 0) + 1;
            this._aiThinking = false;
            if (this._aiWorkerPool) {
                this._aiWorkerPool.terminate();
                this._aiWorkerPool = null;
            }
        }

        applyAiTarget() {
            if (!this.active || !this.aiTarget) {
                return;
            }
            if (this.canPlacePair(
                this.aiTarget.x,
                this.active.y,
                this.aiTarget.rotation
            )) {
                this.active.x = this.aiTarget.x;
                this.active.rotation = this.aiTarget.rotation;
            }
        }
    }

    // Workerへ渡す設定を、アクセサや関数を含まない構造化複製可能なオブジェクトにする。
    function cloneCpuAiConfig(config) {
        const source = config || cpuDifficultyConfigs.normal;
        const emergencyRows = Number(source.emergencyRows || source.garbageEmergencyRows || 3);
        return {
            thinkFrames: Number(source.thinkFrames || 0),
            fastFallFrames: Number(source.fastFallFrames || 1),
            randomness: Number(source.randomness || 0),
            mistakeRate: Number(source.mistakeRate || 0),
            lookaheadDepth: Number(source.lookaheadDepth || 1),
            chainBuildBias: Number(source.chainBuildBias || 0),
            targetChainCount: Number(source.targetChainCount || 1),
            clearChainThreshold: Number(source.clearChainThreshold || 1),
            emergencyRows,
            garbageEmergencyRows: emergencyRows
        };
    }

    function createPuyoAiWorkerSource() {
        // Worker側でも現行クラスの同じ評価メソッドを使用する。
        // ゲーム画面やモデルの実体は共有せず、スナップショットだけを渡す。
        return `
"use strict";
const BOARD_WIDTH = ${BOARD_WIDTH};
const VISIBLE_HEIGHT = ${VISIBLE_HEIGHT};
const BOARD_HEIGHT = ${BOARD_HEIGHT};
const ACTIVE_MIN_Y = ${ACTIVE_MIN_Y};
const COLORS = ${COLORS};
const EMPTY = ${EMPTY};
const GARBAGE = ${GARBAGE};
const GARBAGE_TARGET_POINTS = ${GARBAGE_TARGET_POINTS};
const CHAIN_ATTACK_POWERS = ${JSON.stringify(CHAIN_ATTACK_POWERS)};
const GARBAGE_DROP_FRAMES = ${GARBAGE_DROP_FRAMES};
const CPU_SEARCH_BEAM_WIDTH = ${CPU_SEARCH_BEAM_WIDTH};
const CPU_SEARCH_NODE_BUDGET = ${CPU_SEARCH_NODE_BUDGET};
const CPU_NEXT_PAIR_REFERENCE_COUNT = ${CPU_NEXT_PAIR_REFERENCE_COUNT};
const cpuDifficultyConfigs = { normal: { thinkFrames: 36, fastFallFrames: 10, randomness: 35, mistakeRate: 20, lookaheadDepth: 3, chainBuildBias: 40, targetChainCount: 3, clearChainThreshold: 1, emergencyRows: 3, garbageEmergencyRows: 3 } };
const PuyoGameModel = (${PuyoGameModel.toString()});
const PuyoCpuModel = (${PuyoCpuModel.toString()});
self.onmessage = function(event) {
    const data = event.data;
    if (!data || data.type !== "evaluate-candidates") return;
    try {
        const model = Object.create(PuyoCpuModel.prototype);
        model.cells = data.snapshot.board.map(row => row.slice());
        model.active = {
            x: data.snapshot.active.x,
            y: data.snapshot.active.y,
            rotation: data.snapshot.active.rotation,
            colors: data.snapshot.active.colors.slice()
        };
        model.nextColors = data.snapshot.nextColors.slice();
        model.nextNextColors = data.snapshot.nextNextColors.slice();
        model.nextPairQueue = Array.isArray(data.snapshot.nextPairQueue)
            ? data.snapshot.nextPairQueue.map(pair => pair.slice())
            : [model.nextColors.slice(), model.nextNextColors.slice()];
        model._aiConfig = data.snapshot.config;
        model._searchExpandedNodes = 0;
        model._searchProgressReporter = function(expandedNodes) {
            self.postMessage({
                type: "search-progress",
                requestId: data.requestId,
                workerIndex: data.workerIndex,
                expandedNodes: expandedNodes
            });
        };
        const results = data.candidates.map(function(candidate) {
            const evaluation = model.evaluatePlacement(
                candidate.x, candidate.y, candidate.rotation
            );
            return {
                candidateIndex: candidate.candidateIndex,
                x: candidate.x,
                y: candidate.y,
                rotation: candidate.rotation,
                score: evaluation.score,
                predictedChainCount: evaluation.chainCount,
                emergencyClear: evaluation.emergencyClear,
                gameOver: evaluation.gameOver,
                prematureClear: evaluation.prematureClear,
                targetReachableWithoutEarlyClear: evaluation.targetReachableWithoutEarlyClear,
                ignitionDistance: evaluation.ignitionDistance,
                ignitionScore: evaluation.ignitionScore,
                isDeadEnd: evaluation.isDeadEnd,
                allowBailoutClear: evaluation.allowBailoutClear
            };
        });
        self.postMessage({
            type: "evaluate-results",
            requestId: data.requestId,
            workerIndex: data.workerIndex,
            expandedNodes: model._searchExpandedNodes || 0,
            results: results
        });
    } catch (error) {
        self.postMessage({
            requestId: data.requestId,
            error: String(error && error.stack || error || "Unknown Worker error")
        });
    }
};
`;
    }

    function createPuyoAiWorkerPool(workerCount) {
        if (cpuAiWorkersPermanentlyDisabled) {
            return null;
        }
        if (typeof Worker === "undefined" || typeof Blob === "undefined" ||
            typeof URL === "undefined" || typeof URL.createObjectURL !== "function") {
            cpuAiWorkersPermanentlyDisabled = true;
            if (!cpuAiWorkerWarningShown) {
                console.warn("[PuyoGame] Web Workerを利用できないため、同期CPU探索を使用します");
                cpuAiWorkerWarningShown = true;
            }
            return null;
        }

        const workers = [];
        const pending = new Map();
        let workerUrl = null;
        let stopped = false;

        function stopPool(error, permanentlyDisable) {
            if (stopped) {
                return;
            }
            stopped = true;
            if (permanentlyDisable) {
                cpuAiWorkersPermanentlyDisabled = true;
            }
            workers.forEach(worker => {
                worker.onmessage = null;
                worker.onerror = null;
                try { worker.terminate(); } catch (_) { /* ignore cleanup errors */ }
            });
            if (workerUrl) {
                try { URL.revokeObjectURL(workerUrl); } catch (_) { /* ignore cleanup errors */ }
                workerUrl = null;
            }
            const jobs = Array.from(pending.values());
            pending.clear();
            jobs.forEach(job => job.reject(error || new Error("CPU Worker pool stopped")));
        }

        try {
            const blob = new Blob([createPuyoAiWorkerSource()], {
                type: "text/javascript"
            });
            workerUrl = URL.createObjectURL(blob);
            for (let index = 0; index < workerCount; index++) {
                const worker = new Worker(workerUrl);
                worker.onmessage = event => {
                    const data = event.data || {};
                    const job = pending.get(data.requestId);
                    if (!job) {
                        return;
                    }
                    if (data.error) {
                        stopPool(new Error(data.error), true);
                        return;
                    }
                    if (data.type === "search-progress") {
                        const workerIndex = Number(data.workerIndex);
                        if (Number.isInteger(workerIndex) && workerIndex >= 0 &&
                            workerIndex < job.workerNodeCounts.length) {
                            job.workerNodeCounts[workerIndex] = Math.max(
                                job.workerNodeCounts[workerIndex],
                                Math.floor(Number(data.expandedNodes) || 0)
                            );
                        }
                        if (typeof job.onProgress === "function") {
                            job.onProgress(
                                job.workerNodeCounts.reduce((sum, count) => sum + count, 0),
                                workers.length
                            );
                        }
                        return;
                    }
                    const workerIndex = Number(data.workerIndex);
                    if (Number.isInteger(workerIndex) && workerIndex >= 0 &&
                        workerIndex < job.workerNodeCounts.length) {
                        job.workerNodeCounts[workerIndex] = Math.max(
                            job.workerNodeCounts[workerIndex],
                            Math.floor(Number(data.expandedNodes) || 0)
                        );
                    }
                    if (typeof job.onProgress === "function") {
                        job.onProgress(
                            job.workerNodeCounts.reduce((sum, count) => sum + count, 0),
                            workers.length
                        );
                    }
                    job.results.push(...(data.results || []));
                    job.remaining -= 1;
                    if (job.remaining <= 0) {
                        pending.delete(data.requestId);
                        job.results.sort((a, b) => a.candidateIndex - b.candidateIndex);
                        job.resolve(job.results.map(result => ({
                            x: result.x,
                            y: result.y,
                            rotation: result.rotation,
                            score: result.score,
                            predictedChainCount: result.predictedChainCount,
                            emergencyClear: result.emergencyClear,
                            gameOver: result.gameOver,
                            prematureClear: result.prematureClear,
                            targetReachableWithoutEarlyClear: result.targetReachableWithoutEarlyClear,
                            ignitionDistance: result.ignitionDistance,
                            ignitionScore: result.ignitionScore,
                            isDeadEnd: result.isDeadEnd,
                            allowBailoutClear: result.allowBailoutClear
                        })));
                    }
                };
                worker.onerror = event => {
                    if (event && typeof event.preventDefault === "function") {
                        event.preventDefault();
                    }
                    const message = event && event.message
                        ? event.message
                        : "CPU Worker failed to execute";
                    stopPool(new Error(message), true);
                };
                workers.push(worker);
            }
        } catch (error) {
            stopPool(error, true);
            if (!cpuAiWorkerWarningShown) {
                console.warn(
                    "[PuyoGame] CPU Workerの初期化に失敗したため、同期CPU探索を使用します",
                    error
                );
                cpuAiWorkerWarningShown = true;
            }
            return null;
        }

        return {
            workerCount: workers.length,
            evaluate(candidates, snapshot, requestId, onProgress) {
                if (stopped) {
                    return Promise.reject(new Error("CPU Worker pool is stopped"));
                }
                if (!candidates || candidates.length === 0) {
                    return Promise.resolve([]);
                }
                const partitionCount = Math.min(workers.length, candidates.length);
                const partitions = Array.from({ length: partitionCount }, () => []);
                candidates.forEach((candidate, index) => {
                    partitions[index % partitionCount].push({
                        x: candidate.x,
                        y: candidate.y,
                        rotation: candidate.rotation,
                        candidateIndex: index
                    });
                });
                return new Promise((resolve, reject) => {
                    pending.set(requestId, {
                        remaining: partitions.length,
                        results: [],
                        workerNodeCounts: Array(workers.length).fill(0),
                        onProgress,
                        resolve,
                        reject
                    });
                    if (typeof onProgress === "function") {
                        onProgress(0, workers.length);
                    }
                    try {
                        partitions.forEach((partition, index) => {
                            workers[index].postMessage({
                                type: "evaluate-candidates",
                                requestId,
                                workerIndex: index,
                                snapshot,
                                candidates: partition
                            });
                        });
                    } catch (error) {
                        stopPool(error, true);
                    }
                });
            },
            terminate() {
                stopPool(new Error("CPU Worker pool disposed"), false);
            }
        };
    }

    function Window_PuyoStatus() {
        this.initialize(...arguments);
    }

    Window_PuyoStatus.prototype = Object.create(Window_Base.prototype);
    Window_PuyoStatus.prototype.constructor = Window_PuyoStatus;

    Window_PuyoStatus.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._model = null;
        this._compactLayout = false;
        this._cpuDifficultyName = "";
    };

    Window_PuyoStatus.prototype.setModel = function(model) {
        this._model = model;
        this.refresh();
    };

    Window_PuyoStatus.prototype.setCompactLayout = function(compact) {
        this._compactLayout = !!compact;
        this.refresh();
    };

    Window_PuyoStatus.prototype.setCpuDifficulty = function(name) {
        this._cpuDifficultyName = String(name || "");
        this.refresh();
    };

    Window_PuyoStatus.prototype.refresh = function() {
        if (!this._model) {
            return;
        }
        this.contents.clear();
        this.resetFontSettings();
        const labelWidth = this._compactLayout ? 100 : 120;
        const valueX = this._compactLayout ? 100 : 120;
        const valueWidth = Math.max(1, this.contents.width - valueX);
        const statusFontSize = this._compactLayout ? 20 : 28;
        this.contents.fontSize = statusFontSize;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText("完コーぷよ", 0, 0, this.contents.width, "left");
        this.resetTextColor();
        this.drawText("スコア", 0, 48, labelWidth, "left");
        this.drawText(
            String(this._model.score).padStart(7, "0"),
            valueX,
            48,
            valueWidth,
            "right"
        );
        this.drawText("最高連鎖数", 0, 84, labelWidth, "left");
        this.drawText(
            String(this._model.maxChain),
            valueX,
            84,
            valueWidth,
            "right"
        );
        this.resetFontSettings();
        if (this._cpuDifficultyName) {
            this.contents.fontSize = this._compactLayout ? 18 : 24;
            this.changeTextColor("#ffffff");
            this.drawText(
                `CPU強さ: ${this._cpuDifficultyName}`,
                0,
                112,
                this.contents.width,
                28,
                "left"
            );
            this.resetFontSettings();
        }
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(
            "NEXT",
            0,
            this._cpuDifficultyName ? 148 : 140,
            this.contents.width,
            "left"
        );
        this.drawText("← →  左右移動", 0, 270, this.contents.width, "left");
        this.drawText("Z      左回転", 0, 300, this.contents.width, "left");
        this.drawText("X      右回転", 0, 330, this.contents.width, "left");
        this.drawText("↑     即時落下", 0, 360, this.contents.width, "left");
        this.drawText("↓     高速落下", 0, 390, this.contents.width, "left");
        this.drawText("Esc    ゲーム終了", 0, 420, this.contents.width, "left");
        this.resetTextColor();
        if (this._model.gameOver) {
            this.changeTextColor(ColorManager.crisisColor());
            this.drawText("GAME OVER", 0, 182, this.contents.width, "center");
            this.resetTextColor();
            this.drawText("Enter / Space でリスタート", 0, 214, this.contents.width, "center");
        }
    };

    function Window_PuyoDifficulty() {
        this.initialize(...arguments);
    }

    Window_PuyoDifficulty.prototype = Object.create(Window_Command.prototype);
    Window_PuyoDifficulty.prototype.constructor = Window_PuyoDifficulty;

    Window_PuyoDifficulty.prototype.makeCommandList = function() {
        this.addCommand("よわい", "normal");
        this.addCommand("ふつう", "strong");
        this.addCommand("卍ゴッド卍", "god");
    };

    Window_PuyoDifficulty.prototype.itemRect = function(index) {
        const rect = Window_Selectable.prototype.itemRect.call(this, index);
        rect.y += 31;
        return rect;
    };

    Window_PuyoDifficulty.prototype.refresh = function() {
        Window_Command.prototype.refresh.call(this);
        this.changeTextColor(ColorManager.normalColor());
        this.drawText(
            "敵の強さを選択",
            0,
            0,
            this.contents.width,
            32,
            "center"
        );
        this.resetTextColor();
    };

    class Scene_Puyo extends Scene_Base {
        create() {
            super.create();
            Input.clear();
            this.setupKeyMapping();
            this._cellSize = cellSize;
            this._boardWidth = BOARD_WIDTH * this._cellSize;
            this._boardHeight = VISIBLE_HEIGHT * this._cellSize;
            this._boardX = 48;
            this._boardY = Math.max(24, Math.floor((Graphics.boxHeight - this._boardHeight) / 2));
            this._model = new PuyoGameModel();
            this.createBackground();
            this.createBoard();
            this.createPuyoBitmaps();
            this.createPuyoSprites();
            this.createWindowLayer();
            this.createStatusWindow();
            this.createNextSprites();
            this.createChainDisplay();
            this.refreshAll();
        }

        setupKeyMapping() {
            this.installPuyoKeyMapping();
        }

        installPuyoKeyMapping() {
            this._previousPuyoKeyMapper = {
                z: Input.keyMapper[90],
                x: Input.keyMapper[88]
            };
            Input.keyMapper[90] = "puyoRotateLeft";
            Input.keyMapper[88] = "puyoRotateRight";
        }

        restorePuyoKeyMapping() {
            if (!this._previousPuyoKeyMapper) {
                return;
            }
            if (Input._currentState) {
                delete Input._currentState.puyoRotateLeft;
                delete Input._currentState.puyoRotateRight;
            }
            const previous = this._previousPuyoKeyMapper;
            if (previous.z === undefined) {
                delete Input.keyMapper[90];
            } else {
                Input.keyMapper[90] = previous.z;
            }
            if (previous.x === undefined) {
                delete Input.keyMapper[88];
            } else {
                Input.keyMapper[88] = previous.x;
            }
            this._previousPuyoKeyMapper = null;
        }

        terminate() {
            this.restorePuyoKeyMapping();
            super.terminate();
        }

        createBackground() {
            const bitmap = new Bitmap(Graphics.width, Graphics.height);
            bitmap.fillAll("#101622");
            const sprite = new Sprite(bitmap);
            this.addChild(sprite);
        }

        createBoardBitmap() {
            const bitmap = new Bitmap(this._boardWidth, this._boardHeight);
            bitmap.fillAll("#1c2638");
            for (let y = 0; y < VISIBLE_HEIGHT; y++) {
                for (let x = 0; x < BOARD_WIDTH; x++) {
                    const color = "#273349";
                    bitmap.fillRect(
                        x * this._cellSize + 1,
                        y * this._cellSize + 1,
                        this._cellSize - 2,
                        this._cellSize - 2,
                        color
                    );
                }
            }
            bitmap.fontSize = Math.floor(this._cellSize * 0.7);
            bitmap.textColor = "#ff4d5d";
            bitmap.outlineColor = "#421b28";
            bitmap.outlineWidth = 3;
            bitmap.drawText(
                "✕",
                2 * this._cellSize + 1,
                1,
                this._cellSize - 2,
                this._cellSize - 2,
                "center"
            );
            return bitmap;
        }

        createBoard() {
            const bitmap = this.createBoardBitmap();
            this._boardSprite = new Sprite(bitmap);
            this._boardSprite.x = this._boardX;
            this._boardSprite.y = this._boardY;
            this.addChild(this._boardSprite);
        }

        createPuyoBitmaps() {
            this._puyoBitmaps = imageFiles.map((file, index) => {
                return file
                    ? ImageManager.loadBitmap(
                        "img/puyo/",
                        normalizePuyoFileName(file),
                        0,
                        true
                    )
                    : this.createDefaultPuyoBitmap(index);
            });
            this._garbageBitmap = garbagePuyoFile
                ? ImageManager.loadBitmap(
                    "img/puyo/",
                    normalizePuyoFileName(garbagePuyoFile),
                    0,
                    true
                )
                : this.createGarbageBitmap();
            this.createGarbagePreviewBitmaps();
        }

        createGarbagePreviewBitmaps() {
            this._garbagePreviewBitmaps = {};
            for (const unit of GARBAGE_PREVIEW_UNITS) {
                const file = garbagePreviewFiles[unit.value];
                if (file) {
                    const bitmap = ImageManager.loadBitmap(
                        "img/puyo/",
                        normalizePuyoFileName(file),
                        0,
                        true
                    );
                    bitmap.addLoadListener(() => {
                        if (typeof this.refreshBattleHeaders === "function") {
                            this.refreshBattleHeaders();
                        }
                    });
                    this._garbagePreviewBitmaps[unit.value] = bitmap;
                } else {
                    this._garbagePreviewBitmaps[unit.value] = null;
                }
            }
        }

        createDefaultPuyoBitmap(index) {
            const colors = [
                { outer: "#124a9b", inner: "#2c83e4" },
                { outer: "#972634", inner: "#e94d4d" },
                { outer: "#b48112", inner: "#f2cf3d" },
                { outer: "#1b7b3d", inner: "#52c95e" }
            ];
            const bitmap = new Bitmap(this._cellSize, this._cellSize);
            const palette = colors[index];
            bitmap.drawCircle(this._cellSize * 0.5, this._cellSize * 0.54,
                this._cellSize * 0.44, palette.outer);
            bitmap.drawCircle(this._cellSize * 0.5, this._cellSize * 0.5,
                this._cellSize * 0.38, palette.inner);
            bitmap.drawCircle(this._cellSize * 0.34, this._cellSize * 0.29,
                this._cellSize * 0.10, "rgba(255,255,255,0.78)");
            return bitmap;
        }

        createGarbageBitmap() {
            const bitmap = new Bitmap(this._cellSize, this._cellSize);
            bitmap.fillAll("#69737d");
            bitmap.fillRect(
                2,
                2,
                this._cellSize - 4,
                this._cellSize - 4,
                "#aeb8c0"
            );
            bitmap.fillRect(
                5,
                5,
                this._cellSize - 10,
                Math.max(2, Math.floor(this._cellSize * 0.12)),
                "#dce2e5"
            );
            return bitmap;
        }

        createPuyoSprites() {
            this._boardPuyoSprites = [];
            for (let i = 0; i < BOARD_WIDTH * VISIBLE_HEIGHT; i++) {
                const sprite = new Sprite();
                sprite.visible = false;
                this._boardPuyoSprites.push(sprite);
                this.addChild(sprite);
            }
            this._activePuyoSprites = [new Sprite(), new Sprite()];
            this._activePuyoSprites.forEach(sprite => {
                sprite.visible = false;
                this.addChild(sprite);
            });
        }

        createStatusWindow() {
            const panelX = this._boardX + this._boardWidth + 24;
            const panelWidth = Math.max(280, Graphics.boxWidth - panelX - 24);
            const rect = new Rectangle(panelX, this._boardY, panelWidth, this._boardHeight);
            this._statusWindow = new Window_PuyoStatus(rect);
            this._statusWindow.setModel(this._model);
            this.addWindow(this._statusWindow);
        }

        createNextSprites() {
            this._nextPuyoSprites = [
                new Sprite(), new Sprite(), new Sprite(), new Sprite()
            ];
            this._nextPuyoSprites.forEach((sprite, index) => {
                const pairIndex = Math.floor(index / 2);
                const colorIndex = index % 2;
                sprite._puyoBaseX = this._statusWindow.x + 24 +
                    pairIndex * (this._cellSize + 32);
                sprite._puyoBaseY = this._statusWindow.y + 196 +
                    colorIndex * this._cellSize;
                sprite.x = sprite._puyoBaseX;
                sprite.y = sprite._puyoBaseY;
                sprite.visible = false;
                this.addChild(sprite);
            });
        }

        createChainDisplay() {
            const bitmap = new Bitmap(this._boardWidth, 84);
            this._chainDisplaySprite = new Sprite(bitmap);
            this._chainDisplaySprite.x = this._boardX;
            this._chainDisplaySprite.y = this._boardY + Math.floor(this._boardHeight / 2) - 42;
            this._chainDisplaySprite.visible = false;
            this._lastChainDisplayText = "";
            this.addChild(this._chainDisplaySprite);
        }

        update() {
            super.update();
            if (Input.isTriggered("cancel")) {
                SceneManager.pop();
                return;
            }
            if (this._model.gameOver) {
                if (Input.isTriggered("ok")) {
                    this._model.reset();
                    this.refreshAll();
                }
                this.refreshStatusIfNeeded();
                this.refreshPuyoSprites();
                this.refreshChainDisplay();
                return;
            }
            this.handleInput();
            this._model.update();
            this.refreshStatusIfNeeded();
            this.refreshPuyoSprites();
            this.refreshChainDisplay();
        }

        handleInput() {
            if (this._model.phase !== "falling") {
                return;
            }
            if (Input.isRepeated("left")) {
                this._model.moveHorizontal(-1);
            } else if (Input.isRepeated("right")) {
                this._model.moveHorizontal(1);
            }
            if (Input.isTriggered("puyoRotateLeft")) {
                this._model.rotate(-1);
            }
            if (Input.isTriggered("puyoRotateRight")) {
                this._model.rotate(1);
            }
            if (Input.isTriggered("up")) {
                this._model.hardDrop();
            }
            if (Input.isPressed("down")) {
                // 出現後の落下開始待ち中でも、下キー入力があれば待機を解除して手動落下する。
                this._model.spawnFallDelayTimer = spawnFallDelayFrames;
                this._model.fallTimer = Math.max(this._model.fallTimer, fallFrames - 1);
            }
            if (Input.isTriggered("ok")) {
                this._model.hardDrop();
            }
        }

        refreshAll() {
            this.refreshStatusIfNeeded(true);
            this.refreshPuyoSprites();
            this.refreshChainDisplay();
        }

        refreshStatusIfNeeded(force) {
            const state = [
                this._model.score,
                this._model.chain,
                this._model.maxChain,
                this._model.gameOver,
                this._model.nextColors.join(","),
                this._model.nextNextColors.join(","),
                this._model.pendingGarbage
            ].join("/");
            if (force || state !== this._lastStatusState) {
                this._statusWindow.refresh();
                this._lastStatusState = state;
            }
        }

        refreshPuyoSprites() {
            for (let y = 1; y < BOARD_HEIGHT; y++) {
                const screenY = y - 1;
                for (let x = 0; x < BOARD_WIDTH; x++) {
                    const index = screenY * BOARD_WIDTH + x;
                    const sprite = this._boardPuyoSprites[index];
                    const color = this._model.cells[y][x];
                    const blinking = this._model.phase === "clearing" &&
                        this._model.isClearingCell(x, y) &&
                        Math.floor(this._model.phaseTimer / 3) % 2 === 0;
                    this.setPuyoSprite(sprite, color, x, y, !blinking);
                }
            }
            const activeCells = this._model.activeCells();
            this._activePuyoSprites.forEach((sprite, index) => {
                const cell = activeCells[index];
                if (cell) {
                    this.setPuyoSprite(sprite, cell.color, cell.x, cell.y, true);
                } else {
                    sprite.visible = false;
                }
            });
            this._nextPuyoSprites.forEach((sprite, index) => {
                const pair = index < 2
                    ? this._model.nextColors
                    : this._model.nextNextColors;
                const color = pair[1 - (index % 2)];
                sprite.visible = !this._model.gameOver;
                sprite.bitmap = this._puyoBitmaps[color];
                this.fitPuyoSprite(sprite);
            });
        }

        refreshChainDisplay() {
            const visible = this._model.chain > 0 &&
                (this._model.phase === "clearing" || this._model.phase === "checking");
            this._chainDisplaySprite.visible = visible;
            if (!visible) {
                this._lastChainDisplayText = "";
                return;
            }
            const text = `${this._model.chain}連鎖!`;
            if (text === this._lastChainDisplayText) {
                return;
            }
            const bitmap = this._chainDisplaySprite.bitmap;
            bitmap.clear();
            bitmap.fontSize = 36;
            bitmap.textColor = "#fff7b0";
            bitmap.outlineColor = "#4c2b74";
            bitmap.outlineWidth = 8;
            bitmap.drawText(text, 0, 6, bitmap.width, 64, "center");
            this.playChainVoice(this._model.chain);
            this._lastChainDisplayText = text;
        }

        playChainVoice(chain, source = "player") {
            if (chain < 1) {
                return;
            }
            const voiceIndex = Math.min(chain, chainVoiceFiles.length) - 1;
            const voiceFile = chainVoiceFiles[voiceIndex];
            if (!voiceFile) {
                return;
            }
            const voice = {
                name: normalizeAudioFileName(voiceFile),
                volume: 90,
                pitch: 100,
                pan: 0
            };
            const latestBuffers = AudioManager._seBuffers.filter(
                buffer => buffer.frameCount === Graphics.frameCount
            );
            if (latestBuffers.find(buffer => {
                return buffer.name === voice.name &&
                    buffer._puyoVoiceSource === source;
            })) {
                return;
            }
            const buffer = AudioManager.createBuffer("puyose/", voice.name);
            buffer.frameCount = Graphics.frameCount;
            buffer._puyoVoiceSource = source;
            AudioManager.updateSeParameters(buffer, voice);
            buffer.play(false);
            AudioManager._seBuffers.push(buffer);
            AudioManager.cleanupSe();
        }

        setPuyoSprite(
            sprite,
            color,
            x,
            y,
            visible,
            boardX = this._boardX,
            boardY = this._boardY
        ) {
            if (color === EMPTY || x < 0 || y < 1 || y >= BOARD_HEIGHT ||
                x >= BOARD_WIDTH) {
                sprite.visible = false;
                return;
            }
            sprite.visible = visible;
            sprite._puyoBaseX = boardX + x * this._cellSize;
            sprite._puyoBaseY = boardY + (y - 1) * this._cellSize;
            sprite.x = sprite._puyoBaseX;
            sprite.y = sprite._puyoBaseY;
            sprite.bitmap = color === GARBAGE
                ? this._garbageBitmap
                : this._puyoBitmaps[color];
            this.fitPuyoSprite(sprite);
        }

        fitPuyoSprite(sprite) {
            const bitmap = sprite.bitmap;
            if (bitmap && bitmap.isReady() && bitmap.width > 0 && bitmap.height > 0) {
                sprite.scale.x = this._cellSize / bitmap.width;
                sprite.scale.y = this._cellSize / bitmap.height;
                sprite.x = sprite._puyoBaseX;
                sprite.y = sprite._puyoBaseY;
                return true;
            } else {
                sprite.visible = false;
                return false;
            }
        }
    }

    class Scene_PuyoBattle extends Scene_Puyo {
        setupKeyMapping() {
        }

        terminate() {
            if (this._cpuModel && typeof this._cpuModel.disposeAiWorkers === "function") {
                this._cpuModel.disposeAiWorkers();
            }
            super.terminate();
        }

        create() {
            super.create();
            this.createDifficultySelection();
            this.createAiDetailDisplay();
        }

        createAiDetailDisplay() {
            if (!SHOW_AI_DETAIL_DISPLAY) {
                return;
            }
            const width = 250;
            const height = 22;
            const bitmap = new Bitmap(width, height);
            this._aiDetailDisplaySprite = new Sprite(bitmap);
            this._aiDetailDisplaySprite.x = Math.max(0, Graphics.boxWidth - width - 8);
            this._aiDetailDisplaySprite.y = 1;
            this._aiDetailDisplaySprite.visible = false;
            this._lastAiDetailDisplayText = "";
            this.addChild(this._aiDetailDisplaySprite);
            this.refreshAiDetailDisplay(true);
        }

        refreshAiDetailDisplay(force = false) {
            if (!SHOW_AI_DETAIL_DISPLAY || !this._aiDetailDisplaySprite || !this._cpuModel) {
                return;
            }
            this._aiDetailDisplaySprite.visible = !this._difficultySelecting;
            if (this._difficultySelecting) {
                return;
            }
            const expandedNodes = Math.max(0, Math.floor(Number(this._cpuModel.aiExpandedNodeCount) || 0));
            const workerCount = Math.max(0, Math.floor(Number(this._cpuModel.aiWorkerCount) || 0));
            const text = `展開ノード: ${expandedNodes.toLocaleString()} | Worker: ${workerCount}`;
            if (!force && text === this._lastAiDetailDisplayText) {
                return;
            }
            const bitmap = this._aiDetailDisplaySprite.bitmap;
            bitmap.clear();
            bitmap.fillRect(0, 0, bitmap.width, bitmap.height, "rgba(0,0,0,0.72)");
            bitmap.fontSize = 12;
            bitmap.textColor = "#ffffff";
            bitmap.outlineColor = "rgba(0,0,0,0.95)";
            bitmap.outlineWidth = 3;
            bitmap.drawText(text, 4, 0, bitmap.width - 8, bitmap.height, "left");
            this._lastAiDetailDisplayText = text;
        }

        createDifficultySelection() {
            const width = 300;
            const height = 180;
            const x = Math.floor((Graphics.boxWidth - width) / 2);
            const y = Math.floor((Graphics.boxHeight - height) / 2);
            const rect = new Rectangle(x, y, width, height);
            this._difficultyWindow = new Window_PuyoDifficulty(rect);
            ["normal", "strong", "god"].forEach(symbol => {
                this._difficultyWindow.setHandler(
                    symbol,
                    this.onDifficultySelected.bind(this, symbol)
                );
            });
            this._difficultyWindow.setHandler(
                "cancel",
                () => SceneManager.pop()
            );
            this.addWindow(this._difficultyWindow);

            this._difficultyTitleSprite = null;
            this._difficultySelecting = true;
            this._difficultyWindow.activate();
            this.hideGameplayPuyoSprites();
        }

        hideGameplayPuyoSprites() {
            const spriteGroups = [
                this._boardPuyoSprites,
                this._activePuyoSprites,
                this._cpuBoardPuyoSprites,
                this._cpuActivePuyoSprites,
                this._playerGarbageDropSprites,
                this._cpuGarbageDropSprites,
                this._nextPuyoSprites
            ];
            spriteGroups.forEach(group => {
                (group || []).forEach(sprite => {
                    sprite.visible = false;
                });
            });
        }

        onDifficultySelected(symbol) {
            const config = cpuDifficultyConfigs[symbol] ||
                cpuDifficultyConfigs.normal;
            this._cpuModel.setAiConfig(config);
            this._statusWindow.setCpuDifficulty(
                cpuDifficultyNames[symbol] || cpuDifficultyNames.normal
            );
            this._difficultySelecting = false;
            if (this._aiDetailDisplaySprite) {
                this._aiDetailDisplaySprite.visible = SHOW_AI_DETAIL_DISPLAY;
                this.refreshAiDetailDisplay(true);
            }
            this._difficultyWindow.deactivate();
            this._difficultyWindow.close();
            this._difficultyWindow.visible = false;
            if (this._difficultyTitleSprite) {
                this._difficultyTitleSprite.visible = false;
            }
            Input.clear();
            this.installPuyoKeyMapping();
            this.refreshAll();
        }

        createBoard() {
            this._cellSize = Math.min(this._cellSize, 40);
            this._boardWidth = BOARD_WIDTH * this._cellSize;
            this._boardHeight = VISIBLE_HEIGHT * this._cellSize;
            this._boardX = 24;
            this._boardY = Math.max(
                24,
                Math.floor((Graphics.boxHeight - this._boardHeight) / 2)
            );
            this._cpuBoardX = Graphics.boxWidth - this._boardWidth - 24;
            this._cpuModel = new PuyoCpuModel();
            this._model.onAttack = amount => {
                this.sendBattleAttack(this._model, this._cpuModel, amount);
            };
            this._cpuModel.onAttack = amount => {
                this.sendBattleAttack(this._cpuModel, this._model, amount);
            };

            const playerBoard = new Sprite(this.createBoardBitmap());
            playerBoard.x = this._boardX;
            playerBoard.y = this._boardY;
            this.addChild(playerBoard);
            this._boardSprite = playerBoard;

            const cpuBoard = new Sprite(this.createBoardBitmap());
            cpuBoard.x = this._cpuBoardX;
            cpuBoard.y = this._boardY;
            this.addChild(cpuBoard);
            this._cpuBoardSprite = cpuBoard;

            const playerHeaderBitmap = new Bitmap(this._boardWidth, 48);
            this._playerHeaderBitmap = playerHeaderBitmap;
            this._playerHeaderSprite = new Sprite(playerHeaderBitmap);
            this._playerHeaderSprite.x = this._boardX;
            this._playerHeaderSprite.y = this._boardY - 48;
            this.addChild(this._playerHeaderSprite);

            const cpuHeaderBitmap = new Bitmap(this._boardWidth, 48);
            this._cpuHeaderBitmap = cpuHeaderBitmap;
            this._cpuHeaderSprite = new Sprite(cpuHeaderBitmap);
            this._cpuHeaderSprite.x = this._cpuBoardX;
            this._cpuHeaderSprite.y = this._boardY - 48;
            this.addChild(this._cpuHeaderSprite);
        }

        createPuyoSprites() {
            this._boardPuyoSprites = this.createBattleSpriteGrid();
            this._cpuBoardPuyoSprites = this.createBattleSpriteGrid();
            this._playerGarbageDropSprites = this.createBattleSpriteGrid();
            this._cpuGarbageDropSprites = this.createBattleSpriteGrid();
            this._activePuyoSprites = [new Sprite(), new Sprite()];
            this._cpuActivePuyoSprites = [new Sprite(), new Sprite()];
            [
                ...this._activePuyoSprites,
                ...this._cpuActivePuyoSprites
            ].forEach(sprite => {
                sprite.visible = false;
                this.addChild(sprite);
            });
        }

        createBattleSpriteGrid() {
            const sprites = [];
            for (let i = 0; i < BOARD_WIDTH * VISIBLE_HEIGHT; i++) {
                const sprite = new Sprite();
                sprite.visible = false;
                sprites.push(sprite);
                this.addChild(sprite);
            }
            return sprites;
        }

        createStatusWindow() {
            const panelX = this._boardX + this._boardWidth + 16;
            const panelWidth = Math.max(220, this._cpuBoardX - panelX - 16);
            const rect = new Rectangle(panelX, this._boardY, panelWidth, this._boardHeight);
            this._statusWindow = new Window_PuyoStatus(rect);
            this._statusWindow.setCompactLayout(true);
            this._statusWindow.setCpuDifficulty("未選択");
            this._statusWindow.setModel(this._model);
            this.addWindow(this._statusWindow);
        }

        createChainDisplay() {
            super.createChainDisplay();
            const bitmap = new Bitmap(this._boardWidth, 84);
            this._cpuChainDisplaySprite = new Sprite(bitmap);
            this._cpuChainDisplaySprite.x = this._cpuBoardX;
            this._cpuChainDisplaySprite.y = this._boardY +
                Math.floor(this._boardHeight / 2) - 42;
            this._cpuChainDisplaySprite.visible = false;
            this._lastCpuChainDisplayText = "";
            this.addChild(this._cpuChainDisplaySprite);
            this._playerResultSprite = this.createBattleResultSprite(this._boardX);
            this._cpuResultSprite = this.createBattleResultSprite(this._cpuBoardX);
        }

        createBattleResultSprite(boardX) {
            const sprite = new Sprite(new Bitmap(this._boardWidth, this._boardHeight));
            sprite.x = boardX;
            sprite.y = this._boardY;
            sprite.visible = false;
            this.addChild(sprite);
            return sprite;
        }

        sendBattleAttack(source, target, amount) {
            const remaining = source.cancelGarbage(amount);
            if (remaining > 0) {
                target.receiveGarbage(remaining);
            }
        }

        isBattleChainResolving() {
            return [this._model, this._cpuModel].some(model => {
                return model.chain > 0 &&
                    (model.phase === "clearing" || model.phase === "checking");
            });
        }

        syncGarbageDropAvailability() {
            const allowed = !this.isBattleChainResolving();
            // プレイヤー側に積まれるお邪魔はCPUから受けたものだけ。
            // フラグONでは落下を止めつつ pendingGarbage を残し、予告と相殺は維持する。
            this._model.setGarbageDropAllowed(
                allowed && !DISABLE_CPU_ATTACK_TO_PLAYER
            );
            // CPU側の落下許可は従来どおり。プレイヤーからの攻撃には影響させない。
            this._cpuModel.setGarbageDropAllowed(allowed);
        }

        update() {
            const wasDifficultySelecting = this._difficultySelecting;
            Scene_Base.prototype.update.call(this);
            if (wasDifficultySelecting || this._difficultySelecting) {
                this.refreshAiDetailDisplay();
                return;
            }
            if (Input.isTriggered("cancel")) {
                SceneManager.pop();
                return;
            }
            if (this._model.gameOver || this._cpuModel.gameOver) {
                if (Input.isTriggered("ok")) {
                    this._model.reset();
                    this._cpuModel.reset();
                    this.refreshAll();
                }
                this.refreshStatusIfNeeded();
                this.refreshPuyoSprites();
                this.refreshChainDisplay();
                this.refreshAiDetailDisplay();
                return;
            }
            this.handleInput();
            this.syncGarbageDropAvailability();
            this._model.update();
            this._cpuModel.update();
            this.syncGarbageDropAvailability();
            this.refreshStatusIfNeeded();
            this.refreshPuyoSprites();
            this.refreshChainDisplay();
            this.refreshAiDetailDisplay();
        }

        refreshAll() {
            this.refreshStatusIfNeeded(true);
            this.refreshPuyoSprites();
            this.refreshChainDisplay();
        }

        refreshPuyoSprites() {
            this.refreshBattleBoardSprites(
                this._model,
                this._boardPuyoSprites,
                this._activePuyoSprites,
                this._boardX
            );
            this.refreshGarbageDropSprites(
                this._model,
                this._playerGarbageDropSprites,
                this._boardX
            );
            this.refreshBattleBoardSprites(
                this._cpuModel,
                this._cpuBoardPuyoSprites,
                this._cpuActivePuyoSprites,
                this._cpuBoardX
            );
            this.refreshGarbageDropSprites(
                this._cpuModel,
                this._cpuGarbageDropSprites,
                this._cpuBoardX
            );
            this._nextPuyoSprites.forEach((sprite, index) => {
                const pair = index < 2
                    ? this._model.nextColors
                    : this._model.nextNextColors;
                const color = pair[1 - (index % 2)];
                sprite.visible = !this._model.gameOver;
                sprite.bitmap = this._puyoBitmaps[color];
                this.fitPuyoSprite(sprite);
            });
            this.refreshBattleHeaders();
        }

        refreshBattleBoardSprites(model, boardSprites, activeSprites, boardX) {
            for (let y = 1; y < BOARD_HEIGHT; y++) {
                const screenY = y - 1;
                for (let x = 0; x < BOARD_WIDTH; x++) {
                    const index = screenY * BOARD_WIDTH + x;
                    const sprite = boardSprites[index];
                    const color = model.cells[y][x];
                    const blinking = model.phase === "clearing" &&
                        model.isClearingCell(x, y) &&
                        Math.floor(model.phaseTimer / 3) % 2 === 0;
                    this.setPuyoSprite(
                        sprite,
                        model.isGarbageDroppingCell(x, y) ? EMPTY : color,
                        x,
                        y,
                        !blinking,
                        boardX,
                        this._boardY
                    );
                }
            }
            const activeCells = model.activeCells();
            activeSprites.forEach((sprite, index) => {
                const cell = activeCells[index];
                if (cell) {
                    this.setPuyoSprite(
                        sprite,
                        cell.color,
                        cell.x,
                        cell.y,
                        true,
                        boardX,
                        this._boardY
                    );
                } else {
                    sprite.visible = false;
                }
            });
        }

        refreshGarbageDropSprites(model, sprites, boardX) {
            const progress = Math.max(0, Math.min(1, model.garbageDropProgress()));
            sprites.forEach((sprite, index) => {
                const cell = model.garbageDropCells[index];
                if (model.phase !== "garbageDropping" || !cell || cell.y < 1) {
                    sprite.visible = false;
                    return;
                }
                const screenY = cell.y - 1;
                sprite.bitmap = this._garbageBitmap;
                sprite._puyoBaseX = boardX + cell.x * this._cellSize;
                sprite._puyoBaseY = this._boardY + screenY * this._cellSize;
                const bitmapReady = this.fitPuyoSprite(sprite);
                sprite.y = this._boardY - this._cellSize +
                    (sprite._puyoBaseY - (this._boardY - this._cellSize)) * progress;
                sprite.visible = bitmapReady;
            });
        }

        refreshChainDisplay() {
            super.refreshChainDisplay();
            this.refreshBattleResultDisplays();
            const visible = this._cpuModel.chain > 0 &&
                (this._cpuModel.phase === "clearing" ||
                    this._cpuModel.phase === "checking");
            this._cpuChainDisplaySprite.visible = visible;
            if (!visible) {
                this._lastCpuChainDisplayText = "";
                return;
            }
            const text = `${this._cpuModel.chain}連鎖!`;
            if (text === this._lastCpuChainDisplayText) {
                return;
            }
            const bitmap = this._cpuChainDisplaySprite.bitmap;
            bitmap.clear();
            bitmap.fontSize = 36;
            bitmap.textColor = "#fff7b0";
            bitmap.outlineColor = "#4c2b74";
            bitmap.outlineWidth = 8;
            bitmap.drawText(text, 0, 6, bitmap.width, 64, "center");
            this.playChainVoice(this._cpuModel.chain, "cpu");
            this._lastCpuChainDisplayText = text;
        }

        refreshBattleResultDisplays() {
            const playerGameOver = this._model.gameOver;
            const cpuGameOver = this._cpuModel.gameOver;
            if (!playerGameOver && !cpuGameOver) {
                this._playerResultSprite.visible = false;
                this._cpuResultSprite.visible = false;
                return;
            }
            let playerResult = "lose";
            let cpuResult = "lose";
            if (playerGameOver && !cpuGameOver) {
                cpuResult = "win";
            } else if (!playerGameOver && cpuGameOver) {
                playerResult = "win";
            }
            this.drawBattleResult(this._playerResultSprite, playerResult);
            this.drawBattleResult(this._cpuResultSprite, cpuResult);
        }

        drawBattleResult(sprite, result) {
            const bitmap = sprite.bitmap;
            bitmap.clear();
            bitmap.fontSize = 44;
            bitmap.textColor = "#ffffff";
            bitmap.outlineColor = result === "win" ? "#d9364f" : "#3272c7";
            bitmap.outlineWidth = 8;
            if (result === "win") {
                bitmap.drawText(
                    "やった！",
                    0,
                    Math.floor((bitmap.height - 64) / 2),
                    bitmap.width,
                    64,
                    "center"
                );
            } else {
                const lineHeight = 58;
                const y = Math.floor((bitmap.height - lineHeight * 2) / 2);
                bitmap.drawText("ばたん", 0, y, bitmap.width, lineHeight, "center");
                bitmap.drawText(
                    "きゅー",
                    0,
                    y + lineHeight,
                    bitmap.width,
                    lineHeight,
                    "center"
                );
            }
            sprite.visible = true;
        }

        refreshBattleHeaders() {
            this.refreshBattleHeader(
                this._playerHeaderBitmap,
                "PLAYER",
                this._model.pendingGarbage
            );
            this.refreshBattleHeader(
                this._cpuHeaderBitmap,
                "CPU",
                this._cpuModel.pendingGarbage
            );
        }

        refreshBattleHeader(bitmap, title, pendingGarbage) {
            bitmap.clear();
            bitmap.fontSize = 20;
            bitmap.textColor = "#ffffff";
            bitmap.outlineColor = "#101622";
            bitmap.outlineWidth = 4;
            bitmap.drawText(title, 0, 0, 72, 42, "left");
            bitmap.fontSize = 14;
            bitmap.drawText("予告", 76, 3, 34, 36, "left");
            this.drawGarbagePreview(bitmap, pendingGarbage);
        }

        garbagePreviewGroups(amount) {
            let remaining = Math.max(0, Math.floor(amount));
            return GARBAGE_PREVIEW_UNITS.reduce((groups, unit) => {
                const count = Math.floor(remaining / unit.value);
                if (count > 0) {
                    groups.push({ unit, count });
                    remaining -= count * unit.value;
                }
                return groups;
            }, []);
        }

        drawGarbagePreview(bitmap, amount) {
            const groups = this.garbagePreviewGroups(amount);
            if (groups.length === 0) {
                bitmap.fontSize = 14;
                bitmap.textColor = "#9da8b4";
                bitmap.drawText("なし", 113, 3, bitmap.width - 117, 36, "left");
                return;
            }
            let x = 113;
            groups.forEach(group => {
                const unit = group.unit;
                const customBitmap = this._garbagePreviewBitmaps &&
                    this._garbagePreviewBitmaps[unit.value];
                const hasCustomImage = customBitmap &&
                    customBitmap.isReady() &&
                    customBitmap.width > 0 &&
                    customBitmap.height > 0;
                const iconSize = getPreviewPuyoIconSize(unit, hasCustomImage);
                const countText = group.count > 1 ? `×${group.count}` : "";
                const countWidth = countText ? 25 : 0;
                const itemWidth = Math.max(20, iconSize + countWidth + 2);
                if (x + itemWidth > bitmap.width - 2) {
                    return;
                }
                const iconY = Math.floor((42 - iconSize) / 2);
                if (hasCustomImage) {
                    bitmap.blt(
                        customBitmap,
                        0,
                        0,
                        customBitmap.width,
                        customBitmap.height,
                        x,
                        iconY,
                        iconSize,
                        iconSize
                    );
                } else {
                    bitmap.fillRect(x, iconY, iconSize, iconSize, unit.color);
                    bitmap.fillRect(
                        x + 2,
                        iconY + 2,
                        Math.max(1, iconSize - 4),
                        Math.max(1, iconSize - 4),
                        unit.inner
                    );
                    if (unit.symbol) {
                        bitmap.fontSize = Math.max(8, Math.floor(iconSize * 0.55));
                        bitmap.textColor = "#ffffff";
                        bitmap.outlineColor = "#36404c";
                        bitmap.outlineWidth = 2;
                        bitmap.drawText(
                            unit.symbol,
                            x,
                            iconY - 1,
                            iconSize,
                            iconSize + 2,
                            "center"
                        );
                    }
                }
                if (countText) {
                    bitmap.fontSize = 12;
                    bitmap.textColor = "#ffffff";
                    bitmap.outlineColor = "#101622";
                    bitmap.outlineWidth = 3;
                    bitmap.drawText(
                        countText,
                        x + iconSize - 1,
                        Math.floor((42 - 24) / 2),
                        countWidth + 4,
                        24,
                        "left"
                    );
                }
                x += itemWidth;
            });
        }
    }

    function finishPuyoLaunchEvent(interpreter) {
        if (interpreter && Array.isArray(interpreter._list)) {
            interpreter._index = interpreter._list.length;
        }
    }

    PluginManager.registerCommand(pluginName, "start", function() {
        finishPuyoLaunchEvent(this);
        SceneManager.push(Scene_Puyo);
    });
    PluginManager.registerCommand(pluginName, "startCpu", function() {
        finishPuyoLaunchEvent(this);
        SceneManager.push(Scene_PuyoBattle);
    });
})();