import React, { useEffect } from 'react'
import { forceCheck } from 'react-lazyload'
import Slider from '../../components/Slider'
import Loading from '../../components/Loading/index';
import RecommendList from '../../components/List'
import Scroll from '../../baseUI/Scroller'
import * as actionTypes from './store/actionCreators'
import { connect } from 'react-redux'
import { Content } from './style'

const Recommend = (props) => {
    const { bannerList = [], recommendList = [], enterLoading } = props
    const { getBannerDataDispatch, getRecommendListDataDispatch } = props

    useEffect(() => {
        !bannerList.length && getBannerDataDispatch()
        !recommendList.length && getRecommendListDataDispatch()
    }, [])

    return (
        <Content>
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerList}></Slider>
                    <RecommendList recommendList={recommendList}></RecommendList> 
                </div>
            </Scroll>
            { enterLoading && <Loading></Loading> }
        </Content>
    )
}

const mapStateToProps = (state) => ({
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn (['recommend', 'enterLoading'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch: () => {
            dispatch(actionTypes.getBannerList())
        },
        getRecommendListDataDispatch: () => {
            dispatch(actionTypes.getRecommednList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))