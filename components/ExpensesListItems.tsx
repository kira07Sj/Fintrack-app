import { View, Text } from "react-native";
import { Balance, Expense } from "../types"

interface ExpensesListItemsProps
{
    expense: Expense;
    balanceInfo: Balance | undefined;
}

export default function ExpensesListItems({expense, balanceInfo}: ExpensesListItemsProps){
    return(

        <View>
            <Text>name: {expense.name} amount: {expense.amount} {balanceInfo?.name}</Text>
        </View>
    )
}