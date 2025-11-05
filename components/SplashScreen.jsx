import { useEffect  } from "react";
import { View, Text , StyleSheet }  from "react-native";
import { useRouter } from "expo-router";
 export default function SplashScreen (){
const router = useRouter();
  useEffect(() =>{
   const timer = setTimeout(()=>{
      router.replace('welcome');
    } ,8000); 
    return () => clearTimeout(timer);
  } ,[]);
  return(
        <View style={styles.container}>
      <Text style={styles.title}>Travel App</Text>
    </View>
  );
};
const styles = StyleSheet.create({
 container:{
  flex: 1 ,
  justifyContent : 'center',
  alignItems : 'center',
  backgroundColor : '#107df3ff',
 },
 title :{
   fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
 },
 

});