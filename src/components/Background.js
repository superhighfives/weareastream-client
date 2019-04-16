import React, { Component } from 'react'
import styled from 'styled-components'
import PlayStates from '../utils/PlayStates'

const Backing = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1;
`

const GIF_URL = `${process.env.PUBLIC_URL}/assets/images/loop.gif`

class Background extends Component {
  state = { ready: false }

  componentDidMount() {
    this.image = new window.Image()
    this.image.onload = () => {
      this.setState({ ready: true })
    }
    this.image.src = GIF_URL
  }

  render() {
    const playing = this.props.status === PlayStates.PLAYING
    const { ready } = this.state
    const url = playing && ready ? GIF_URL : ''
    return <Backing style={{ backgroundImage: `url('${url}')` }} />
  }
}

export default Background
