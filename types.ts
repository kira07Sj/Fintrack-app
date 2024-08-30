export interface Balance
{
    id: number;
    name: string;
    amount: number;
}

export interface Expense
{
    id: number;
    name: string;
    amount: number;
    date: number;
    balance_id: number;
}

export interface Plans
{
    id: number;
    name: string;
    amount: number;
    balance_id: number;
}
