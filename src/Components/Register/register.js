import React from "react";
import ReactLoading from "react-loading";
import "../loading.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      isLoading: false,
      isUserValid: true,
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitRegister = () => {
    this.setState({ isLoading: true });
    fetch("https://hudson-eh-38759.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((resp) => resp.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({ isUserValid: false });
          this.setState({ isLoading: false });
        }
      });
  };

  enterPress = (event) => {
    if (event.keyCode === 13) {
      this.onSubmitRegister();
    }
  };

  render() {
    return this.state.isLoading ? (
      <div className="loading">
        <ReactLoading height={"7%"} width={"7%"} />
      </div>
    ) : (
      <div>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => this.props.onRouteChange("signin")}
            className="f3 link dim black  pa3 pointer"
          >
            Sign In
          </p>
        </nav>
        <article
          style={{ transform: "translate(0%, 20%)" }}
          className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5"
        >
          <main className="pa4 black-80">
            <div className="measure ">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    onChange={this.handleChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    onChange={this.handleChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email"
                    id="email-address"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    onKeyDown={(e) => this.enterPress(e)}
                    onChange={this.handleChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </fieldset>
              <div>
                <input
                  onClick={this.onSubmitRegister}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                />
              </div>
              {!this.state.isUserValid ? (
                <h4>Please enter valid details</h4>
              ) : null}
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Register;
