import React, { Component } from 'react';
import { fabric } from 'fabric';
import styles from './App.css';

class FabricSketchRectangle extends Component {
    constructor() {
        super()

    }

    componentWillMount() {
        // dispatch some actions if you use Redux
    }

    componentDidMount() {
        const canvas = new fabric.Canvas('c', { selection: false });
        canvas.setHeight(500);
        canvas.setWidth(800);
        // const rect = new fabric.Rect({ top: 0, left: 0, width: 40, height: 30, fill: '#f55', opacity: 0.7 });
        // canvas.add(rect);

        //drawing
        let rect, isDown, origX, origY;

        canvas.on('mouse:down', function (o) {
            isDown = true;
            let Pointer = canvas.getPointer(o.e);
            origX = Pointer.x;
            origY = Pointer.y;
            rect = new fabric.Rect({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                width: Pointer.x - origX,
                height: Pointer.y - origY,
                angle: 0,
                fill: 'rgba(255,0,0,0.5)',
                transparentCorners: false
            });
            canvas.add(rect);
        });

        canvas.on('mouse:move', function (o) {
            if (!isDown) return;
            let pointer = canvas.getPointer(o.e);

            if (origX > pointer.x) {
                rect.set({ left: Math.abs(pointer.x) });
            }
            if (origY > pointer.y) {
                rect.set({ top: Math.abs(pointer.y) });
            }

            rect.set({ width: Math.abs(origX - pointer.x) });
            rect.set({ height: Math.abs(origY - pointer.y) });


            canvas.renderAll();
        });

        canvas.on('mouse:up', function (o) {
            isDown = false;
        });


        // do some stuff with it
    }

    render() {
        return (
            <div>
                <canvas id="c" />
            </div>
        )
    }
}

export default FabricSketchRectangle;