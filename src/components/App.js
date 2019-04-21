import React, { Component } from 'react'
import Stream from './Stream'
import Background from './Background'
import Globals from '../styles/Globals'
import PlayStates from '../utils/PlayStates'
import styled from 'styled-components'

const Status = styled.div`
  font-size: 1.25rem;
  opacity: 0.5;
`

class App extends Component {
  state = { status: PlayStates.PAUSED }

  updateStatus = status => {
    if (status !== this.state.status) {
      this.setState({ status: status })
    }
  }

  render() {
    return (
      <div className="App">
        <Globals />

        {process.env.REACT_APP_LAUNCH_STATUS === 'prelaunch' && (
          <Status>Wednesday, April 24</Status>
        )}

        {process.env.REACT_APP_LAUNCH_STATUS === 'live' && (
          <>
            <Background status={this.state.status} />
            <Stream updateStatus={this.updateStatus} />
          </>
        )}

        {process.env.REACT_APP_LAUNCH_STATUS === 'postlaunch' && (
          <Status>We Were a Team</Status>
        )}
      </div>
    )
  }
}

export default App
