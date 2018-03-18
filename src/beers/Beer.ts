export interface Beer {
    id: number;
    name: string;
    tagLine: string;
    description: string;
    imageUrl: string;
    firstBrewed: string;
    abv: number;
    ibu: number;
    foodPairing: string[];
    ingredients: Ingredients;
    methods: Methods;
    brewingTips: string;
}

export interface Ingredients {
    malt: Cereal[];
    hops: Cereal[];
    yeast?: string;
}

export interface Cereal {
    name: string;
    amount: Amount;
    add?: string;
    attribute?: string;
}

export interface Amount {
    value: number;
    unit: string;
}

export interface Methods {
    mashing: Method;
    fermentation: Method;
}

export interface Method {
    duration?: number;
    temperature: Temperature;
}

export interface Temperature {
    value: number;
    unit: string;
}
