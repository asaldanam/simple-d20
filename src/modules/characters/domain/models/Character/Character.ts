import { uuid } from "@/core/domain/uuid";
import { Entity, EntityProps } from "@/core/domain/Entity";

import { AbilityModifiers, CharacterModifiers } from "./Modifiers";
import { Abilities, Ability, AbilityScores, createAbilityScores } from "./AbilityScores";
import { HitDice } from "./HitDice";
import { ABILITY_SCORES_AND_MODIFIERS, AVAILABLE_HIT_DICES, MAX_LEVEL_ALLOWED, POINT_COST_OF_ABILITY_SCORES, CREATION_POINTS, PROFICIENCY_BONUS_PER_LEVEL, CHARACTER_ERRORS } from "./character.constants";

interface CharacterProps {
    name: string;
    description: string;
    level: number;
    hitDice: HitDice;
    abilityScores: AbilityScores;
    availableAbilityScoreImprovements: number;
}

export class Character implements Entity<CharacterProps> {
    readonly _id: string;
    name: string;
    description: string;
    level: number;
    hitDice: HitDice;
    abilityScores: AbilityScores;
    availableAbilityScoreImprovements: number;

    constructor(props: EntityProps<CharacterProps>) {
        this._id = props._id || uuid();
        this.name = props.name || '';
        this.level = props.level || 1;
        this.description = props.description || '';
        this.hitDice = props.hitDice || 6;
        this.abilityScores = createAbilityScores(props.abilityScores);
        this.availableAbilityScoreImprovements = props.availableAbilityScoreImprovements || 0;
    }

    get modifiers(): CharacterModifiers {
        const abilities = Object.keys(Abilities).reduce((acc, ability) => {
            const score = this.abilityScores[ability];
            const modifier = ABILITY_SCORES_AND_MODIFIERS[score]
            return { ...acc, [ability]: modifier }
        }, {} as AbilityModifiers);

        return {
            ...abilities,

            initiative: abilities.dexterity,
            proficiency: PROFICIENCY_BONUS_PER_LEVEL[this.level],
        }
    }

    get hitPointsMax() {
        const averageHitDiceResult = Math.floor(this.hitDice / 2);
        const hitPointsMax = this.level * (averageHitDiceResult + this.modifiers.constitution);
        return hitPointsMax;
    }

    get armorClass() {
        return 10;
    }

    get isMaxLevelReached() {
        return this.level >= MAX_LEVEL_ALLOWED;
    }

    get creationPoints() {
        const creationPoints = Object.keys(Abilities).reduce((total, ability) => {
            const score = this.abilityScores[ability];
            const points = POINT_COST_OF_ABILITY_SCORES[score] || 0;
            return total <= CREATION_POINTS ? total + points : CREATION_POINTS
        }, 0);

        return creationPoints;
    }

    setHitDice(value: number) {
        if (!AVAILABLE_HIT_DICES.includes(value)) {
            throw new Error('hit-dice-value-not-allowed');
        }

        this.hitDice = value as HitDice;
    };

    levelUp() {
        if (this.isMaxLevelReached) return;
        this.level = this.level + 1

        const canImproveAbilityScore = [4, 8, 12, 16, 19].includes(this.level);
        if (canImproveAbilityScore) this.availableAbilityScoreImprovements += 2;
    }

    updateCharacterInfo(info: Partial<Pick<CharacterProps, 'name' | 'description'>>) {
        Object.assign(this, info);
    }

    incrementAbilityScore(ability: Ability) {
        const newValue = this.abilityScores[ability] + 1;

        if (this.level === 1) {
            if (this.creationPoints >= CREATION_POINTS) return;
            if (newValue > 15) return;
        }

        if (newValue > 20) return;
        
        this.abilityScores[ability] = newValue;
    }

    canDecrementAbilityScore(ability: Ability) {
        const value = this.abilityScores[ability] - 1;
        const firstLevel = this.level === 1;
        const valueThresholdMatch = value >= 8;

        return {
            can: firstLevel && valueThresholdMatch,
            errors: this.getErrors({
                'only-creation-characters-can-decrement-ability-scores': !firstLevel,
                'cannot-decrease-ability-under-8': !valueThresholdMatch
            }),
        };
    }

    decrementAbilityScore(ability: Ability) {
        if (!this.canDecrementAbilityScore(ability).can) return;

        this.abilityScores[ability] -= 1;
    }

    private getErrors(reasons: { [Error in keyof typeof CHARACTER_ERRORS]?: boolean }) {
        return Object.entries(reasons)
            .filter(([reason, hasError]) => !!hasError)
            .map(([reason]) => reason)
    }
}