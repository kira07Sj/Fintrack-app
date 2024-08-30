import { Dispatch, SetStateAction } from "react";
import { Balance, Expense } from "../types"
import { Text, TouchableOpacity, View } from "react-native";

export default function ExpensesList({
    expenses,
    balances,
    deleteExpense,
}: {
    balances: Balance[];
    expenses: Expense[];
    deleteExpense: (id:number) => Promise<void>;
})  {
  return (
    <View>
      {expenses.map((expense)=>{
        return(
            <TouchableOpacity
                key={expense.id}
                activeOpacity={.7}
                onLongPress={() => deleteExpense(expense.id)}
            >
                <Text>name: {expense.name} amount: {expense.amount}</Text>
            </TouchableOpacity>
        )
      })}
    </View>
  )
}


