import React, { Component } from 'react';
import Particles from '../components/Particles/Particles';
import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Sentiments from '../components/Sentiments/Sentiments';
import Rank from '../components/Rank/Rank';
import './App.css'




class App extends Component {
    
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: [],
            sentiments: [],
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }}) 
    }

    calculateFaceLocation = (data) => {
        const faceOutput = data.outputs.find(output => output.model.id === 'face-detection');
        if (!faceOutput) return [];
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }

    displayFaceBox = (box) => {
        // console.log(box);
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onPictureSubmit = () => {
        this.setState({imageUrl: this.state.input});
        // app.models.predict('face-detection', this.state.input)
        fetch('https://smart-brain-api-foy8.onrender.com/imageurl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: this.state.input })
          })
          .then(response => response.json())
          .then(response => {
            if (response) {
                fetch('https://smart-brain-api-foy8.onrender.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ id: this.state.user.id })
                })
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, { entries: count }));
                });
        
                this.displayFaceBox(this.calculateFaceLocation(response));
                const sentimentOutput = response.outputs.find(output => output.model.id === 'face-sentiment-recognition');
                const sentiments = sentimentOutput?.data?.concepts || [];
                this.setState({ sentiments });
            }
        })
        .catch(err => console.log(err));
      };
      
    
    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render() {
        const { isSignedIn, imageUrl, route, box, sentiments } = this.state;
        return (
            <div className='App'>
                <Particles />
                <Navigation
                    isSignedIn={isSignedIn}
                    onRouteChange={this.onRouteChange}
                />
                    {route === 'home'
                        ?   <div>
                                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                                <Logo />
                                <ImageLinkForm
                                    onInputChange={this.onInputChange}
                                    onPictureSubmit={this.onPictureSubmit}
                                />

                            {imageUrl && (
                                <div className="face-section">
                                    <div className="image-section">
                                        <FaceRecognition
                                            imageUrl={imageUrl}
                                            box={box}
                                        />
                                    </div>
                                    <div className="sentiment-section">
                                        <Sentiments sentiments={sentiments} />
                                    </div>
                                </div>
                                )}

                            </div>
                        :   (
                                route === 'signin'
                                ?   <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                                :   <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                            )
                    }
            </div>
        )
    }
}

export default App;