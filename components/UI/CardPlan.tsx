import { View,Text, StyleSheet, ImageBackground } from "react-native"
import { Balance, Plans } from "../../types";
import CheckBox from "./CheckBox";
import { useState } from "react";
import { useTheme } from "../../Hooks/ThemeProvider ";

interface plansProps
{
    plans: Plans;
    balanceInfo: Balance | undefined;
}

export default function CardPlan({plans, balanceInfo}: plansProps){

    const { isDarkMode } = useTheme();

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckChange = (checked: boolean) => {
        setIsChecked(checked);
      };
    return(
        <View style={[styles.card,isDarkMode ? styles.Darkmode : styles.lightMode]}>

            <View style={[styles.content,isDarkMode ? styles.darkModeUnderLine : styles.lightMode]}>
                <Text style={[
            styles.innerText,
            isChecked && styles.onCheck,isDarkMode ? styles.darkModeText : styles.lightMode // Apply strike-through if checked
          ]}>{plans.name}</Text>
                <View style={[{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'},isChecked && styles.onCheck]}>
                    <Text style={[styles.innerText,isDarkMode ? styles.darkModeText : styles.lightMode]}>{plans.amount}</Text>
                    <Text style={[styles.text,isDarkMode ? styles.darkModeText : styles.lightMode]}>birr</Text>
                </View>
            </View>

            <View style={[styles.paymentBox,isChecked && styles.onCheck]}>
                <Text style={[styles.text,isDarkMode ? styles.darkModeText : styles.lightMode]}>payment method</Text>
                <ImageBackground 
                source={require('../../assets/cardBg.png')}
                style={styles.payBox}
                >
                    <Text style={styles.paymentText}>{balanceInfo?.name}</Text>

                    
                </ImageBackground>

                
            </View>
            <View style={styles.CheckBox}>
                <CheckBox onCheckChange={handleCheckChange}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        height: 160,
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
    onCheck:{
        color:'#127350',
        fontSize: 24,
        fontWeight:'bold',
        opacity:.7,
        textDecorationLine:'line-through'

    },
    CheckBox:
    {
        position:'absolute',
        bottom:20,
        right:30
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