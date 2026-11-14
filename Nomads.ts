import { Action, IAction } from '@civ-clone/core-goody-hut/Action';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import PlayerUnit from '@civ-clone/core-unit/Unit';

/**
 * The hut holds nomads, who join the unit's player: a unit of `UnitType` (a ruleset's settlers) on the unit's square,
 * with no home city. Civilization II's fifth outcome.
 */
export class Nomads extends Action implements IAction {
  static readonly transient = ['_ruleRegistry'];
  private _ruleRegistry: RuleRegistry;
  private _UnitType: typeof PlayerUnit;

  constructor(
    goodyHut: GoodyHut,
    unit: PlayerUnit,
    UnitType: typeof PlayerUnit,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(goodyHut, unit);

    this._ruleRegistry = ruleRegistry;
    this._UnitType = UnitType;
  }

  perform(): void {
    new this._UnitType(
      null,
      this.unit().player(),
      this.unit().tile(),
      this._ruleRegistry
    );
  }

  unitType(): typeof PlayerUnit {
    return this._UnitType;
  }
}

export default Nomads;
