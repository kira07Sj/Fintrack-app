import { View, Text } from "react-native";
import { Balance, Expense } from "../types"
import CardExpense from "./UI/CardExpense";

interface ExpensesListItemsProps
{
    expense: Expense;
    balanceInfo: Balance | undefined;
}

export default function ExpensesListItems({expense, balanceInfo}: ExpensesListItemsProps){
    return(

        <CardExpense 
            cardExpense={expense}
            balanceInfo={balanceInfo}
        />
    )
}