import {List} from '../../models';
import {SET_LIST, SET_LOADING_LIST} from '../../redux/features/listSlice';
import {DataStore} from 'aws-amplify';

export const getLists = currentUser => async (dispatch, state) => {
  try {
    dispatch(SET_LOADING_LIST());
    const lists = await DataStore.query(List, l => l.owner('eq', currentUser));
    // console.log(lists);
    const l = lists.map(l => {
      return {
        createdAt: l.createdAt,
        id: l.id,
        listColor: l.listColor,
        listName: l.listName,
        owner: l.owner,
        ownerId: l.ownerId,
        updatedAt: l.updatedAt,
        _lastChangedAt: 1659635832211,
      };
    });
    dispatch(SET_LIST(l));
    dispatch(SET_LOADING_LIST());
  } catch (error) {
    console.log('Error retrieving posts', error);
  }
};
