import React, { Component } from "react";
import "./collection.overview.style.scss";
import CollectionItem from "../collection.item/collection.item.component";
import { withRouter } from "react-router-dom";
import {} from "../../redux/shop/shop.actions";
import Loader from "../loader/loader.component";
import Button from "../button/button.component";

class CollectionOverview extends Component {
  state = {
    item: [],
    count: 1,
    totalPages: 0
  };

  componentDidMount() {
    const { items } = this.props;
    if (items) {
      let totalPages = Math.round(items.totalItems / 15);
      let filteredItems = items.data.filter((item, index) => index < 15);
      this.setState({
        ...this.state,
        item: [...filteredItems],
        totalPages: totalPages ? totalPages : 1
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { match, items } = this.props;
    if (match.params.category !== prevProps.match.params.category && items) {
      let totalPages = Math.round(items.totalItems / 15);
      let filteredItems = items.data.filter((item, index) => index < 15);
      this.setState({
        ...this.state,
        item: [...filteredItems],
        totalPages: totalPages ? totalPages : 1
      });
    }
  }

  nextPage = () => {
    const { items } = this.props;
    const { count } = this.state;
    let start = 15 * (count + 1);
    let end = start + 15;
    let filteredItems = items.data.filter(
      (item, index) => index > start && index < end
    );
    this.setState({
      ...this.state,
      item: [...filteredItems],
      count: this.state.count + 1
    });
  };

  previousPage = () => {
    const { items } = this.props;
    const { count } = this.state;
    let start = 15 * (count - 1);
    let end = start + 15;
    let filteredItems = items.data.filter(
      (item, index) => index > start && index < end
    );
    this.setState({
      ...this.state,
      item: [...filteredItems],
      count: this.state.count - 1
    });
  };

  render() {
    const { items, shop } = this.props;
    const header = shop.substring(0, 1).toUpperCase() + shop.substring(1);
    return items ? (
      <section className="CollectionOverview">
        <h1 className="CollectionOverviewHeader">{header}</h1>
        <div className="CollectionOverviewTop">
          {this.state.item.map(item => (
            <CollectionItem key={item._id} shop={shop} item={item} />
          ))}
        </div>
        <div className="CollectionOverviewBottom">
          <Button
            disable={this.state.count === 1}
            onClick={this.previousPage}
            style={{ width: "6rem", borderRadius: "2px", marginLeft: 0 }}
          >
            Previous
          </Button>
          <span className="PaginationInfo">
            Page {this.state.count} of{" "}
            {this.state.totalPages ? this.state.totalPages : 1}
          </span>
          <Button
            disable={this.state.count === this.state.totalPages}
            onClick={this.nextPage}
            style={{ width: "4rem", borderRadius: "2px", marginLeft: 0 }}
          >
            Next
          </Button>
        </div>
      </section>
    ) : (
      <Loader />
    );
  }
}

export default withRouter(CollectionOverview);
