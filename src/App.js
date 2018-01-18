import React, { Component } from 'react';
import './App.css';
import roles, { role } from './story/roles'
import playList from './story/playList'

class App extends Component {
  state = {
    current: 0,
    chatList: [playList[0]],
  }

  render() {
    const { chatList } = this.state

    return (
      <div className="App">
        <ul className="chatList">
          {
            chatList.map((c, idx) => {
              switch (c.roleID) {
                case 100:
                  return <Narrator content={c.content} key={idx} />
                case 101:
                case 102: {
                  const r = role(c.roleID)
                  return <Role position={r.position} name={r.name} avatar={r.avatar} message={c.content} key={idx}/>
                }
              }
            })
          }
        </ul>
        <div className="bottomPad" onClick={this.next}>
          <span className="star">✦</span>
        </div>
      </div>
    );
  }

  next = () => {
    let { current, chatList } = this.state
    const newCurrent = current + 1
    if (newCurrent < playList.length) {
      const addPlay = playList[newCurrent]
      chatList.push(addPlay)
    }

    this.setState({
      current: newCurrent,
    })
  }
}

const Narrator = (props) => (
  <li className="narrator">
    <p>{props.content}</p>
  </li>
)

const Role = (props) => (
  <li className={`role ${props.position}`}>
    <div className="avatar">
      <img src={props.avatar} />
    </div>
    <div className="roleMain">
      <div className={`roleName ${props.position}`}>{props.name}</div>
      <div className={`roleMessage ${props.position}`}>
        {
          props.position === 'left' ?
          <span className={`arrow ${props.position}`}>◀︎</span>
            :
          <span className={`arrow ${props.position}`}>▶︎</span>
        }
        <p>{props.message}</p>
      </div>
    </div>
  </li>
)

export default App;
