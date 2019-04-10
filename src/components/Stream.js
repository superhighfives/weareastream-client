import React from 'react'
import styled, { keyframes } from 'styled-components'
import IconPlay from '../svg/icon-play.svg'
import PlayStates from '../utils/PlayStates'
import PlayMessages from '../utils/PlayMessages'
const STREAM_URL = 'http://127.0.0.1:3000/live.mp3'

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
}`

const Player = styled.a`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover,
  &.loading {
    opacity: 0.5;
  }

  &.loading {
    div::after {
      padding-left: 0.25rem;
      font-family: monospace;
      content: '';
      animation: ${loading} 2s linear infinite;
    }
    cursor: default;
    img {
      visibility: hidden;
    }
  }
`

const Button = styled.span`
  width: 3em;
  height: 3em;
  margin: 0 auto;

  img {
    width: 100%;
  }
`

const Status = styled.div`
  margin-top: 1rem;
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
        {this.state.status !== PlayStates.PLAYING && (
          <>
            <Button>
              <img alt="Play icon" src={IconPlay} />
            </Button>
            <Status>{PlayMessages.render(this.state.status)}</Status>
          </>
        )}
      </Player>
    )
  }
}

export default Stream
