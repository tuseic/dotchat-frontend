import React from 'react'
import ColorPulletContainer from './ColorPulletContainer'
import {getColor} from './getColor'

class CampusContainer extends React.Component {
  constructor(props) {
    super(props)
    const row = 9
    const col = 9
    this.state = {
      color: '1',
      row: row,
      col: col,
      dots: Array(row * col).fill('0')
    }
  }
  

  handleclick = (i) => {
    const dots = this.state.dots.slice()
    dots[i] = this.state.color
    this.setState({dots: dots})
  }

  changeColor = (newColor) => {
    this.setState({color: newColor})
  }

  componentDidMount() {
    const text = this.state.dots.join('')
    this.props.updateText(text)
  }

  componentDidUpdate(_, prevState) {
    if (JSON.stringify(this.state.dots) !== JSON.stringify(prevState.dots)) {
      const text = this.state.dots.join('')
      this.props.updateText(text)
    }
  }

  render() {
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))
    const row = this.state.row
    const col = this.state.col

    return(
      <div>
        <ColorPulletContainer changeColor={this.changeColor}/>
        <div className="campus-table">
          {range(0, row-1, 1).map((j) => {
            return(
              <div className='campus-row' key={j}>
                {range(j * col, j * col + col -1, 1).map((i) => {
                  return(
                    <div
                      key={i}
                      className="dot"
                      style={{background: `${getColor(this.state.dots[i])}`}}
                      onClick={() => this.handleclick(i)}
                    >
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default CampusContainer
