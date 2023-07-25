export enum Abilities {
    strength = 'strength',
    dexterity = 'dexterity',
    constitution = 'constitution',
    intelligence = 'intelligence',
    wisdom = 'wisdom',
    charisma = 'charisma',
}

export type Ability = keyof typeof Abilities;

export type AbilityScores = {
    [A in Ability]: number;
}

export function createAbilityScores(props?: Partial<AbilityScores>): AbilityScores {
    return {
        charisma: props?.charisma || 8,
        constitution: props?.constitution || 8,
        dexterity: props?.dexterity || 8,
        intelligence: props?.intelligence || 8,
        strength: props?.strength || 8,
        wisdom: props?.wisdom || 8
    }
}