import { Ability } from "./AbilityScores";

export type CharacterModifiers = AbilityModifiers & OtherModifiers;

export type OtherModifiers = {
    proficiency: number;
    initiative: number;
}

export type AbilityModifiers = {
    [A in Ability]: number;
}