export interface IProduct {
    id?: number;
    title: string;
    price: number;
    description: string;
    image: string | null;
    category: string;
    rating?: IRating;
}

export interface IRating {
    rate: number;
    count: number;
}