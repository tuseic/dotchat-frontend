import React from 'react'
import axios from 'axios'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CommentsContainer from './CommentsContainer'
import {Toolbar, Fab, Typography} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

class RoomContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      isClose: true
    }
  }

  handleRoomClick = (room_id) => {
    if (this.state.isClose)  {
      axios.get(process.env.REACT_APP_SERVER_URL + "/rooms/" + room_id + "/comments")
        .then((result) => {
          this.setState({comments: result.data})
        })
        .catch((data) => {
          console.log(data)
        })
    } 
    this.setState({isClose: !this.state.isClose})
  }

  render() {
    return(
      <ExpansionPanel onClick={() => this.handleRoomClick(this.props.room.id)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Toolbar>
            <Fab color="secondary" size="small">
              <AddIcon />
            </Fab>
          </Toolbar>
          <Typography variant="h6" color="textPrimary" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{this.props.room.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CommentsContainer commentsData={this.state.comments}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default RoomContainer
