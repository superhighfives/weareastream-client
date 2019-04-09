import React from 'react'
import styled from 'styled-components'
import IconPlay from '../svg/icon-play.svg'
import IconStop from '../svg/icon-stop.svg'
import Color from '../styles/Color'
import PlayStates from '../utils/PlayStates'
import PlayMessages from '../utils/PlayMessages'
const STREAM_URL = 'http://127.0.0.1:3000/live.mp3'

const Player = styled.div`
  font-size: 5vw;
  margin: 2rem;
  &:hover {
    opacity: 0.25;
  }
  ${props => props.dim && 'opacity: 0.25 !important;'};
`

const Button = styled.a`
  display: block;
  background: none;
  border: none;
  color: ${Color.red};
  cursor: pointer;
  width: 1em;
  height: 1em;
  box-sizing: content-box;

  img {
    width: 100;
  }
`

const Status = styled.div`
  position: absolute;
  left: 1em;
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
      <Player
        dim={
          this.state.status === PlayStates.LOADING ||
          this.state.status === PlayStates.PLAYING
        }
      >
        <Status>{PlayMessages.render(this.state.status)}</Status>
        {this.state.status === PlayStates.PAUSED && (
          <Button onClick={this.play}>
            <img alt="Play icon" src={IconPlay} />
          </Button>
        )}
        {this.state.status === PlayStates.LOADING ||
        this.state.status === PlayStates.PLAYING ? (
          <Button onClick={this.pause}>
            <img alt="Stop icon" src={IconStop} />
          </Button>
        ) : null}
      </Player>
    )
  }
}

export default Stream
