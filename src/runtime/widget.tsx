/** @jsx jsx */
import { React, ReactDOM, AllWidgetProps, jsx } from 'jimu-core'
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis'
import Point from 'esri/geometry/Point'
import FeatureLayer from "esri/layers/FeatureLayer";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import Graphic from "esri/Graphic";
import SimpleMarkerSymbol from   "esri/symbols/SimpleMarkerSymbol";
import geometryEngine from  "esri/geometry/geometryEngine";
import SimpleFillSymbol from "esri/symbols/SimpleFillSymbol";
import Polyline from "esri/geometry/Polyline";
import SimpleLineSymbol from "esri/symbols/SimpleLineSymbol";
import { Button, Icon } from 'jimu-ui'; // import components;
import { Dropdown, DropdownMenu, DropdownItem , DropdownButton } from 'jimu-ui'
import { StarFilled } from 'jimu-icons/filled/application/star'
import FormCoordinates from "./component/FormCoordinates";





const iconNode = <StarFilled />;


export default class Widget extends React.PureComponent<AllWidgetProps<any>, any> {
  state = {
    jimuMapView: null,
    latitude: '',
    longitude: '',
    isOpen: false
  };


  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      this.setState({
        jimuMapView: jmv
      })

      jmv.view.on('pointer-move', (evt) => {
        const point: Point = this.state.jimuMapView.view.toMap({
          x: evt.x,
          y: evt.y
        })
        this.setState({
          latitude: point.latitude.toFixed(3),
          longitude: point.longitude.toFixed(3)
        })
      });
      jmv.view.on('click', (evt) => {
        const point: Point = this.state.jimuMapView.view.toMap({
          x: evt.x,
          y: evt.y
        })
        console.log('test')
        this.setState({
          latitude: point.latitude.toFixed(3),
          longitude: point.longitude.toFixed(3)
        })
        const simpleMarkerSymbol = new SimpleMarkerSymbol({
          color: [226, 119, 40],  // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1
          }
        });
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: simpleMarkerSymbol
        });

        const graphicsLayer = new GraphicsLayer({
          graphics: [pointGraphic]
        });
        graphicsLayer.add(pointGraphic);

        // Add the layer to the map (accessed through the Experience Builder JimuMapView data source)

        this.state.jimuMapView.view.map.add(graphicsLayer);
      });
    }
  };

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (event) {
    alert('A name was submitted: ' + this.state.value)
  }
  formSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    // create a new FeatureLayer
    const point = new Point({
      latitude: 41.890210,
      longitude: 12.492231
    }) ;

    const simpleMarkerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40],  // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1
      }
    });
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol
    });

    const graphicsLayer = new GraphicsLayer({
      graphics: [pointGraphic];
    });
    graphicsLayer.add(pointGraphic);

    // Add the layer to the map (accessed through the Experience Builder JimuMapView data source)
    this.state.jimuMapView.view.goTo(point);
    this.state.jimuMapView.view.map.add(graphicsLayer);
    console.log(`function formSubmit clicked`);
  };

  dropDown = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isOpen : !this.state.isOpen
    })

    console.log(this.state.isOpen)
    // console.log(this.state.isOpen.value)
    console.log('test dropdown click')
}
  dropDownItem = (e) => {
    e.stopPropagation()
    console.log(this.state.isOpen)
    console.log('console del dropdownb item ')
    this.setState({
      isOpen: true
    })
  }

  render () {
    return (
      <div className="widget-starter jimu-widget">
        {/* eslint-disable-next-line no-prototype-builtins */}
        {this.props.hasOwnProperty('useMapWidgetIds') && this.props.useMapWidgetIds && this.props.useMapWidgetIds[0] && (
          <JimuMapViewComponent useMapWidgetId={this.props.useMapWidgetIds?.[0]} onActiveViewChange={this.activeViewChangeHandler} />
        )}

          <Dropdown
              class="dropdown"
              direction="down"
              fluid
              menuItemCheckMode="multiCheck"
              isOpen={this.state.isOpen}
              // onClick={this.changeIsOpenState}
              onClick={ this.dropDown}
          >
            <DropdownButton type="primary">
              {iconNode}
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem header>
                My custom widget
              </DropdownItem>
              <DropdownItem divider onClick={this.dropDownItem}/>
              <DropdownItem onClick={this.dropDownItem}>
                <div className="text-truncate">
                  <p>
                    Lat/Lon: {this.state.latitude} {this.state.longitude}
                  </p>
                </div>
              </DropdownItem >
              <DropdownItem onClick={this.formSubmit}>
                    Fai un punto su Roma
              </DropdownItem>
              <DropdownItem onClick={this.dropDownItem}>
               <FormCoordinates />
              </DropdownItem>
              <DropdownItem onClick={this.dropDownItem}>
                Normal action
              </DropdownItem>
              <DropdownItem divider  onClick={this.dropDownItem}/>
              <DropdownItem active onClick={this.dropDownItem}>
                Actived action
              </DropdownItem>
              <DropdownItem disabled onClick={this.dropDownItem}>
                Disabled action
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
      </div>
    )
  }
}
