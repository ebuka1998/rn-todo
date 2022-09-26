import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NewListButton from '../components/homeComponent/NewListButton';
import ListItemComponent from '../components/homeComponent/ListItemComponent';
import {useTheme} from '@react-navigation/native';
import {DataStore} from 'aws-amplify';
import {List} from '../models';
import Loading from '../components/homeComponent/Loading';
import {getLists} from '../utils/functions/listFunctions';
import {ADD_TO_LIST} from '../redux/features/listSlice';
import EmptyImage from '../components/homeComponent/EmptyImage';

const HomeScreen = ({navigation}) => {
  const {user} = useSelector(store => store.user);
  const {lists, isLoadingLists} = useSelector(store => store.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists(user.user.email));
  }, []);

  useEffect(() => {
    const subscription = DataStore.observe(List).subscribe(msg => {
      const listData = {
        createdAt: msg.element.createdAt,
        listName: msg.element.listName,
        listColor: msg.element.listColor,
        id: msg.element.id,
        owner: msg.element.owner,
        ownerId: msg.element.ownerId,
        updatedAt: msg.element.updatedAt,
      };
      dispatch(ADD_TO_LIST(listData));
    });

    return function cleanup() {
      subscription.unsubscribe();
    };
  });

  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <Pressable
          style={styles.textContainer}
          onPress={() => navigation.navigate('Important')}
          android_ripple={{color: colors.card, foreground: true}}>
          <AntDesign size={20} color="#DC143C" name="star" />
          <Text style={[styles.textStyle, {color: colors.text}]}>
            Important Tasks
          </Text>
        </Pressable>
      </View>
      <NewListButton
        goToDetailList={() =>
          navigation.navigate('ListDetail', {
            isCreating: true,
            listTitle: 'Untitled List',
            listId: '',
          })
        }
      />
      {isLoadingLists ? (
        <Loading color={'#0096FF'} />
      ) : (
        <FlatList
          data={lists}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <ListItemComponent
                listColor={item.listColor}
                listName={item.listName}
                goToDetail={() =>
                  navigation.navigate('ListDetail', {
                    isCreating: false,
                    listTitle: item.listName,
                    listId: item.id,
                    color: item.listColor,
                  })
                }
              />
            );
          }}
          key={'#'}
          keyExtractor={item => item.id}
          style={{marginBottom: 10, marginTop: 5}}
          ListEmptyComponent={() => (
            <EmptyImage
              image={require('../images/list.png')}
              firstText="Lists go in here"
              secondText="Try creating lists to organize your tasks"
              color="#0096FF"
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    paddingLeft: 10,
  },
  homeHeader: {
    width: '100%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 20,
  },
  textContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 30,
  },
});
export default HomeScreen;
//https://c6dzxsdivrfp3eay26fjun3laq.appsync-api.eu-west-1.amazonaws.com/graphql

//da2-vezsczmg3fcddflcfijii4scva
// https://c6dzxsdivrfp3eay26fjun3laq.appsync-api.eu-west-1.amazonaws.com/graphql
