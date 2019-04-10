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

class Background extends Component {
  constructor() {
    super()
    this.state = { src: false }
  }
  componentDidMount() {
    this.image = new window.Image()
    this.image.onload = () => {
      this.setState({ src: this.image.src })
    }
  }

  componentDidUpdate() {
    if (this.props.status === PlayStates.PLAYING) {
      this.image.src = `${process.env.PUBLIC_URL}/assets/images/loop.gif`
    } else {
      if (this.state.src) this.setState({ src: '' })
    }
  }

  render() {
    return <Backing style={{ backgroundImage: `url(${this.state.src})` }} />
  }
}

export default Background
