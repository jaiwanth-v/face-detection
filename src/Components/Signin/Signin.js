import React from 'react';

class Signin extends React.Component  {

    constructor(props){
        super(props);
        this.state = {
            signInEmail : '',
            signInPassword : ''
        }
    }

    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value});
    }
    
    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () =>{
        fetch('https://hudson-eh-38759.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(resp=>resp.json())
            .then(user =>{
                if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    enterPress=(event)=> {
        if (event.keyCode === 13) {
            this.onSubmitSignIn();
        }
    }
    render(){
        const {onRouteChange} = this.props;
        return(
            <div>
                <nav style = {{display: 'flex',justifyContent: 'flex-end'}}>
                    <p onClick = {() => this.props.onRouteChange('register')} className = 'f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
                <article style={{transform: 'translate(0%, 20%)'}}
                className = "br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                <div className="measure ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange = {this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                    onKeyDown={(e) => this.enterPress(e)}
                    onChange = {this.onPasswordChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                />
                </div>
                </fieldset>
                <div className="">
                <input
                onClick = {this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                />
                </div>  {/*functions called inside onclick are executed even if there's no click at the time they are rendered */}
                <div className="lh-copy mt3">
                <p onClick =  {() => onRouteChange('register')} className="f6 link dim black db" style = {{cursor : 'pointer'} } >Register</p>
                </div>
                </div>
                </main>
                </article>
            </div>
        );
    }
}

export default Signin;