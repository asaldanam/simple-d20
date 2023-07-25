export const MAX_LEVEL_ALLOWED = 20;
export const AVAILABLE_HIT_DICES = [6, 8, 10, 12];
export const CREATION_POINTS = 27;

export const PROFICIENCY_BONUS_PER_LEVEL = {
    1: +2,
    2: +2,
    3: +2,
    4: +2,
    5: +3,
    6: +3,
    7: +3,
    8: +3,
    9: +4,
    10: +4,
    11: +4,
    12: +4,
    13: +5,
    14: +5,
    15: +5,
    16: +5,
    17: +6,
    18: +6,
    19: +6,
    20: +6,
}

export const POINT_COST_OF_ABILITY_SCORES = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9
};
  
export const ABILITY_SCORES_AND_MODIFIERS = {
    1: -5,
    2: -4,
    3: -4,
    4: -3,
    5: -3,
    6: -2,
    7: -2,
    8: -1,
    9: -1,
    10: +0,
    11: +0,
    12: +1,
    13: +1,
    14: +2,
    15: +2,
    16: +3,
    17: +3,
    18: +4,
    19: +4,
    20: +5,
    21: +5,
    22: +6,
    23: +6,
    24: +7,
    25: +7,
    26: +8,
    27: +8,
    28: +9,
    29: +9,
    30: +10
};

export enum CHARACTER_ERRORS {
    'only-creation-characters-can-decrement-ability-scores',
    'cannot-decrease-ability-under-8',
}