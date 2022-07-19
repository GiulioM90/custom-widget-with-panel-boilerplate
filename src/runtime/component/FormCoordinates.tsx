import { React, ReactDOM, AllWidgetProps, jsx } from 'jimu-core'
import {JimuMapView, JimuMapViewComponent} from "../../../../../../jimu-arcgis";
import Point from "esri/geometry/Point";
import SimpleMarkerSymbol from "esri/symbols/SimpleMarkerSymbol";
import Graphic from "esri/Graphic";
import GraphicsLayer from "esri/layers/GraphicsLayer";




export default class FormCoordinates extends React.PureComponent<AllWidgetProps<any>, any> {
    state = {
        jimuMapView: null,
        latitude: '',
        longitude: '',
        dataInput:''
    };


    onChangeText = (e) => {
        this.state.dataInput = e.target.value
        console.log(e.target.value)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        props.submit(this.state.dataInput)
        console.log(this.state.dataInput)
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.dataInput} type="text" placeholder="scrivi qualcosa" onChange={this.onChangeText}/>
                    {/*<input  type="text" placeholder="scrivi qualcosa2" onChange={onChangeText}/>*/}
                </form>
                <p>{this.state.dataInput}</p>
            </div>
        )
    }
}
