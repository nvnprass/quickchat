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
  RefreshControl,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import ChatService from '../database/ChatService';

SQLite.enablePromise(true);

const waChatUrl = 'https://wa.me/';

const Home = () => {
  const [dataWhatsapp, setDataWhatsapp] = React.useState([]);
  const [search, setSearch] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  // get all chats
  const loadChats = () => {
    setLoading(true);
    ChatService.getChats()
      .then(data => {
        setDataWhatsapp(data);
        setLoading(false);
      })
      .catch(error => {
        Alert.alert(error.toString());
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleHapusWhatsapp = async id => {
    try {
      await ChatService.deleteChat(id);
      if (search) {
        handleSearchChat(searchInput);
      } else {
        loadChats();
      }
    } catch (error) {
      Alert.alert(error.toString());
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchable = () => {
    setSearch(prev => !prev);
    loadChats();
  };

  const handleSearchChat = search => {
    setLoading(true);
    ChatService.searchChat(search)
      .then(data => {
        setDataWhatsapp(data);
        setLoading(false);
      })
      .catch(error => {
        Alert.alert(error.toString());
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      loadChats();
    }, []),
  );

  React.useEffect(() => {
    if (!search) {
      setSearchInput('');
    }
  }, [search]);

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
                onChangeText={text => setSearchInput(text)}
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  handleSearchChat(searchInput);
                }}
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
        {loading ? (
          <Text style={{textAlign: 'center', marginVertical: '70%'}}>
            Loading...
          </Text>
        ) : dataWhatsapp.length > 0 ? (
          <FlatList
            data={dataWhatsapp}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={loadChats} />
            }
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
                        fontSize: 14,
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
                      {item.phone_number}
                    </Text>
                    <Text style={{fontSize: 12}}>🕒 {item.chated_at}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`${waChatUrl}${item.phone_number}`);
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
