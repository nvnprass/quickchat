import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
  Linking,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const dataDummyWhatsapp = [
  {
    id: '001',
    name: 'Pras',
    number: '6285814848006',
    time: '04/11/2025 20:13:00',
  },
  {
    id: '002',
    name: 'Pras',
    number: '6281314758006',
    time: '04/11/2025 23:13:00',
  },
  {
    id: '003',
    name: '',
    number: '62878628818016',
    time: '04/11/2025 21:13:00',
  },
  {
    id: '004',
    name: '',
    number: '6285714848096',
    time: '04/11/2025 20:13:00',
  },
  {
    id: '005',
    name: 'Andini',
    number: '6285714848096',
    time: '04/11/2025 20:13:00',
  },
  {
    id: 'Septi',
    name: 'Pras',
    number: '6285714848096',
    time: '04/11/2025 20:13:00',
  },
  {
    id: '007',
    name: 'Kirana',
    number: '6285714848096',
    time: '04/11/2025 20:13:00',
  },
  {
    id: '008',
    name: 'Dwi',
    number: '6285714848096',
    time: '04/11/2025 20:13:00',
  },
];

const waChatUrl = 'https://wa.me/';

const Home = () => {
  const [dataWhatsapp, setDataWhatsapp] = React.useState(dataDummyWhatsapp);
  const [search, setSearch] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const navigation = useNavigation();

  const handleHapusWhatsapp = id => {
    const index = dataWhatsapp.findIndex(wa => wa.id === id);
    const dataWhatsappBaru = dataWhatsapp;
    dataWhatsappBaru.splice(index, 1);
    setDataWhatsapp([...dataWhatsappBaru]);
  };

  const handleSearchable = () => {
    setSearch(prev => !prev);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#3e863d'} barStyle={'light-content'} />
      <View
        style={{
          paddingLeft: 10,
          paddingVertical: 10,
          backgroundColor: '#3e863d',
          elevation: 1,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          flexDirection: 'row',
        }}>
        {search ? (
          <View style={{flex: 1, marginEnd: 10, flexDirection: 'row'}}>
            <View style={{flex: 8, marginEnd: 0}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 5,
                  elevation: 3,
                  paddingLeft: 5,
                }}
                placeholder="Search anything"
                value={searchInput}
                onChange={text => setSearchInput(text)}
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0366d6',
                  paddingHorizontal: 7,
                  paddingVertical: 0,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: 'white',
                }}>
                <Text style={{color: 'white', fontSize: 28, fontWeight: '500'}}>
                  ⌕
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={handleSearchable}
                style={{
                  backgroundColor: '#e33d2f',
                  padding: 5,
                  borderRadius: 5,
                  elevation: 2,
                  paddingHorizontal: 7,
                  borderWidth: 1,
                  borderColor: 'white',
                }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View style={{flex: 5}}>
              <Text style={{color: 'white', fontSize: 16}}>
                WhatsApp QuickChat
              </Text>
              <View
                style={{
                  display: 'inline',
                  backgroundColor: '#ffffff',
                  width: '20%',
                  paddingVertical: 1,
                  marginTop: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                }}>
                <Text style={{color: '#3a8139', fontWeight: '600'}}>
                  History
                </Text>
              </View>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={handleSearchable}>
                <Text style={{color: 'white', fontSize: 32}}>⌕</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={{flex: 1}}>
        {dataWhatsapp.length > 0 ? (
          <FlatList
            data={dataWhatsapp}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    backgroundColor: '#e1e4e8',
                    padding: 15,
                    marginTop: 7,
                    marginHorizontal: 7,
                    borderRadius: 5,
                    flexDirection: 'row',
                    elevation: 1,
                  }}>
                  <View style={{flex: 6}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#3a8139',
                      }}>
                      [ {item.name ? item.name : ' - '} ]
                    </Text>
                    <Text
                      style={{
                        color: '#3a8139',
                        fontSize: 16,
                        fontWeight: '700',
                      }}>
                      {item.number}
                    </Text>
                    <Text style={{fontSize: 10}}>⏲ {item.time}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`${waChatUrl}${item.number}`);
                    }}
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 16}}>💬</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Confirm',
                        'Are you sure for delete this ❓',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => {},
                          },
                          {
                            text: 'Yes, Delete it',
                            onPress: () => {
                              handleHapusWhatsapp(item.id);
                            },
                          },
                        ],
                      );
                    }}
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Text>❌</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <Text style={{textAlign: 'center', marginVertical: '70%'}}>
            There is no history of WhatsApp chats.
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NewChat');
        }}
        style={{
          backgroundColor: '#3e863d',
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 25,
          position: 'absolute',
          bottom: 40,
          right: 20,
          elevation: 3,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
