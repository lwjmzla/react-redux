import {createStore} from 'redux'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'
// !reducer多的话  可以拆分
const reducers = {
  counter: (state = {number: 0}, action) => {
    if (action === undefined) return state // ! redux内部 默认会初始化一次 dispatch() 无参数的  即action为undefined
    switch(action.type) {
      case INCREASE:
        return {number: state.number + action.amount}
      case DECREASE:
        return {number: state.number - action.amount}
      default:
        return state
    }
  },
  todo: (state = {list: []}, action) => {
    if (action === undefined) return state // ! redux内部 默认会初始化一次 dispatch() 无参数的  即action为undefined
    switch(action.type) {
      case 'addList':
        return {list: action.list}
      case 'deleItem':
        return {list: action.list}
      default:
        return state
    }
  }
}

const combineReducers = (reducers) => {
  // !返回一个reducer
  return (state={}, action) => {
    let newState = {} // !要得到这类型的数据  {counter:{number:0},todo:{list:[]}   最终的state数据格式也是这样
    for (var key in reducers) { // ! reducers[key]  这个是 具体的  reducer counter或todo   state = reducer(state, action)   action的值是外面传过来的  //{type: 'deleItem',list: list}
      newState[key] = reducers[key](state[key], action)
    }
    return newState
  }
}

const reducer = combineReducers(reducers)

let store = createStore(reducer)  // ! redux内部 默认会初始化一次 dispatch() 无参数的  即action为undefined

export default store