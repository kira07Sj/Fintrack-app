import { View,Text, StyleSheet, ImageBackground } from "react-native"
import { Expense, Balance } from "../../types";
import { useTheme } from "../../Hooks/ThemeProvider ";


interface CardExpenseProps
{
    cardExpense:Expense
    balanceInfo: Balance | undefined;
}

export default function CardExpense({cardExpense, balanceInfo}: CardExpenseProps){

    const { isDarkMode } = useTheme();


    return(
        <View style={[styles.card, isDarkMode ? styles.Darkmode : styles.lightMode]}>
            
            <View style={styles.DateBox}>
                <Text style={[styles.Date,isDarkMode ? styles.darkModeText : styles.lightMode]}>{cardExpense.date}</Text>
            </View>

            <View style={[styles.content, isDarkMode ? styles.darkModeUnderLine : styles.lightMode]}>
                <Text style={[styles.innerText, isDarkMode ? styles.darkModeText : styles.lightMode]}>{cardExpense.name}</Text>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Text style={[styles.innerText,isDarkMode ? styles.darkModeText : styles.lightMode]}>{cardExpense.amount}</Text>
                    <Text style={[styles.text,isDarkMode ? styles.darkModeText : styles.lightMode]}>birr</Text>
                </View>
            </View>

            <View style={styles.paymentBox}>
                <Text style={[styles.text,isDarkMode ? styles.darkModeText : styles.lightMode]}>payment method</Text>
                <ImageBackground 
                source={require('../../assets/cardBg.png')}
                style={styles.payBox}
                >
                    <Text style={styles.paymentText}>{balanceInfo?.name}</Text>
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
        justifyContent:'center'
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
  lightMode:{
    
  },
  Darkmode:{
    backgroundColor:'#1F1F1F',
    borderColor:'#1BCA8B'
  },
  darkModeText:
  {
    color:'#1BCA8B',
  },
  darkModeUnderLine:{
    borderBottomColor: '#1BCA8B'
  }

    
});