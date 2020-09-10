import React, {useState, useEffect} from 'react'
import Horizen from '../../baseUI/Horizen-item'
import { categoryTypes, areaTypes, alphaTypes } from '../../api/config';
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem,
} from "./style";
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount,
  changePullUpLoading, 
  changePullDownLoading,
} from './store/actionCreators';
import  LazyLoad, {forceCheck} from 'react-lazyload';
import Scroll from './../../baseUI/Scroller';
import {connect} from 'react-redux';
import Loading from '../../components/Loading/index';

function Singers (props) {

    let [category, setCategory] = useState ('');
    let [alpha, setAlpha] = useState ('');
    let [area, setArea] = useState ('');


    const handlePullUp = () => {
        pullUpRefreshDispatch(category, area, alpha, pageCount)
    };

    const handlePullDown = () => {
        pullDownRefreshDispatch(category, area, alpha, pageCount);
    };
    
    const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;
    const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;
    let handleUpdateAlpha = (val) => {
        setAlpha(val);
        updateDispatch(category, area, val, pageCount);
    };
      
    let handleUpdateCatetory = (val) => {
        setCategory(val);
        updateDispatch(val, area, alpha, pageCount);
    };

    let handleUpdateArea = (val) => {
        setArea(val)
        updateDispatch(category, val, alpha, pageCount);
    }

    useEffect(() => {
        getHotSingerDispatch();
      }, []);

    const renderSingerList = () => {
        return (
        <List>
            {
            singerList.map ((item, index) => {
                return (
                    <ListItem key={item.accountId+""+index}>
                        <div className="img_wrapper">
                        <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music"/>}>
                            <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                        </LazyLoad>
                        </div>
                        <span className="name">{item.name}</span>
                    </ListItem>
                )
            })
            }
        </List>
        )
    };
  return (
      <div>
        <NavContainer>
            <Horizen list={categoryTypes} title={"分类:"} handleClick={(val) => handleUpdateCatetory(val)} oldVal={category}></Horizen>
            <Horizen list={areaTypes} title={"国家:"} handleClick={(val) => handleUpdateArea(val)} oldVal={area}></Horizen>
            <Horizen list={alphaTypes} title={"首字母:"} handleClick={val => handleUpdateAlpha(val)} oldVal={alpha}></Horizen>
        </NavContainer> 
        <ListContainer>
            <Scroll
            refresh
            pullUp={ handlePullUp }
            pullDown = { handlePullDown }
            pullUpLoading = { pullUpLoading }
            pullDownLoading = { pullDownLoading }
            onScroll={forceCheck}
            >
            { renderSingerList() }
            </Scroll>
            {
              enterLoading && <Loading></Loading>
            }
        </ListContainer>
      </div>
  )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
  });
  const mapDispatchToProps = (dispatch) => {
    return {
      getHotSingerDispatch() {
        dispatch(changeEnterLoading(true));
        dispatch(getHotSingerList());
      },
      updateDispatch(category, area, alpha, count) {
        dispatch(changePageCount(0));
        dispatch(changeEnterLoading(true));
        dispatch(getSingerList(category, area, alpha, count));
      },
      // 滑到最底部刷新部分的处理
      pullUpRefreshDispatch(category, area, alpha, count) {
        dispatch(changePullUpLoading(true));
        dispatch(changePageCount(count+1));
        dispatch(getSingerList(category, area, alpha, count));
      },
      //顶部下拉刷新
      pullDownRefreshDispatch(category, area, alpha, count) {
        dispatch(changePullDownLoading(true))
        dispatch(changePageCount(0));
        dispatch(changeEnterLoading(true));
        dispatch(getSingerList(category, area, alpha, count));
      }
    }
  };   

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))