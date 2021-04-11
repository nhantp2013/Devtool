import { render } from '@testing-library/react';
import React, { Component } from 'react'
import {Button} from 'reactstrap'

class Test extends Component{

render(){
    return(
        <div>
               <Button className="btn btn-lg btn-block  btn-success">
                            Submit
                        </Button>

        </div>)
}
}
export default Test;