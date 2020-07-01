import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) =>{
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) =>{
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) =>{
        this.setState({password: event.target.value})
    }

    onSubmitRegister = () =>{
        fetch('https://hudson-eh-38759.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        }).then(resp=>resp.json())
            .then(user =>{
                if(user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home')
            }
            })
    }

    enterPress=(event)=> {
        if (event.keyCode === 13) {
            this.onSubmitRegister();
        }
    }

    render(){

        return(
            <div>
                <nav style = {{display: 'flex',justifyContent: 'flex-end'}}>
                    <p onClick = {() => this.props.onRouteChange('signin')} className = 'f3 link dim black underline pa3 pointer'>Sign In</p>
                </nav>
                <article style={{transform: 'translate(0%, 20%)'}} className = "br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">    
                    <main className="pa4 black-80">
                        <div className="measure ">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input onChange = {this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange ={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onKeyDown={(e) => this.enterPress(e)} onChange = {this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                                </div>
                            </fieldset>
                            <div className="">
                            <input onClick = {this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                            </div>  {/*functions called inside onclick are executed even if there's no click at the time they are rendered */}
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default Register;