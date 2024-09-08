import { View, Text } from "react-native";
import { Balance, Plans } from "../types"
import CardPlan from "./UI/CardPlan";

interface PlansListItemsProps
{
    plan: Plans
    balanceInfo: Balance | undefined;
}

export default function PlansListItems({plan, balanceInfo}: PlansListItemsProps){
    return(

        <CardPlan
            plans={plan}
            balanceInfo={balanceInfo}
        />
    )
}