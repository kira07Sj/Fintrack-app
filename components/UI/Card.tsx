// Card.tsx

import React, { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, ImageBackground, ViewStyle } from 'react-native';
import { TotalAmount } from '../../types';

interface CardProps
{
    totalValue: TotalAmount
}

export default function Card({totalValue}: CardProps) {
    return (
        <ImageBackground
            source={require('../../assets/cardBg.png')} // Relative path to the image
            style={styles.card}
        >
            <View style={styles.textContainer}>
                <Text style={styles.text}>Weekly report</Text>
            </View>
            <View style={styles.content}>
                <View>
                    <Text style={styles.innerText}>Total Balance</Text>
                    <Text style={styles.amount}>{totalValue.totalBalance}</Text>
                </View>

                <View>
                    <Text style={styles.innerText}>Total Spent</Text>
                    <Text style={styles.amount}>{totalValue.totalExpense}</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        height: 170,
        justifyContent: 'center',
        alignItems:"center",
        marginLeft:10,
        borderRadius: 10,
        overflow: 'hidden',
        gap: 5 // Ensures children don't overflow the card bounds
    },
    content: {
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       alignContent:'center',
       width:'75%',
       marginTop:15,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'left',
        fontWeight:'700',
    },
    textContainer:{
        position:'absolute',
        top: 15,
        left:15,
    },
    innerText:
    {
        color:'white'
    },
    amount:
    {
        color:'white',
        fontSize: 36,
        fontWeight:'bold'
        
    },



    
});
