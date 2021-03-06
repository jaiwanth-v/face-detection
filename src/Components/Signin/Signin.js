import React from "react";
import ReactLoading from "react-loading";
import "../loading.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      isLoading: false,
      isUserValid: true,
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitSignIn = () => {
    this.setState({ isLoading: true });
    fetch("https://hudson-eh-38759.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
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
      })
      .catch((err) => console.log("err"));
  };

  enterPress = (event) => {
    if (event.keyCode === 13) {
      this.onSubmitSignIn();
    }
  };
  render() {
    const { onRouteChange } = this.props;
    return this.state.isLoading ? (
      <div className="loading">
        <ReactLoading height={"7%"} width={"7%"} />
      </div>
    ) : (
      <div>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => this.props.onRouteChange("register")}
            className="f3 link dim black pa3 pointer"
          >
            Register
          </p>
        </nav>
        <article
          style={{ transform: "translate(0%, 20%)" }}
          className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5"
        >
          <main className="pa4 black-80">
            <div className="measure ">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    onChange={this.handleChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="signInEmail"
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
                    name="signInPassword"
                    id="password"
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  onClick={() => onRouteChange("register")}
                  className="f6 link dim black db"
                  style={{ cursor: "pointer" }}
                >
                  Register
                </p>
                {!this.state.isUserValid ? (
                  <h4>Invalid username or password</h4>
                ) : null}
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Signin;
