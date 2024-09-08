import { View,Text, StyleSheet, ImageBackground } from "react-native"
import { Expense, Balance, Plans } from "../../types";
import CheckBox from "./checkBox";


interface plansProps
{
    plans: Plans;
    balanceInfo: Balance | undefined;
}

export default function CardPlan({plans, balanceInfo}: plansProps){
    return(
        <View style={styles.card}>

            <View style={styles.content}>
                <Text style={styles.innerText}>{plans.name}</Text>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.innerText}>{plans.amount}</Text>
                    <Text style={styles.text}>birr</Text>
                </View>
            </View>

            <View style={styles.paymentBox}>
                <Text style={styles.text}>payment method</Text>
                <ImageBackground 
                source={require('../../assets/cardBg.png')}
                style={styles.payBox}
                >
                    <Text style={styles.paymentText}>{balanceInfo?.name}</Text>

                    <CheckBox/>
                </ImageBackground>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        height: 175,
        justifyContent: 'center',
        alignItems:"center",
        marginLeft:10,
        borderRadius: 10,
        overflow: 'hidden',
        gap: 5,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#1D966A',
        marginBottom:10
    },
    content: {
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       alignContent:'center',
       width:'85%',
       marginTop:15,
       borderBottomWidth:1,
      
    },
    text: {
        fontSize: 14,
        color: '#127350',
        marginBottom:10,
        marginLeft:5
       
    },
    paymentBox:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        width:'80%'
    },
    payBox:
    {
        width:'100%',
        height:40,
        borderRadius: 10,
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems: 'center'
    },
    paymentText:
    {
        fontSize:22,
        color:'white',
        fontWeight:'bold',
        marginLeft:15,
    },
    Date:
    {
        color:'#127350'
    },
    DateBox:{
        display:'flex',
        position:'absolute',
        top:10,
        left:10
    },
    innerText:
    {
        color:'#127350',
        fontSize: 24,
        fontWeight:'bold',
        marginBottom:10
        
    },

    
});