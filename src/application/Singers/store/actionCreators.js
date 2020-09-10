import {
    getHotSingerListRequest,
    getSingerListRequest
  } from "../../../api/request";
  import {
    CHANGE_SINGER_LIST,
    CHANGE_CATOGORY,
    CHANGE_ALPHA,
    CHANGE_PAGE_COUNT,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING,
    CHANGE_ENTER_LOADING
  } from './constants';
  import {
    fromJS
  } from 'immutable';
  
  
  const changeSingerList = (data) => ({
    type: CHANGE_SINGER_LIST,
    data: data
  });
  
  export const changePageCount = (data) => ({
    type: CHANGE_PAGE_COUNT,
    data
  });
  
  //进场loading
  export const changeEnterLoading = (data) => ({
    type: CHANGE_ENTER_LOADING,
    data
  });
  
  //滑动最底部loading
  export const changePullUpLoading = (data) => ({
    type: CHANGE_PULLUP_LOADING,
    data
  });
  
  //顶部下拉刷新loading
  export const changePullDownLoading = (data) => ({
    type: CHANGE_PULLDOWN_LOADING,
    data
  });
  
  //第一次加载热门歌手
  export const getHotSingerList = () => {
    return (dispatch) => {
      getHotSingerListRequest(0).then(res => {
        const data = res.artists;
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullDownLoading(false));
      }).catch(() => {
        console.log('热门歌手数据获取失败');
      })
    }
  };

  export const getSingerList = (type, area, alpha, count=0) => {
    return (dispatch, getState) => {
      getSingerListRequest(type, area, alpha, count).then(res => {
        let data = []
        if (count === 0) {
          data = res.artists
        } else {
          const oldData = getState().getIn(['singers', 'singerList'])
          data = [...oldData, ...res.artists]
        }
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullUpLoading(false));
        dispatch(changePullDownLoading(false));
      }).catch(() => {
        console.log('歌手数据获取失败');
      });
    }
  };
  