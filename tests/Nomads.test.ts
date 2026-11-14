import { execFileSync } from 'child_process';
import Action from '@civ-clone/core-goody-hut/Action';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import Nomads from '../Nomads';
import Player from '@civ-clone/core-player/Player';
import PlayerUnit from '@civ-clone/core-unit/Unit';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Tile from '@civ-clone/core-world/Tile';
import { expect } from 'chai';
import { readFileSync } from 'fs';

class Settlers extends PlayerUnit {}

describe('Nomads', (): void => {
  it('is a goody-hut action, matched by its class name', (): void => {
    const action = new Nomads(
      {} as GoodyHut,
      {} as PlayerUnit,
      Settlers,
      new RuleRegistry()
    );

    expect(action).instanceOf(Action);
    expect(Nomads.name).equal('Nomads');
    expect(Nomads.transient).eql(['_ruleRegistry']);
    expect(action.unitType()).equal(Settlers);
  });

  it("makes one unit of the type for the unit's player, on its square, with no home city", (): void => {
    const player = new Player(),
      tile = {} as Tile,
      ruleRegistry = new RuleRegistry(),
      made: [unknown, Player, Tile, RuleRegistry][] = [];

    class Recorded extends Settlers {
      constructor(city: null, owner: Player, at: Tile, rules: RuleRegistry) {
        made.push([city, owner, at, rules]);

        super(city, owner, at, rules);
      }
    }

    new Nomads(
      {} as GoodyHut,
      { player: () => player, tile: () => tile } as unknown as PlayerUnit,
      Recorded,
      ruleRegistry
    ).perform();

    expect(made).length(1);
    expect(made[0][0]).equal(null);
    expect(made[0][1]).equal(player);
    expect(made[0][2]).equal(tile);
    expect(made[0][3]).equal(ruleRegistry);
  });

  it('registers nothing: no main, no index', (): void => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

    ['main', 'module', 'exports', 'bin'].forEach((key) =>
      expect(pkg, key).not.have.property(key)
    );
    expect(() => readFileSync('index.ts')).throw();
    expect(() => readFileSync('index.js')).throw();
    // Loading the class in a fresh process registers no rule on the default registry.
    expect(
      execFileSync(process.execPath, [
        '-e',
        "require('./Nomads.js'); console.log(require('@civ-clone/core-rule/RuleRegistry').instance.entries().length)",
      ])
        .toString()
        .trim()
    ).equal('0');
  });
});
