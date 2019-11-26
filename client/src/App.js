import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table
} from 'reactstrap';



class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      id: '',
      cats: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  getAllCats = () => {
    axios
      .get('/getallcats')
      .then(result => {
        this.setState({ cats: result.data });
        console.log("abc");
        console.log(this.state.cats);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllCats();
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });
    //console.log(this.state.title);

    const query = `/getcat?id=${this.state.id}`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log("hello");
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getAllCats();
      })
      .catch(error => {
        alert('Error: ', error);
      });
    //const data = this.state.cats;
    //this.setState({ cats: this.state.cats.reverse() });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeCat(id) {
    this.setState({
      cats: this.state.cats.filter(cat => {
        if (cat.id !== id) return cat;
      })
    });
    const query = `/deletecat?id=${id}`;
    axios
      .get(query)
      .then(result => {
        this.getAllCats();
      })
      .catch(error => {
        alert('Error ', error);
      });
  }

  popup() {
    
    const query = `/factpopup`;
    axios
      .get(query)
      .then(result => {
        var text = result.data;
        console.log(text);
        alert(text);
        
      })
      .catch(error => {
        alert('Error ', error);
      });
  }

  
  render() {
    return (
      <div className="App">
        <Jumbotron style={{backgroundColor:"lightblue"}}>
          <h1 className="display-3">Cats Searcher</h1>
          <p className="lead">An Api to Search Cats</p>
          
        </Jumbotron>
        
        <Container style={{backgroundColor:"lightgrey"}}>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Cat not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="id">Search for cats </Label>
                  <Input
                    type="text"
                    name="id"
                    id="id"
                    placeholder="Enter a cat type name..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Submit</Button>
                <button class="ml-4 btn btn-warning" type ="button" onClick={() => {
                this.popup();
                          }}>Show a fact!</button>
                <p />
              </Form>
              
            </Col>
          </Row>
          <Row>
            <Table>
              <thead>
                <tr>
                  
                  <th>Type Name</th>
                  <th>Picture</th>
                  <th>Description</th>
                  <th>Alternate Name</th>
                  <th>Life Spans</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.cats.map(cat => {
                  return (
                    <tr>
                     
                      <td>{cat.name}</td>
                      <td>
                        <img width="200px" height="200px" src={cat.url} />
                      </td>
                      <td>{cat.description}</td>
                      <td>{cat.alt_names}</td>
                      <td>{cat.life_span}</td>
                     
                      <td>
                        <button
                          onClick={() => {
                            this.removeCat(cat.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
