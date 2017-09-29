import React from 'react';
import superagent from 'superagent';

function renderIf(condition, component) {
  return condition ? component : null;
}
/*
Designed to perform an api qeury and display the results in a dropdown
menu style below the input. Additional styling required.

The following props are required:
  path: the API's full path

  modelPropertyName: The name of the single model property you intend to query

  onComplete: A callback tp perform when a value is clicked

  element: A function that takes an object as an argument
  and returns JSX with the object incorporated

The following props are optional:

  token: Will be passed if bearer authentication is required for the API route

  placeholder: will be displayed in the input as a placeholder when empty

  className: will giv the entire Component a defined className
*/
class APIAutofill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentResult: [],
      query: '',
      queryError: null
    }

    this.onChange = this.onChange.bind(this);
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

    let {onComplete, className, placeholder} = this.props;
    if (!className) className = '';
    if(!placeholder) placeholder = '';
    return(
      <div className={className}>
        <input
          name='query'
          type='text'
          placeholder={placeholder}
          value={this.state.query}
          onChange={this.onChange}
        />
        {renderIf(this.state.currentResult.length > 0,
          <ul>
            {this.state.currentResult.map((val, ind) => {
              <li
                key={ind}
                onClick={() => onComplete(val)}
              >
                {this.props.listElement(val)}
              </li>
            })}
          </ul>
        )}
      </div>
    )
  }
}

export default APIAutofill;
