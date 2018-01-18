import React, { Component } from 'react';
import './App.css';
import roles, { role } from './story/roles'
import playList from './story/playList'
import appreciates from './assets/appreciates.jpg'

class App extends Component {
  state = {
    current: 0,
    chatList: [playList[0]],
    showAppreciates: false,
    end: false,
  }

  render() {
    const { chatList, showAppreciates, end } = this.state
    const appreciatesCode = (
      <div className="appreciates">
        <img src={appreciates} />
        <p>祝您开心每一天~~</p>
      </div>
    )
    const chatListView = (
      <div>
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
      </div>
    )

    const starView = (
      <span className="star">{end ? '赏作者杯☕️' : '✦'}</span>
    )
    const backView = (
      <span className="star">再看一次</span>
    )

    return (
      <div className="App">
        <ul className="chatList">
          {
            showAppreciates ? appreciatesCode : chatListView
          }
        </ul>
        <div className="bottomPad" onClick={this.next}>
          {
            showAppreciates ? backView : starView
          }
        </div>
      </div>
    );
  }

  next = () => {
    let { current, chatList, end, showAppreciates } = this.state
    const newCurrent = current + 1
    if (newCurrent < playList.length) {
      const addPlay = playList[newCurrent]
      chatList.push(addPlay)
      this.setState({
        current: newCurrent,
      })
    } else {
      if (end) {
        if (showAppreciates) {
          this.setState({
            showAppreciates: false,
            current: 0,
            end: false,
            chatList: [playList[0]],
          })
        } else {
          this.setState({showAppreciates: true})
        }
      } else {
        this.setState({
          end: true,
        })
      }
    }
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
