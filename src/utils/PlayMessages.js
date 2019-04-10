import PlayStates from './PlayStates'

class PlayMessages {
  static render(state) {
    if (state === PlayStates.PAUSED) {
      return 'We Are a Team'
    }
    if (state === PlayStates.LOADING) {
      return 'Joining team'
    }
  }
}

export default PlayMessages
