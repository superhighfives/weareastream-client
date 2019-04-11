import React from 'react'
import styled, { keyframes } from 'styled-components'
import Logo from '../assets/images/sticker.png'
import PlayStates from '../utils/PlayStates'
import PlayMessages from '../utils/PlayMessages'
const STREAM_URL = `${process.env.REACT_APP_AUDIO_SERVER_URL}/live.mp3`

const loading = keyframes`
  0% {
    content: '•··';
  }
  25% {
    content: '·•·';
  }
  50% {
    content: '··•';
  }
  75% {
    content: '···';
  }
  100% {
    content: '•··';
  }
`

const pulsate = keyframes`
  50% {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`

const Player = styled.a`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.loading {
    opacity: 0.5;
    div::after {
      padding-left: 0.25rem;
      font-family: monospace;
      content: '';
      animation: ${loading} 2s linear infinite;
    }
    cursor: default;
  }
  &.playing {
    display: none;
  }
`

const Button = styled.span`
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  animation: ${pulsate} 5s infinite;

  img {
    width: 100%;
  }
`

const Status = styled.div`
  font-size: 1.25rem;
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

  render() {
    return (
      <Player onClick={this.play} className={this.state.status.toLowerCase()}>
        {this.state.status === PlayStates.PAUSED && (
          <Button>
            <img alt="Stream 'We Are a Team'" src={Logo} />
          </Button>
        )}
        {this.state.status === PlayStates.LOADING && (
          <Status>{PlayMessages.render(this.state.status)}</Status>
        )}
      </Player>
    )
  }
}

export default Stream
