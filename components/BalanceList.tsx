import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Balance } from '../types'
import BalanceListItems from './BalanceListItems';

export default function BalanceList({
    balances,
    deleteBalance,
    onCardPress, // Add this prop to handle card press for updating
}: {
  balances: Balance[];
  deleteBalance: (id: number) => Promise<void>;
  onCardPress: (balance: Balance) => void; // Add a function to handle card press
}) {
  return (
    <View>
      {balances.map((balance) => (
        <TouchableOpacity
          key={balance.id}
          activeOpacity={0.7}
          onLongPress={() => deleteBalance(balance.id)}
          onPress={() => onCardPress(balance)} // Trigger card press to edit balance
        >
          <BalanceListItems balances={balance} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

