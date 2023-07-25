'use client'

import { useClassInstance } from "@ddd-toolkit/react";
import { Character } from "@/modules/characters";
import { Ability, Abilities } from "@/modules/characters/domain/models/Character/AbilityScores";
import { AVAILABLE_HIT_DICES, CREATION_POINTS } from "@/modules/characters/domain/models/Character/character.constants";
import { useEffect } from "react";

export default function Home() {
    const character = useClassInstance(new Character({ _id: 'asdf' }))
    
    useEffect(() => {
        console.log('character changes')
    }, [character])

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px' }}>
            <section style={{ flex:'0 0 200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <input
                    placeholder="name"
                    onChange={(e) => character.updateCharacterInfo({ name: e.target.value })}
                />
                <input 
                    placeholder="description" 
                    onChange={(e) => character.updateCharacterInfo({ description: e.target.value })}
                />

                <span>
                    <label htmlFor="">Hit dice</label>
                    <select value={character.hitDice} onChange={(e) => character.setHitDice(parseInt(e.target.value))}>{AVAILABLE_HIT_DICES.map(hitDice => (
                        <option key={hitDice} value={hitDice}>{hitDice}</option>    
                    ))}</select>
                </span>

                <button onClick={() => character.levelUp()}>Level up</button>

                {Object.keys(Abilities).map(ability => (
                    <div key={ability}>
                        <button
                            onClick={() => character.decrementAbilityScore(ability as Ability)}
                            disabled={!character.canDecrementAbilityScore(ability as Ability)}
                        >-</button>
                        <span>{ability}</span>
                        <button onClick={() => character.incrementAbilityScore(ability as Ability)}>+</button>
                    </div>
                ))}
            </section>
            <section style={{ flex: '1 1 auto' }}>
                <table border={1}>
                    <tbody>
                        <tr>
                            <td>hit points</td>
                            <td>0/{character.hitPointsMax}</td>
                        </tr>
                        <tr>
                            <td>creation points</td>
                            <td>{character.creationPoints}/{CREATION_POINTS}</td>
                        </tr>
                        <tr>
                            <td>Available ability score improvements</td>
                            <td>{character.availableAbilityScoreImprovements}</td>
                        </tr>
                    </tbody>
                </table>

                <pre>{JSON.stringify(character, null, 2)}</pre>
                
                <br />
                <small>bonuses:</small>
                <pre>{JSON.stringify(character.modifiers, null, 2)}</pre>
            </section>
        </div>
    )
}
