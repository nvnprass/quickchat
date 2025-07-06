import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  Linking,
  Alert,
} from 'react-native';
import ChatService from '../database/ChatService';

const NewChat = () => {
  const [name, setName] = React.useState('');
  const [phone_number, setPhoneNumber] = React.useState('');
  const [withName, setWithName] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Validasi nomor telepon sederhana
  const isValidPhoneNumber =
    phone_number.length >= 8 && /^\d+$/.test(phone_number);

  const handleNewChat = () => {
    setIsProcessing(true);
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formatted = `${day}/${month}/${year} ${hours}:${minutes}`;
    ChatService.addChat({
      name,
      phone_number,
      chated_at: formatted,
    });
    const url = `whatsapp://send?phone=${phone_number}`;
    Linking.openURL(url);
    setIsProcessing(false);
    setName('');
    setPhoneNumber('');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.marginBottom]}>Start</Text>

      <View style={styles.headerRow}>
        <Text style={[styles.text, styles.lightText]}>New</Text>
        <View style={styles.whatsappBadge}>
          <Text style={[styles.text, styles.whiteText]}>Whatsapp</Text>
        </View>
        <Text style={[styles.text, styles.lightText]}>Chat</Text>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enter the name for history?</Text>
        <Switch
          value={withName}
          onValueChange={setWithName}
          trackColor={{false: '#d3d3d3', true: '#a8d8a8'}}
          thumbColor={withName ? '#3e863d' : '#f4f3f4'}
        />
      </View>

      {withName && (
        <TextInput
          placeholder="Enter The Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}

      <TextInput
        placeholder="Enter wa number with country code"
        keyboardType="numeric"
        value={phone_number}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleNewChat}
        disabled={isProcessing || !isValidPhoneNumber}
        style={[
          styles.chatButton,
          {
            backgroundColor:
              isProcessing || !isValidPhoneNumber ? '#7cad7c' : '#398138',
          },
        ]}>
        <Text style={styles.buttonText}>
          {isProcessing ? 'Memproses...' : 'Chat'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  text: {
    fontSize: 20,
  },
  marginBottom: {
    marginBottom: 5,
  },
  lightText: {
    marginEnd: 10,
    fontWeight: '300',
  },
  whiteText: {
    color: 'white',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappBadge: {
    backgroundColor: '#398138',
    marginEnd: 10,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  switchContainer: {
    flexDirection: 'column',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    marginTop: 20,
    width: '90%',
    borderColor: '#3e863d',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  chatButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default NewChat;
