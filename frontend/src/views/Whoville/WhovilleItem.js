import React, { Component } from 'react';
import { Card, CardBody, CardColumns, CardHeader, Row, Col, Container, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

//import libraryData from './LibraryData'

class WhovilleItem extends Component {

    constructor(props) {
        super(props)
        this.state = { libraryItem: {},
                        bundleId: ''
                        }
    }

    loadData() {
      
        fetch('http://localhost:4000/api/whoville/item/' + this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
              this.setState({libraryItem: data,
                            bundleId: this.props.match.params.id})
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.loadData()
    }

    deployWhoville = (e) => {
      
      fetch('http://localhost:4000/api/whoville/deploy/' + e.target.id)
          .then(response => response.json())
          .catch(err => console.error(this.props.url, err.toString()))
          this.props.history.push('dashboard')
    }
            


  render() {
      // Wait to render until data has been loaded
      if(this.state.libraryItem.name == undefined) {
          return(null)
      }
      else {
        return (
          <div className="animated fadeIn">
          <Row>
              <Col xs={6} md={4}>
                <div className="chart-wrapper" align="center" >
                  <p><img src={this.state.libraryItem.image}/></p>
                </div>
            </Col>
            <Col xs={12} md={8}>
            <Card>
            <CardHeader className="text-white bg-success">
            <h2>{this.state.libraryItem.name.toString()} Bundle</h2>
              </CardHeader>
              <CardBody >
                <div className="chart-wrapper" align="left">
                  <h2>Stack Version</h2>
                  <p>{this.state.libraryItem.version.toString()}</p>
                  <h2>Description</h2>
                  <p>{this.state.libraryItem.description.toString()}</p>
                </div>
              </CardBody>
            </Card>
            <Card>
            <CardHeader className="text-white bg-primary">
                <h2>Actions</h2>
              </CardHeader>
              <CardBody  className="text-white bg-white">
                <div className="chart-wrapper" align="middle">
                <table width="100%">
                  <tbody>
                  <tr>
                  <td align="center" width="33%">
                <Button size="lg" color="primary">
                      <i className="fa fa-download"></i>&nbsp;Download
                    </Button>
                    </td>
                    <td align="center" width="33%"> 
                    <Button id={this.state.bundleId} size="lg" color="primary" onClick={this.deployWhoville.bind(this)}>
                      <i className="fa fa-upload"></i>&nbsp;Deploy
                    </Button>
                    </td>
                    <td align="center" width="33%">
                    <Button size="lg" color="danger">
                      <i className="fa fa-remove"></i>&nbsp;Delete
                    </Button>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                </div>
              </CardBody>
            </Card>
            </Col>
            </Row>
        </div>
        )
      }
  }
}

export default WhovilleItem;
