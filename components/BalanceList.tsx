import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Balance } from '../types'
import BalanceListItems from './BalanceListItems';

export default function BalanceList({
    balances,
    deleteBalance
}:{
    balances: Balance[];
    deleteBalance: (id:number) => Promise<void>;
}){
  return (
    <View>
        {balances.map((balance)=>{
            return(
                <TouchableOpacity
                    key={balance.id}
                    activeOpacity={.7}
                    onLongPress={()=> deleteBalance(balance.id)}
                >
                    <BalanceListItems
                        balances={balance}
                    />
                </TouchableOpacity>
            )
        })}
    </View>
  )
}

