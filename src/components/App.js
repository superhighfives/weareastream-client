import React, { Component } from 'react'
import Stream from './Stream'
import Background from './Background'
import Globals from '../styles/Globals'
import PlayStates from '../utils/PlayStates'

class App extends Component {
  constructor() {
    super()
    this.state = { status: PlayStates.PAUSED }

    this.updateStatus = this.updateStatus.bind(this)
  }

  updateStatus(status) {
    if (status !== this.state.status) {
      this.setState({ status: status })
    }
  }

  render() {
    return (
      <div className="App">
        <Globals />
        <Background status={this.state.status} />
        <Stream updateStatus={this.updateStatus} />
      </div>
    )
  }
}

export default App
