import React, { Component } from "react";
import { Grommet, Box, TextInput } from "grommet";
import AppBar from "./components/AppBar";
import ProductList from "./components/ProductList";
import "./App.css";

class App extends Component {
  state = {
    query: ""
  };

  render() {
    return (
      <Grommet plain full>
        <Box direction="column" fill>
          <AppBar />
          <Box direction="row" pad="medium" fill>
            <Box width="medium">
              <TextInput
                onChange={e => this.setState({ query: e.target.value })}
              />
            </Box>
            <Box flex>
              <ProductList search={this.state.query} />
            </Box>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default App;
