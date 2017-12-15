const React = require('react')
const NetInfo = require('react-native').NetInfo

const withNetInfo = ComposedComponent =>
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isConnected: false,
      }
      this.handleIsConnected = this.handleIsConnected.bind(this)
    }

    componentDidMount() {
      NetInfo.isConnected.fetch().then(isConnected => {
        this.handleIsConnected(isConnected)
      })
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleIsConnected,
      )
    }

    componentWillUnmount() {
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this.handleIsConnected,
      )
    }

    handleIsConnected(isConnected) {
      this.setState({ isConnected })
    }

    render() {
      return React.createElement(
        ComposedComponent,
        Object.assign({}, this.props, { connection: this.state }),
      )
    }
  }

export default withNetInfo
