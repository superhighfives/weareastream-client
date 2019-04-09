import React from 'react'
import styled from 'styled-components'
import IconPlay from '../svg/icon-play.svg'
import IconStop from '../svg/icon-stop.svg'
import Color from '../styles/Color'
import PlayStates from '../utils/PlayStates'
const STREAM_URL = 'http://127.0.0.1:3000/live.mp3'

const Player = styled.div`
  display: flex;
  align-items: center;
  ${props => props.loading && 'opacity: 0.25;'}
`

const Button = styled.a`
  display: block;
  background: none;
  border: none;
  color: ${Color.red};
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;

  img {
    width: 100;
  }
`

const Status = styled.div`
  position: absolute;
  margin-left: 3rem;
  pointer-events: none;
`

class Stream extends React.Component {
  constructor() {
    super()
    this.state = { status: PlayStates.PAUSED }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.status !== prevState.status) {
      this.props.updateStatus(this.state.status)
    }
  }

  play = () => {
    if (!this.audio) {
      this.setState({ status: PlayStates.LOADING })

      this.audio = new Audio(STREAM_URL)
      this.audio.play()
      this.audio.addEventListener('playing', () => {
        this.setState({ status: PlayStates.PLAYING })
      })
    }
  }

  pause = () => {
    if (this.audio) {
      this.setState({ status: PlayStates.PAUSED })
      this.audio.src = ''
      this.audio.pause()
      this.audio = null
    }
  }

  render() {
    return (
      <Player loading={this.state.status == PlayStates.LOADING}>
        <Status>{this.state.status}</Status>
        {this.state.status == PlayStates.PAUSED && (
          <Button onClick={this.play}>
            <img src={IconPlay} />
          </Button>
        )}
        {this.state.status == PlayStates.LOADING ||
        this.state.status == PlayStates.PLAYING ? (
          <Button onClick={this.pause}>
            <img src={IconStop} />
          </Button>
        ) : null}
      </Player>
    )
  }
}

export default Stream
