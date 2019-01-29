import React from 'react'
import ReactDOM from 'react-dom'
import Counter2 from './components/Counter2.js'
import Todo2 from './components/Todo2.js'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

const reducer = (state = {number: 0, list: []}, action) => {
  if (action === undefined) return state // ! redux内部 默认会初始化一次 dispatch() 无参数的  即action为undefined
  switch(action.type) {
    case INCREASE:
      return {...state,number: state.number + action.amount} // number会对state里的覆盖
      //return {number: state.number + action.amount,list: state.list}
    case DECREASE:
      return {...state,number: state.number - action.amount}
      //return {number: state.number - action.amount,list: state.list}
    case 'addList':
      return {...state,list: action.list}
      //return {list: action.list,number: state.number}
    case 'deleItem':
      return {...state,list: action.list}
    default:
      return state
  }
}
let store = createStore(reducer)

class Num extends React.Component{
  render() {
    return (
      <div>{this.props.number}</div>
    )
  }
}
let mapStateToProps = (state) => {
  return {
    number: state.number
  }
}
const NewNum = connect(mapStateToProps)(Num)

ReactDOM.render(<div>
    <Provider store={store}>
      <Counter2 />
      <NewNum />
      <Todo2 />
    </Provider>
  </div>, document.getElementById('root'))

