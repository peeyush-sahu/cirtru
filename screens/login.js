import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';

const Login = () => {
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
				placeholder='Password'
				textContentType='password'
				returnKeyLabel='Log In'
				returnKeyType='done'
				secureTextEntry={!showPassword}
				right={
					<TextInput.Icon
						icon={showPassword ? 'eye-off' : 'eye'}
						onPress={() => setShowPassword(!showPassword)}
					/>
				}
			/>
			<Button
				style={{ marginVertical: 16 }}
				onPress={() => navigation.navigate('ForgotPassword')}
			>
				Forgot Password?
			</Button>
			<Button mode='contained' style={{ marginBottom: 16 }}>
				Log In
			</Button>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 24
				}}
			>
				<Text>Don't have an account?</Text>
				<Button onPress={() => navigation.navigate('SignUp')}>
					Sign Up
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
		</ScrollView>
	);
};

export default Login;
