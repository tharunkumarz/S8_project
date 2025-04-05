import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext'; // Corrected import statement

export default function StudentLogin() {
  const { setRole } = useUser(); // Get setRole from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRoleState] = useState<'student' | 'admin'>('student');
  const router = useRouter();

  // Animation state
  const scaleAnim = useState(new Animated.Value(1))[0];

  const handleLogin = () => {
    if (username && password) {
      console.log(`Logging in as ${role}:`, { username, password });
      setRole(role); // Set the role in context
      router.push('/screens/home'); // Redirect to home screen
    } else {
      alert('Please enter both username and password.');
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/college-logo.png')} // Update with your logo path
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Hi, Welcome Back!</Text>
      
      <View style={styles.roleToggle}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'student' && styles.activeRole]}
          onPress={() => {
            setRoleState('student');
            animateButton();
          }}
        >
          <Animated.Text style={[styles.roleButtonText, { transform: [{ scale: scaleAnim }] }]}>Student</Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'admin' && styles.activeRole]}
          onPress={() => {
            setRoleState('admin');
            animateButton();
          }}
        >
          <Animated.Text style={[styles.roleButtonText, { transform: [{ scale: scaleAnim }] }]}>Admin</Animated.Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, { marginTop: 20 }]}
        placeholder="Username or Email Address"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9', // Light background color
  },
  logo: {
    width: 120, // Adjusted width
    height: 120, // Adjusted height
    alignSelf: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#0a7ea4', // Updated color
    fontWeight: 'bold', // Set font weight to bold
  },
  roleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#e0e0e0', // Background color for the toggle
    padding: 5,
    width: '80%', // Adjust width as needed
    alignSelf: 'center',
  },
  roleButton: {
    flex: 1,
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Transparent to show the toggle background
  },
  activeRole: {
    backgroundColor: '#0a7ea4', // Active color for selected role
  },
  roleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15, // Increased text size
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  loginButton: {
    backgroundColor: '#0a7ea4', // Updated color for login button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#0a7ea4', // Updated color for forgot password text
    textAlign: 'center',
  },
});