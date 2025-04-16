import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
} from 'react-native';

const NewChat = () => {
  const [whatsappNumber, setWhatsappNumber] = React.useState('');
  const [withName, setWithName] = React.useState(false);
  const [whatsappName, setWhatsappName] = React.useState('');

  const startChat = () => {};

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={[styles.text, {marginBottom: 5}]}>Start</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.text, {marginEnd: 10, fontWeight: '300'}]}>
          New
        </Text>
        <View
          style={{
            backgroundColor: '#398138',
            marginEnd: 10,
            paddingHorizontal: 5,
            borderRadius: 2,
          }}>
          <Text style={[styles.text, {color: 'white'}]}>Whatsapp</Text>
        </View>
        <Text style={[styles.text, {fontWeight: '300'}]}>Chat</Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          marginTop: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16}}>Enter the name for history ?</Text>
        <Switch
          value={withName}
          onChange={() => {
            setWithName(prev => !prev);
          }}
        />
      </View>
      {withName && (
        <TextInput
          placeholder="Enter The Name"
          keyboardType="numeric"
          value={whatsappName}
          onChangeText={text => {
            setWhatsappName(text);
          }}
          style={{
            backgroundColor: 'white',
            marginTop: 20,
            width: '90%',
            borderColor: '#3e863d',
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 5,
          }}
        />
      )}

      <TextInput
        placeholder="Enter wa number with country code"
        keyboardType="numeric"
        value={whatsappNumber}
        onChangeText={text => {
          setWhatsappNumber(text);
        }}
        style={{
          backgroundColor: 'white',
          marginTop: 20,
          width: '90%',
          borderColor: '#3e863d',
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 5,
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#398138',
          marginTop: 15,
          paddingVertical: 7,
          paddingHorizontal: 20,
          borderRadius: 5,
          elevation: 3,
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 18,
          }}>
          Chat
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default NewChat;
