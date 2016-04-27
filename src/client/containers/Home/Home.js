import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from './Home.css'
import { Link } from 'react-router'

let fetchPackages = function() {
  
  console.log('wtf');
}

class Home extends Component {

  static fetchData({ params, store, url }) {
    return store.dispatch( fetchPackages(url) )
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.dispatch(fetchPackages(location.origin))
  }

  render () {

    const { stuff } = this.props
    let packages = null

    loader = null

    packages = (
      stuff.map(function (p) { 
        return (
          <li key={p.id}>
            <Link to={`/package/${p.id}/${p.name}`}>
              <p className={styles.name}>{p.name}</p>
            </Link>
          </li>
        )
      })
    )

    return (
      <div className={styles.home}>
        <div className={styles.list}>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { 
    stuff: state.stuff || [{
      id: "id",
      name: "name"
    }]
  }
}

export default connect(mapStateToProps)(Home)
