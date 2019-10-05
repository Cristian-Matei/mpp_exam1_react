import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { LogLevel } from '@aspnet/signalr';
//import { runInThisContext } from 'vm';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.location.state.username,
            id: this.props.location.state.id,
            connection: null,
            others : [],
            playerText: null,
            status : false,
            words : [],
            scrambles : [],
            iteration: 0,
            challengeText: null,
            guess : null,
            correctAnswer: null
        };
    }
    componentDidMount = ()=> {
        const newConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/chat").configureLogging(LogLevel.Information).build();
        this.setState({ connection: newConnection }, () => {
            this.state.connection
            .start()
            .then(() => this.state.connection.invoke("AddUser", this.state.username))
            .catch(err => console.log('Error while establishing connection :('));

            this.state.connection.on("ReceiveStartGame", (response)=>{
                this.setState({status: true});
                this.setState({playerText: "The other players are: " + response});
            })

            this.state.connection.on("IsGameBusy", (response)=>{
                var isTrueSet = !(response === "False");

                //alert(response === "False");
                this.setState({status: isTrueSet});
            })
            this.state.connection.on("ReceiveWord", (word, shuffle)=>{
                alert(shuffle);
                let copy1 = this.state.words.slice();
                copy1.push(word);
                let copy2 = this.state.scrambles.slice();
                copy2.push(shuffle);
                this.setState({words: copy1, scrambles: copy2});
                var challenge = "The word for round " + this.state.iteration + " is " +this.state.scrambles[this.state.iteration];
                this.setState({challengeText: challenge});

            });
            this.state.connection.on("CorrectWord", (word)=>{
                this.alert("Correct word is" + word);
            });
        });
    }

    logout = () => {
        this.props.history.push('/');
        this.state.connection.invoke("RemoveUser", this.state.username)
            .then(() => this.state.connection.stop());
    }

    startGame = () => {
        this.state.connection.invoke("StartGame");
    }

    sendData = () =>{
        this.state.connection.invoke("SendGuess", this.state.iteration, this.state.guess, this.state.id);
    }

    render() {
        return (
            <div>Hello {this.state.username}!<br />
                <button disabled={this.state.status} onClick={this.startGame}>Click here to start game!</button> <br />
                <div>{this.state.playerText}</div>
                This is the challenge: <br />
                <div>{this.state.challengeText}</div>
                Submit your answer here: <br />
                Your guess: <input onChange={(e) => this.setState({ guess: e.target.value })} /><br />
                <button id="guess" onClick={() => this.sendData()}>Send guess</button><br/>
                Logout here: <br />
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}
export default Game;