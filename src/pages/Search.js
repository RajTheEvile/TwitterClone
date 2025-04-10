import { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000/user/search";

class Search extends Component {
  state = {
    searchWord: "",
    searchResults: [],
    loading: false,
    error: "",
  };

  searchChange = (event) => {
    this.setState({ searchWord: event.target.value });
  };

  handleSearch = async () => {
    const { searchWord } = this.state;

    if (searchWord.trim() === "") return; // Prevents unnecessary API calls

    this.setState({ loading: true, error: "", searchResults: [] });

    try {
      const token = Cookies.get("token"); // Assuming JWT token is stored
      const response = await fetch(`${API_URL}?username=${searchWord}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Search failed. Please try again.");

      const data = await response.json();
      this.setState({ searchResults: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message || "An error occurred", loading: false });
    }
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  };

  render() {
    const { searchWord, searchResults, loading, error } = this.state;
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="row w-100">
          <div className="col-md-3 col-lg-2 d-flex flex-column bg-light vh-100 p-3">
            <Menu />
          </div>
          <div className="col-md-9 col-lg-10 p-4 mt-5 ml-2"> 
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search users..."
                    value={searchWord}
                    onChange={this.searchChange}
                    onKeyPress={this.handleKeyPress}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSearch}
                    disabled={searchWord.trim() === ""}
                  >
                    <i className="fa fa-search"></i> Search
                  </button>
                </div>

                {loading && <p className="text-primary mt-3">Searching...</p>}
                {error && <p className="text-danger mt-3">{error}</p>}

                <ul className="list-group mt-3">
                  {searchResults.length === 0 && !loading && !error && (
                    <p className="text-muted">No users found</p>
                  )}
                  {searchResults.map((user) => (
                    <li key={user.username} className="list-group-item">
                      <Link to={`/profile/${user.username}`} className="text-decoration-none text-dark">
                        <strong>{user.name}</strong> @{user.username}
                      </Link>
                    </li>
                  ))}
                </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
