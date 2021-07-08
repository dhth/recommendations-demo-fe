import React from 'react';
import './App.css';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        fetching: false,
        product_version_id: null,
             students: [
             ]
          }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({product_version_id: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
      this.setState({
          fetching: true
      })
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}?product_version_id=${encodeURIComponent(this.state.product_version_id)}`)
        .then(response => response.json())
          .then(data => this.setState({ students: data.data, fetching: false }));
  }

    renderTableData(item) {
        return item.recommendations.map((student, index) => {
            const { id, product_name, organisation_name} = student //destructuring
            return (
                <tr key={id}>
                <td>{id}</td>
                <td>{product_name}</td>
                <td>{organisation_name}</td>
                </tr>
            )
        })
    }
    renderTableHeader(item) {
        console.log(item)
        let header = Object.keys(item.recommendations.[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

  render() {
    return (
        <div className="container">
        <h2>Recommendations</h2>
        <form className="row g-3" onSubmit={this.handleSubmit}>
          <div className="mb-3">
          <input required type="text" className="form-control" placeholder="Shop product version ID" value={this.state.value} onChange={this.handleChange} />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">Fetch recommendations</button>
          </div>
        </form>
        {this.state.fetching &&
            <div className="spinner-border m-5" role="status">
            </div>
        }
        {this.state.students.map((item) =>

            <div>
            <span className="badge bg-secondary">{item.version_name}</span>
            <br/>
            <small className="text-muted">{item.version_description}</small>
            <table className="table table-success table-striped" id='students'>
            <tbody>
            <tr>{this.renderTableHeader(item)}</tr>
            {this.renderTableData(item)}
            </tbody>
            </table>
        </div>
        )}
        </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <NameForm/>
    </div>
  );
}

export default App;
