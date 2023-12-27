import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';

const SignUp = () => {
	const navigation = useNavigation();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<ScrollView
			keyboardShouldPersistTaps='always'
			contentContainerStyle={{
				paddingHorizontal: 16,
				paddingVertical: 24
			}}
		>
			<TextInput
				mode='outlined'
				placeholder='Email'
				keyboardType='email-address'
				textContentType='emailAddress'
				returnKeyLabel='Next'
				returnKeyType='next'
				style={{ marginBottom: 16 }}
			/>
			<TextInput
				mode='outlined'
				placeholder='Name'
				textContentType='name'
				returnKeyLabel='Next'
				returnKeyType='next'
				style={{ marginBottom: 16 }}
			/>
			<TextInput
				mode='outlined'
				placeholder='Create Password'
				textContentType='password'
				returnKeyLabel='Sign Up'
				returnKeyType='done'
				secureTextEntry={!showPassword}
				right={
					<TextInput.Icon
						icon={showPassword ? 'eye-off' : 'eye'}
						onPress={() => setShowPassword(!showPassword)}
					/>
				}
			/>
			<Button mode='contained' style={{ marginVertical: 16 }}>
				Sign Up
			</Button>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 24
				}}
			>
				<Text>Already a Cirtru member?</Text>
				<Button onPress={() => navigation.navigate('Login')}>
					Log In
				</Button>
			</View>
			<Divider />
			<Button
				icon='facebook'
				mode='outlined'
				style={{ marginTop: 36, marginBottom: 16 }}
			>
				Continue with Facebook
			</Button>
			<Button icon='google' mode='outlined'>
				Continue with Google
			</Button>
			<Text
				variant='bodySmall'
				style={{ marginTop: 24, textAlign: 'center' }}
			>
				By signing up I accept Cirtru's Terms of Service & Privacy
				Policy. This site is protected by reCAPTCHA and the Google
				Privacy Policy and Terms of Service apply.
			</Text>
		</ScrollView>
	);
};

export default SignUp;
