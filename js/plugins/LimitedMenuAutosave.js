/*:
 * @target MZ
 * @plugindesc メニューを「アイテム / オプション / ゲーム終了」のみにし、手動セーブを禁止し、オートセーブを制御します。
 * @author Shirua
 *
 * @help
 * ■機能
 * 1. メニューを「アイテム / オプション / ゲーム終了」だけにします
 * 2. 手動セーブを禁止します（セーブ項目をメニューに出しません）
 * 3. オートセーブのタイミングを制御できます
 *
 * ■注意
 * - RPGツクールMZ用です
 * - 標準のオートセーブ仕様（MZ）を前提にしています
 * - 手動セーブはメニューから行えなくなります
 * - イベントコマンドで明示的にセーブ画面を開く処理を作った場合は、その処理側は別です
 *
 * ■プラグインコマンド
 * 1. オートセーブ実行
 *    今その場でオートセーブします
 *
 * 2. マップ移動後オートセーブ切替
 *    マップ移動後の自動オートセーブをON/OFFします
 *
 * 3. 戦闘終了後オートセーブ切替
 *    戦闘終了後の自動オートセーブをON/OFFします
 *
 * 4. 全オートセーブ切替
 *    上記2つをまとめてON/OFFします
 *
 * ■スクリプトから使う場合
 * $gameSystem.setLimitedMenuTransferAutosave(true);
 * $gameSystem.setLimitedMenuTransferAutosave(false);
 * $gameSystem.setLimitedMenuBattleAutosave(true);
 * $gameSystem.setLimitedMenuBattleAutosave(false);
 * $gameSystem.setLimitedMenuAllAutosave(true);
 * $gameSystem.setLimitedMenuAllAutosave(false);
 *
 * @param startTransferAutosave
 * @text 初期値: マップ移動後オートセーブ
 * @type boolean
 * @on ON
 * @off OFF
 * @default false
 *
 * @param startBattleAutosave
 * @text 初期値: 戦闘終了後オートセーブ
 * @type boolean
 * @on ON
 * @off OFF
 * @default false
 *
 * @command AutoSave
 * @text オートセーブ実行
 * @desc 今その場でオートセーブを実行します。
 *
 * @command SetTransferAutosave
 * @text マップ移動後オートセーブ切替
 * @desc マップ移動後のオートセーブをON/OFFします。
 *
 * @arg enabled
 * @text 有効
 * @type boolean
 * @on ON
 * @off OFF
 * @default true
 *
 * @command SetBattleAutosave
 * @text 戦闘終了後オートセーブ切替
 * @desc 戦闘終了後のオートセーブをON/OFFします。
 *
 * @arg enabled
 * @text 有効
 * @type boolean
 * @on ON
 * @off OFF
 * @default true
 *
 * @command SetAllAutosave
 * @text 全オートセーブ切替
 * @desc マップ移動後 / 戦闘終了後の両方をまとめてON/OFFします。
 *
 * @arg enabled
 * @text 有効
 * @type boolean
 * @on ON
 * @off OFF
 * @default true
 */

(() => {
    "use strict";

    const pluginName = "LimitedMenuAutosave";
    const params = PluginManager.parameters(pluginName);

    const START_TRANSFER_AUTOSAVE = params["startTransferAutosave"] === "true";
    const START_BATTLE_AUTOSAVE = params["startBattleAutosave"] === "true";

    //--------------------------------------------------------------------------
    // Game_System
    //--------------------------------------------------------------------------

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._limitedMenuTransferAutosave = START_TRANSFER_AUTOSAVE;
        this._limitedMenuBattleAutosave = START_BATTLE_AUTOSAVE;
    };

    Game_System.prototype.limitedMenuTransferAutosave = function() {
        if (this._limitedMenuTransferAutosave === undefined) {
            this._limitedMenuTransferAutosave = START_TRANSFER_AUTOSAVE;
        }
        return this._limitedMenuTransferAutosave;
    };

    Game_System.prototype.limitedMenuBattleAutosave = function() {
        if (this._limitedMenuBattleAutosave === undefined) {
            this._limitedMenuBattleAutosave = START_BATTLE_AUTOSAVE;
        }
        return this._limitedMenuBattleAutosave;
    };

    Game_System.prototype.setLimitedMenuTransferAutosave = function(value) {
        this._limitedMenuTransferAutosave = !!value;
    };

    Game_System.prototype.setLimitedMenuBattleAutosave = function(value) {
        this._limitedMenuBattleAutosave = !!value;
    };

    Game_System.prototype.setLimitedMenuAllAutosave = function(value) {
        const enabled = !!value;
        this._limitedMenuTransferAutosave = enabled;
        this._limitedMenuBattleAutosave = enabled;
    };

    //--------------------------------------------------------------------------
    // Window_MenuCommand
    // メニューを「アイテム / オプション / ゲーム終了」のみにする
    //--------------------------------------------------------------------------

    Window_MenuCommand.prototype.makeCommandList = function() {
        const enabled = this.areMainCommandsEnabled();
        this.addCommand(TextManager.item, "item", enabled);
        this.addOptionsCommand();
        this.addGameEndCommand();
    };

    //--------------------------------------------------------------------------
    // オートセーブ制御
    //--------------------------------------------------------------------------

    const _Scene_Map_shouldAutosave = Scene_Map.prototype.shouldAutosave;
    Scene_Map.prototype.shouldAutosave = function() {
        if (!$gameSystem.limitedMenuTransferAutosave()) {
            return false;
        }
        return _Scene_Map_shouldAutosave.call(this);
    };

    const _Scene_Battle_shouldAutosave = Scene_Battle.prototype.shouldAutosave;
    Scene_Battle.prototype.shouldAutosave = function() {
        if (!$gameSystem.limitedMenuBattleAutosave()) {
            return false;
        }
        return _Scene_Battle_shouldAutosave.call(this);
    };

    function executeAutosaveNow() {
        const scene = SceneManager._scene;
        if (scene && scene.requestAutosave) {
            scene.requestAutosave();
        } else {
            // 念のための保険
            if (DataManager.saveGame) {
                $gameSystem.onBeforeSave();
                DataManager.saveGame(0);
            }
        }
    }

    //--------------------------------------------------------------------------
    // Plugin Commands
    //--------------------------------------------------------------------------

    PluginManager.registerCommand(pluginName, "AutoSave", () => {
        executeAutosaveNow();
    });

    PluginManager.registerCommand(pluginName, "SetTransferAutosave", args => {
        const enabled = args.enabled === "true";
        $gameSystem.setLimitedMenuTransferAutosave(enabled);
    });

    PluginManager.registerCommand(pluginName, "SetBattleAutosave", args => {
        const enabled = args.enabled === "true";
        $gameSystem.setLimitedMenuBattleAutosave(enabled);
    });

    PluginManager.registerCommand(pluginName, "SetAllAutosave", args => {
        const enabled = args.enabled === "true";
        $gameSystem.setLimitedMenuAllAutosave(enabled);
    });

})();