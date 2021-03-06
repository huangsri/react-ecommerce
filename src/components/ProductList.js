import React from "react";
import { Box } from "grommet";
import ProductItem from "./ProductItem";
import request from "../utils/request";

class ProductList extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.fetchData();
  }

  shouldComponentUpdate(nextProp, nextState) {
    // if (nextState.data !== this.state.data) {
    //   return true;
    // }
    // return false;
    return true;
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.search !== this.props.search) {
      this.fetchData(this.props.search);
    }
  }

  fetchData = async query => {
    let res;
    if (query && query.length > 0) {
      res = await request.get(
        `/products?filter=like(name,*${query}*)&include=main_image`
      );
    } else {
      res = await request.get("/products?include=main_image");
    }

    const data = res.data.data.map(item => {
      let image = "https://via.placeholder.com/300x400.png";
      if (item.relationships.main_image) {
        const fileId = item.relationships.main_image.data.id;
        const file = res.data.included.main_images.find(function(el) {
          return fileId === el.id;
        });
        image = file.link.href;
      }
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        image,
        price: item.meta.display_price.with_tax.formatted
      };
    });
    this.setState({
      data
    });
  };

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <Box direction="column" pad="small" fill>
        <Box pad="small" background="light-3">
          Product list
        </Box>
        <Box pad="small" direction="row" fill wrap overflow="auto">
          {data.map(product => (
            <ProductItem {...product} />
          ))}
        </Box>
      </Box>
    );
  }
}

export default ProductList;
