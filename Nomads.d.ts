import { Action, IAction } from '@civ-clone/core-goody-hut/Action';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import PlayerUnit from '@civ-clone/core-unit/Unit';
/**
 * The hut holds nomads, who join the unit's player: a unit of `UnitType` (a ruleset's settlers) on the unit's square,
 * with no home city. Civilization II's fifth outcome.
 */
export declare class Nomads extends Action implements IAction {
  static readonly transient: string[];
  private _ruleRegistry;
  private _UnitType;
  constructor(
    goodyHut: GoodyHut,
    unit: PlayerUnit,
    UnitType: typeof PlayerUnit,
    ruleRegistry?: RuleRegistry
  );
  perform(): void;
  unitType(): typeof PlayerUnit;
}
export default Nomads;
