import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      console.log(response.data);
      const categories = response.data.map((product) => product.category);
      let uniqueCategories = [...new Set(categories)];
      console.log(uniqueCategories);
      setCategories(uniqueCategories);
      setProducts(response.data);
    });
  }, []);
  const handleCategoryClick = (category) => () => {
    console.log(category);
    const filteredProducts = products.filter((product) => {
      return product.category === category;
    });
    console.log(filteredProducts);
    setProductsByCategory(filteredProducts);
  };

  const handleCategorySearch = (event) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  const filteredCategories = categories.filter((category) => {
    return category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h2 className="text-center">Products Dashboard</h2>
          <p className="text-muted text-center mb-4">
            Browse through our list of Grocery products
          </p>
        </div>
        <div className="col-md-3 mt-3">
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={handleCategorySearch}
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="row">
        {filteredCategories.map((category) => {
          return (
            <div className="col-md-2">
              <div className="card mb-3">
                <img
                  src={`https://source.unsplash.com/1600x900/?${category}`}
                  className="card-img-top"
                  alt={category}
                />
                <div className="card-body">
                  <h5 className="card-title">{category}</h5>
                  <p className="card-text">
                    Browse through {category} products
                  </p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleCategoryClick(category)}
                  >
                    {" "}
                    View Products <i className="fa fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {productsByCategory.length > 0 && (
        <div className="row">
          <div className="col-md-12 text-center">
            <h2>Products By Category</h2>
            <p className="text-muted"> Browse through our list of products</p>
          </div>
          {productsByCategory.map((product) => (
            <div className="col-md-3">
              <div className="card mb-3">
                <img
                  src={`https://source.unsplash.com/1600x900/?${
                    product.image.split(".")[0]
                  }`}
                  className="card-img-top"
                  alt="Whole Wheat Bread"
                />
                <div className="card-body product-details">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fa fa-usd"></i> Price
                        </th>
                        <td>${product.price}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fa fa-list-alt"></i> Category
                        </th>
                        <td>{product.category}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fa fa-check-circle"></i> Available
                        </th>
                        <td>{product.available ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-primary">
                          <i className="fa fa-map-marker"></i> City
                        </th>
                        <td>{product.city}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="input-group mt-3">
                    <span className="input-group-btn">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={decreaseCount}
                      >
                        -
                      </button>
                    </span>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={count}
                      readOnly
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={increaseCount}
                      >
                        +
                      </button>
                    </span>
                  </div>
                  <div className="text-center mt-3">
                    <button className="btn btn-primary btn-sm">
                      <i className="fa fa-cart-plus"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
