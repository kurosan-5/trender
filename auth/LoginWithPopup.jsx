// import { getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
// import { auth,  provider } from "../lib/firebase";
// import { Button, View } from "react-native";


// const LoginWithPopup = () => {

//     return (
//         <View>
//             <PopupGoogleLoginButton />
//             <MobileGoogleLoginButton />
//             <Button
//                     title='Go to Home'
//                     onPress={() => {
//                         navigation.navigate('home')
//                     }}
//                 />
//         </View>
//     )
// }

// const MobileGoogleLoginButton = () => {
//     const mobileGoogleLogin = async () => {try{
//         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
//         const {data} = await GoogleSignin.signIn();
//         const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
//         return auth().signInWithCredential(googleCredential);
//     }catch(error){
//         console.error(error);
//     }}

//     return(
//         <Button
//             title="login with google in mobile"
//             onPress={mobileGoogleLogin}

//         />
//     )
// }




// const PopupGoogleLoginButton = () => {
//     const PopuploginWithGoogle = () => {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 const credential = GoogleAuthProvider.credentialFromResult(result);
//                 const token = credential.accessToken;
//                 console.log("token : ", token)
//                 const user = result.user;
//                 console.log("user : ", user)
//             })
//             .catch((error) => {
//                 // Handle Errors here.
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // The email of the user's account used.
//                 const email = error.customData.email;
//                 // The AuthCredential type that was used.
//                 const credential = GoogleAuthProvider.credentialFromError(error);

//                 console.log(errorCode, errorMessage, email, credential)
//               });
//     }
//     return (
//         <Button
//             title='sign in with google'
//             onPress={PopuploginWithGoogle}
//         />
//     );
// }

// export default LoginWithPopup;
