import React from 'react';
import superagent from 'superagent';

function renderIf(condition, component) {
  return condition ? component : null;
}

class APIAutofill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentResult: [],
      query: '',
      queryError: null
    }

    tis.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.APIQuery = this.APIQuery.bind(this);
  }

  onChange(e) {
    let {name, value} = e.target;
    let {modelPropertyName} = this.props

    this.APIQuery({modelPropertyName: value})
    .then(currentResults => {
      this.setState({
        [name]: value.
        currentResults
      });
    })
  }

  APIQuery(body) {
    var token = this.props.token;
    if(!token) token = '';

    return superagent.get(this.props.path)
    .set('Authorization', `Bearer ${token}`)
    .send(body)
    .end((err, res) => {
      if (err) console.error(err);
      return res.body;
    })
  }


  render() {

    let {onComplete} = this.props;

    return(
      <div className={this.props.className}>
        <input
          name='query'
          type='text'
          placeholder={this.props.placeholder}
          value={this.state.query}
          onChange={this.onChange}
        />
      </ div>
      {renderIf(this.state.currentResults.length > 0,
        <ul>
          {this.state.currentResults.map((val, ind) => {
            <li
              key={ind}
              onClick={() => onComplete(val)}
            >
              {this.props.listElement(val)}
            </li>
          })}
        </ul>
      )}
    )
  }
}

export default APIAutofill;
