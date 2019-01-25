import {createStore} from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
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
        <p id="counter">{store.getState().number}</p>
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
let render = () => {
  ReactDOM.render(<Counter />, document.getElementById('root'))
}

store.subscribe(render) //! 在监听列表  添加了监听者， 当触发dispatch，state更改（即数据更改了），然后监听者触发视图更新--render()
render() // !初始化   dispatch()    (action === undefined)   return  {number: 0}

