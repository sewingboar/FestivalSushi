import React, { Component } from "react";
import { connect } from "react-redux";
import "./category-list.scss";
import { MobileView } from "react-device-detect";
import CategoryListItem from "../category-list-item";
import withSushiStoreService from "../../../hoc/with-sushi-store-service";
import { categoriesLoaded, categoryWasSelected, } from "../../../../actions";
import classNames from "classnames";

class CategoryList extends Component {

   
  constructor() {
    super();
    this.state = {
      dnone: true
    };
    this.addClass = this.addClass.bind(this);
    // this.renderCartItems = this.renderCartItems.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }

  addClass() {
    this.setState({
      dnone: true
    });
  }

  removeClass() {
    this.setState({
      dnone: false
    });
  }

  renderCategories = item => (
    <CategoryListItem
      {...item}
      key={item.id}
      onSelect={() => this.props.categoryWasSelected(item.id)}
      filteredProducts={this.props.selectedCategories}
      sushiStoreService={this.props.sushiStoreService}
    />
  );

  componentDidMount() {
    const { sushiStoreService, categoriesLoaded } = this.props;

    sushiStoreService
      .getProductCategories()
      .then(categories => categoriesLoaded(categories));
  }

  render() {
    return (<>
      <div className={classNames("categories__working--h", {
        dnone:this.props.displayProducts
      })}>Графік роботы: 10:00-22:00</div>
      <section className={classNames("categories", {
        dnone: !this.props.displayProducts
      })}>
        <MobileView>
          <img
            className="categories__header--image"
            src="img/logo_store.png"
            alt=""
          />
        </MobileView>
        <ul className="category__list">
          {this.props.categoriesList.map(this.renderCategories)}
        </ul>
      </section>
      </>
    );
  }
}

const mapStateToProps = ({ selectedCategories, categories, displayProducts }) => {
  return {
    categoriesList: categories,
    displayProducts: displayProducts,
    selectedCategories: selectedCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    categoriesLoaded: categories => dispatch(categoriesLoaded(categories)),
    categoryWasSelected: categoryId => dispatch(categoryWasSelected(categoryId))
  };
};

export default withSushiStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(CategoryList)
);
