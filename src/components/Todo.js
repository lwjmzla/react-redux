import React from 'react';
import store from '../redux/store.js'

export default class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      //number: store.getState().number
      list: store.getState().todo.list
    }
  }
  componentWillMount() {
    // ! 监听列表  添加了监听者， 当触发dispatch，state更改（即数据更改了），然后监听者触发视图更新--就是当前的 匿名函数 执行  更新视图
    this.unsubscribe = store.subscribe(() => { // !react + redux的数据改变机制就是：store的state改了 触发 监听者  执行 就是当前的 匿名函数 执行 然后 setState 动态更新react视图
      this.setState({
        list: store.getState().todo.list
      })
    })
    // !  this.unsubscribe 是一个方法，当执行的时候  就会取消 该 监听者
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  handleKeyDown = (ev) => {
    if (ev.keyCode === 13 && ev.target.value.length > 0) {
      let list = this.state.list
      list.push(ev.target.value)
      // this.setState(list)
      store.dispatch({type: 'addList',list: list})
      ev.target.value = ''
    }
  }
  handleDelete = (index, ev) => {
    let list = this.state.list
    list.splice(index, 1)
    store.dispatch({type: 'deleItem',list: list})
  }
  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <ul>
          {
            this.state.list.map((item, index) => {
              return <li key={index}>{item}<button onClick={(ev) => this.handleDelete(index, ev)}>删除</button></li>
            })
          }
        </ul>
      </div>
    )
  }
}