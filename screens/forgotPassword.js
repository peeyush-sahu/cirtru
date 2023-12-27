import { ScrollView } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

const ForgotPassword = () => {
	return (
		<ScrollView
			keyboardShouldPersistTaps='always'
			contentContainerStyle={{
				paddingHorizontal: 16,
				paddingVertical: 24
			}}
		>
			<Text>Enter your email to receive a password reset link</Text>
			<TextInput
				mode='outlined'
				placeholder='Email'
				keyboardType='email-address'
				textContentType='emailAddress'
				returnKeyLabel='Done'
				returnKeyType='done'
				style={{ marginVertical: 16 }}
			/>
			<Button mode='contained' style={{ marginBottom: 16 }}>
				Send Reset Link
			</Button>
		</ScrollView>
	);
};

export default ForgotPassword;
