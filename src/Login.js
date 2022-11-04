import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from './services/userAPI';

class Login extends Component {
  state = {
    loginName: '',
    isSaveButtonDisabled: true,
    loading: false,
    userLogin: false,
  };

  validateButton = () => {
    const { loginName } = this.state;
    const minNumber = 3;
    return loginName.length >= minNumber;
  };

  enableButton = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        isSaveButtonDisabled: !this.validateButton(),
      });
    });
  };

  isLoadingTrue = () => {
    this.setState({ loading: true }, async () => {
      const { loginName } = this.state;
      await createUser({ name: loginName });
      this.setState({
        userLogin: true,
        loading: false,
      });
    });
  };

  render() {
    const { loginName, isSaveButtonDisabled, loading, userLogin } = this.state;
    return (
      <div data-testid="page-login">
        { loading
          ? <Loading />
          : (
            <form className="name-form">
              Insira seu nome:
              <input
                className="input-form"
                type="text"
                data-testid="login-name-input"
                name="loginName"
                value={ loginName }
                onChange={ this.enableButton }
              />
              <button
                className="name-button"
                type="button"
                data-testid="login-submit-button"
                disabled={ isSaveButtonDisabled }
                onClick={ this.isLoadingTrue }
              >
                Entrar
              </button>
            </form>
          )}
        { userLogin && <Redirect to="/search" />}
      </div>
    );
  }
}

// Login.propTypes = {
//   loginName: PropTypes.string.isRequired,
//   isSaveButtonDisabled: PropTypes.func.isRequired,
//   onInputChange: PropTypes.func.isRequired,
// };

export default Login;
