import { View, Text } from "react-native";
import { Balance, Expense } from "../types"
import CardBalance from "./UI/CardBalance";


interface BalanceListItemsProps
{
    balances: Balance;
}

export default function BalanceListItems({balances}: BalanceListItemsProps){
    return(
        <CardBalance
            balanceInfo={balances}
        />
        
    )
}