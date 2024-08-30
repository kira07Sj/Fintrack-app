import { Dispatch, SetStateAction } from "react";
import { Balance, Expense } from "../types"
import { Text, TouchableOpacity, View } from "react-native";
import ExpensesListItems from "./ExpensesListItems";


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
        const balanceForCurrentItem = balances.find(
        (eachBalance) => eachBalance.id === expense.balance_id
        )
        return(
            <TouchableOpacity
                key={expense.id}
                activeOpacity={.7}
                onLongPress={() => deleteExpense(expense.id)}
            >
                <ExpensesListItems 
                expense={expense} 
                balanceInfo={balanceForCurrentItem}
                />
            </TouchableOpacity>
        )
      })}
    </View>
  )
}


