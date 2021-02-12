import React, { Component } from 'react';

// bootstrap 
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Jumbotron } from 'react-bootstrap';

// AWS SDK 
import AWS, { AWSError } from 'aws-sdk';

// https://github.com/aws/aws-sdk-js/issues/2231
import SageMakerRuntime from 'aws-sdk/clients/sagemakerruntime';

// this app's components 
import { MODEL_ENDPOINT, SDK_PARAMS } from './config';
import './App.css';

interface AppState {
  textToEvaluate: string,
  evaluation: number
}

async function queryEndpoint(encodedText : string) : Promise<number> {

  return new Promise<number>( (resolve, reject) => {
      const endpoint = MODEL_ENDPOINT;
      const sagemakerRuntime = new SageMakerRuntime( SDK_PARAMS );
      sagemakerRuntime.invokeEndpoint({
        EndpointName: endpoint,
        ContentType: 'application/x-text',
        Body: encodedText
      }, (err : AWSError, data : AWS.SageMakerRuntime.InvokeEndpointOutput) => {
        if (err) {
          console.log(err, err.stack); // an error occurred
          reject(0);
        }
        else { // successful response
          const stringResponse = data.Body.toString();
          const response = JSON.parse(stringResponse);
          console.log(response);
          const values = response.predictions[0];
          resolve(values.indexOf(Math.max(...values)) === 0 ? -1 : 1);
        }
      });
  });
}     

export class App extends Component<any> {
  constructor(props: any) {
    super(props);
    console.debug('app - constructor');
    this.state = { textToEvaluate: '', evaluation: 0 } as AppState ;
  }

  async componentDidMount() {
    console.debug('app - componentDidMount');
  }

  // TODO find correct type
  textChanged = (event: any) => {
    this.setState({ textToEvaluate: event.target.value, evaluation: 0 });
  }

  async submitText(text : string) {
    console.debug(`Text received : ${text}`);
    const result = await queryEndpoint(text);
    this.setState( { evaluation: result });
  }  

  render() {
    // console.debug('app - render - props');
    // console.debug(this.props);
    // console.debug('app - render - state');
    // console.debug(this.state);

    const state : AppState = this.state as AppState;

    var color : string = '';
    switch (state.evaluation) {
      case 0 : color = 'white'; break;
      case 1 : color = 'green'; break;
      case -1 : color = 'red'; break;
      default: color = 'none'
    }
    var textAreaStyle = {
      backgroundColor: color
    };

    return (
      <Jumbotron>
        <h1>SageMaker JumpStart Demo</h1>
        <p />

        <form>
          <div className="form-group">
            <label htmlFor="formEvaluate">Enter the text to evaluate</label>
            <textarea className="form-control" id="formEvaluate" rows={3} defaultValue={state.textToEvaluate}
              onChange={this.textChanged}
              style={ textAreaStyle  }>
            </textarea>
          </div>
          <Button variant="primary" onClick={(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { this.submitText(state.textToEvaluate) }}>Evaluate</Button>
        </form>

      </Jumbotron>
    );
  }

}

