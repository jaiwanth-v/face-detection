import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/navigation';
import 'tachyons'
import Logo from './Components/Logo/logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/rank';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/register'



const particlesOptions = {
    particles: {
        number: {
            value: 80,
            density:{
                enable: true,
                value_area: 850
            }
        }       
    }
}



class  App extends React.Component {
    constructor(){
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box:{},
            route: 'signin',
            user:{
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: '',
            }
        };
        this.baseState = this.state;
    }

    resetForm = () => {
        this.setState(this.baseState)
    }

    loadUser= (data) =>{
        this.setState( {user :  {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }

    calculateFaceLocation= (data) =>{
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');//for manipulation of image
        const width= Number(image.width);
        const height = Number(image.height);
        return{
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row* height,
            rightCol: width - (clarifaiFace.right_col*width),
            bottomRow: height - (clarifaiFace.bottom_row * height),     
        };
    }

    onInputChange = (event) =>{
        this.setState({input: event.target.value});
    }

    displayFaceBox = (box) =>{
        this.setState({box: box});
    }

    onPictureSubmit = ( ) =>{
        this.setState({imageUrl: this.state.input})
        fetch('https://hudson-eh-38759.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input,
            })
        })
        .then(resp => resp.json())
            .then(response => {
                if(response) {
                    fetch('https://hudson-eh-38759.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id,
                        })
                    })
                    .then(resp => resp.json())
                    .then(count => {
                        this.setState({
                            user :  {...this.state.user, entries: count}
                        })
                    })
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch((err)=>alert("Please enter a valid URL")) ;
    }
 
    onRouteChange = (route = 'signin') =>{
        if(route !== 'home') this.resetForm();
        this.setState({route: route})
    }
    render(){
        const {imageUrl, box, route} = this.state ;
        return (
            <div className="App">
            <Particles className = 'particles' params={particlesOptions }/>
            <Navigation onRouteChange = {this.onRouteChange} route = {route}/>
            { route === 'home' 
                ?   <div>
                    <Logo className = 'logo'/>
                    <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
                    <ImageLinkForm onInputChange = {this.onInputChange} onPictureSubmit = {this.onPictureSubmit}/>
                    <FaceRecognition box = {box} imageUrl = {imageUrl}/>
                </div>   
                : (
                    route ==='signin'
                    ?   <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
                    :   <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
                )
            }
            </div>
        );
    }
};
export default App;
