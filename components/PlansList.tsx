import { Dispatch, SetStateAction } from "react";
import { Balance, Expense, Plans } from "../types"
import { Text, TouchableOpacity, View } from "react-native";
import PlansListItems from "./PlansListItems";


export default function PlansList({
    plans,
    balances,
    deleteplan,
}: {
    balances: Balance[];
    plans: Plans[];
    deleteplan: (id:number) => Promise<void>;
})  {
  return (
    <View>
      {plans.map((plan)=>{
        const balanceForCurrentItem = balances.find(
        (eachBalance) => eachBalance.id === plan.balance_id
        )
        return(
            <TouchableOpacity
                key={plan.id}
                activeOpacity={.7}
                onLongPress={() => deleteplan(plan.id)}
            >
                <PlansListItems 
                    plan={plan}
                    balanceInfo={balanceForCurrentItem}
                />
            </TouchableOpacity>
        )
      })}
    </View>
  )
}


