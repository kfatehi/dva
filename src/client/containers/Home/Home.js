import { Component } from 'react'
import styles from './Home.css'

class Home extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={styles.home}>
        <div className={styles.list}>
          Hi
        </div>
      </div>
    )
  }
}
