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
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`

const Player = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  &.loading {
    opacity: 0.5;
    div::after {
      padding-left: 0.25rem;
      font-family: monospace;
      content: '···';
      animation: ${loading} 2s linear infinite;
    }
    cursor: default;
  }
  &.playing {
    display: none;
  }
`

const Button = styled.a`
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  border-radius: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 0;
  transition: opacity 0.2s, border 0.3s;
  box-sizing: content-box;

  &:hover,
  &:active {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    border: 2px solid rgba(0, 0, 0, 0.1);
  }

  img {
    border-radius: 100%;
    width: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 100%;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    animation: ${pulsate} 5s ease-in-out infinite;
  }
`

const Status = styled.div`
  font-size: 1.25rem;
`

class Stream extends React.Component {
  state = { status: PlayStates.PAUSED }

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
      <Player className={this.state.status.toLowerCase()}>
        {this.state.status === PlayStates.PAUSED && (
          <Button href="#" onClick={this.play}>
            <img alt="St ream 'We Are a Team'" src={Logo} />
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
