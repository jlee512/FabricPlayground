import React from 'react';
import { SketchField, Tools } from 'react-sketch';

class Sketch extends React.Component {
    render() {
        return (
            <SketchField width='1024px'
                height='768px'
                tool={Tools.Rectangle}
                lineColor='black'
                lineWidth={3}
                backgroundColor='#ffffff' />
        )
    }
}

export default Sketch;