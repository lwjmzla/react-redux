import {createStore} from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      number: store.getState().number
    }
  }
  componentWillMount() {
    // ! 监听列表  添加了监听者， 当触发dispatch，state更改（即数据更改了），然后监听者触发视图更新--就是当前的 匿名函数 执行  更新视图
    this.unsubscribe = store.subscribe(() => { // !react + redux的数据改变机制就是：store的state改了 触发 监听者  执行 就是当前的 匿名函数 执行 然后 setState 动态更新react视图
      this.setState({
        number: store.getState().number
      })
    })
    // !  this.unsubscribe 是一个方法，当执行的时候  就会取消 该 监听者
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  increase = (ev) => {
    store.dispatch({type: INCREASE,amount: 3})
  }
  decrease = (ev) => {
    store.dispatch({type: DECREASE,amount: 2})
  }
  render() {
    return (
      <div>
        <p id="counter">{this.state.number}</p>
        <button id="increaseBtn" onClick={this.increase}>+</button>
        <button id="decreaseBtn" onClick={this.decrease}>-</button>
      </div>
    )
  }
}

let reducer = (state = {number: 0}, action) => {
  if (action === undefined) return state // ! redux内部 默认会初始化一次 dispatch() 无参数的  即action为undefined
  switch(action.type) {
    case INCREASE:
      return {number: state.number + action.amount}
    case DECREASE:
      return {number: state.number - action.amount}
    default:
      return state
  }
}
let store = createStore(reducer)  // ! redux内部 默认会初始化一次 dispatch() 无参数的  即action为undefined

ReactDOM.render(<Counter />, document.getElementById('root'))

