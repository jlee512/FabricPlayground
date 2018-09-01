import React, { Component } from 'react';
import { fabric } from 'fabric';
import styles from './App.css';

var min = 99;
var max = 999999;

class FabricSketchPolygon extends Component {
    constructor() {
        super()

    }

    componentWillMount() {
        // dispatch some actions if you use Redux
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('c', { selection: false });
        this.canvas.setHeight(500);
        this.canvas.setWidth(800);

        this.canvas.on('mouse:down',(options) => {
            console.log('mouse down');
            console.log(options);
            if(options.target && options.target.id == this.pointArray[0].id){
                console.log('generatePolygon');
                this.generatePolygon(this.pointArray);
            }
            console.log(this.polygonMode);
            if(this.polygonMode){
                console.log('add point');
                this.addPoint(options);
            }
        });
        this.drawPolygon();

        // do some stuff with it
    }

    drawPolygon = () => {
        console.log('drawpolygon');
        this.polygonMode = true;
        this.pointArray = new Array();
        this.lineArray = new Array();
        this.activeLine;
    }

    addPoint = (options) => {
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var id = new Date().getTime() + random;
        var circle = new fabric.Circle({
            radius: 5,
            fill: '#ffffff',
            stroke: '#333333',
            strokeWidth: 0.5,
            left: (options.e.layerX/this.canvas.getZoom()),
            top: (options.e.layerY/this.canvas.getZoom()),
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX:'center',
            originY:'center',
            id:id,
                objectCaching:false
        });
        if(this.pointArray.length == 0){
            circle.set({
                fill:'red'
            })
        }
        var points = [(options.e.layerX/this.canvas.getZoom()),(options.e.layerY/this.canvas.getZoom()),(options.e.layerX/this.canvas.getZoom()),(options.e.layerY/this.canvas.getZoom())];
        let line = new fabric.Line(points, {
            strokeWidth: 2,
            fill: '#999999',
            stroke: '#999999',
            class:'line',
            originX:'center',
            originY:'center',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
                objectCaching:false
        });
        if(this.activeShape){
            var pos = this.canvas.getPointer(options.e);
            var points = this.activeShape.get("points");
            points.push({
                x: pos.x,
                y: pos.y
            });
            var polygon = new fabric.Polygon(points,{
                stroke:'#333333',
                strokeWidth:1,
                fill: '#cccccc',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                objectCaching:false
            });
            this.canvas.remove(this.activeShape);
            this.canvas.add(polygon);
            this.activeShape = polygon;
            this.canvas.renderAll();
        }
        else{
            var polyPoint = [{x:(options.e.layerX/this.canvas.getZoom()),y:(options.e.layerY/this.canvas.getZoom())}];
            var polygon = new fabric.Polygon(polyPoint,{
                stroke:'#333333',
                strokeWidth:1,
                fill: '#cccccc',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                objectCaching:false
            });
            this.activeShape = polygon;
            this.canvas.add(polygon);
        }
        this.activeLine = line;

        this.pointArray.push(circle);
        this.lineArray.push(line);

        this.canvas.add(line);
        this.canvas.add(circle);
        this.canvas.selection = false;
    }

    generatePolygon = (pointArray) => {
        console.log('generatePolygon');
        var points = new Array();
        pointArray.forEach((point) => {
            points.push({
                x:point.left,
                y:point.top
            });
            this.canvas.remove(point);
        });
        this.lineArray.forEach((line) => {
            this.canvas.remove(line);
        });
        this.canvas.remove(this.activeShape).remove(this.activeLine);
        var polygon = new fabric.Polygon(points,{
            stroke:'#333333',
            strokeWidth:0.5,
            fill: 'red',
            opacity: 1,
            hasBorders: false,
            hasControls: false
        });
        this.canvas.add(polygon);

        this.activeLine = null;
        this.activeShape = null;
        this.polygonMode = false;
        this.canvas.selection = true;
    }

    render() {
        return (
            <div>
                <canvas id="c" />
            </div>
        )
    }
}

export default FabricSketchPolygon;