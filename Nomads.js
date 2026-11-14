"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nomads = void 0;
const Action_1 = require("@civ-clone/core-goody-hut/Action");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
/**
 * The hut holds nomads, who join the unit's player: a unit of `UnitType` (a ruleset's settlers) on the unit's square,
 * with no home city. Civilization II's fifth outcome.
 */
class Nomads extends Action_1.Action {
    constructor(goodyHut, unit, UnitType, ruleRegistry = RuleRegistry_1.instance) {
        super(goodyHut, unit);
        this._ruleRegistry = ruleRegistry;
        this._UnitType = UnitType;
    }
    perform() {
        new this._UnitType(null, this.unit().player(), this.unit().tile(), this._ruleRegistry);
    }
    unitType() {
        return this._UnitType;
    }
}
exports.Nomads = Nomads;
Nomads.transient = ['_ruleRegistry'];
exports.default = Nomads;
//# sourceMappingURL=Nomads.js.map