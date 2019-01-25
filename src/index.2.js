import {createStore} from 'redux'
import $ from 'jquery'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'
$(document.body).append(`
  <p id="counter"></p>
  <button id="increaseBtn">+</button>
  <button id="decreaseBtn">-</button>
  <div id="div"></div>
`)

let reducer = (state = {number: 0, num: 0}, action) => {
  if (action === undefined) return state // ! redux内部 默认会初始化一次 dispatch() 无参数的  即action为undefined
  switch(action.type) {
    case INCREASE:
      return {number: state.number + action.amount, num: state.num}
    case DECREASE:
      return {number: state.number - action.amount, num: state.num}
    case 'ADD':
      return {number: state.number, num: state.num + 1}
    default:
      return state
  }
}
let store = createStore(reducer)  // ! redux内部 默认会初始化一次 dispatch() 无参数的  即action为undefined
let render = () => {
  $('#counter').html(store.getState().number)
}
let render1 = () => {
  $('#div').html(store.getState().num)
}

store.subscribe(render) //! 在监听列表  添加了监听者， 当触发dispatch，state更改（即数据更改了），然后监听者触发视图更新--render()
store.subscribe(render1)
$('#increaseBtn').click(function() {
  store.dispatch({type: INCREASE,amount: 3})
})
$('#decreaseBtn').click(function() {
  store.dispatch({type: DECREASE,amount: 2})
})
$('#div').click(function() {
  store.dispatch({type: 'ADD'})
})
render() // !初始化   dispatch()    (action === undefined)   return  {number: 0}
render1()