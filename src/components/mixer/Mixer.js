import React from 'react';
import { connect } from 'react-redux';
import { getSelectedColor } from '../../redux/selectors';
import { addColor, updateColor, selectColor, deleteColor } from '../../redux/actions';

import Color from '../../lib/color';
// const Hash = require('../../lib/hash');
import {Hash} from '../../lib/hash';

var handlerBind = (handler) => (self) => { handler = handler.bind(self); };

class MixerChannel extends React.Component {
    constructor(props){
        super(props);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    handleFieldChange(evt){
        let val = evt.target.value;
        console.info('field change handler', val);
        this.props.onChange(
            this.props.channel,
            evt.target.value
        );
    }

    handleSliderChange(evt){
        console.info('slider change handler');
        this.props.onChange(
            this.props.channel,
            evt.target.value
        );
    }

    render(){
        return (
            <div className='cm-channel'>
                <div className='cmc-name'>{this.props.channelName}</div>
                <input 
                    className='cmc-number'
                    value={this.props.value}
                    min={0}
                    max={255}
                    step={1}
                    onChange={this.handleFieldChange}
                    type='number'
                />
                <input 
                    className='cmc-range'
                    value={this.props.value}
                    min='0' max='255'
                    onChange={this.handleSliderChange}
                    type='range'
                />
            </div>
        );
    }
}

const MixerChannelNames = [
    'Red',
    'Green',
    'Blue'
];

const MixerChannelIds = [
    'r',
    'g',
    'b'
];

class ColorMixer extends React.Component {
    constructor(props){
        super(props);
        this.state = this.processProps(props);
        handlerBind(this.handleChannelChange)(this);
    }

    processProps(props){
        let colorObj = null,
            id = null;
        if(typeof props.id !== 'undefined'){
            colorObj = new Color(props.name, props.channels);
            id = props.id;
        } else {
            colorObj = new Color('New Color', [0,0,0]);
        }
        return {
            id: id,
            name: colorObj.name,
            channels: Hash.extract(colorObj.colorChannels, MixerChannelIds),
            color: colorObj,
            originalColor: colorObj.clone()
        };
    }

    componentDidUpdate(oldProps){
        if(oldProps !== this.props){
            console.info('Update triggered prop re-eval');
            this.setState(this.processProps(this.props));
        }
    }

    handleChannelChange = (channel, newValue) => {
        let colorC = this.state.color.clone(),
            change = { [channel]: Math.max(0,Math.min(255,newValue)) };
        colorC.colorChannels = change;
        this.setState({
            color: colorC,
            channels: Hash.extract(colorC.colorChannels, MixerChannelIds)
        });
    }
    handleNameChange = (evt) => {
        let colorC = this.state.color.clone();
        colorC.name = evt.target.value;
        this.setState({color: colorC});
    }

    handleButtonAction = (action) => {
        let exists = (this.state.id !== null);
        if(action === 'reset'){
            let origColor = this.state.originalColor;
            this.setState({
                color: origColor.clone(),
                name: origColor.name,
                channels: Hash.extract(origColor.colorChannels, MixerChannelIds)
            });
        }
        if(action === 'save'){
            if(exists){
                console.info('color exists, updating');
                this.props.updateColor(
                    this.state.id,
                    this.state.color.name,
                    this.state.color.colorChannels
                );
            } else {
                console.info('color new, creating');
                this.props.addColor(
                    this.state.color.name,
                    this.state.color.colorChannels
                );
            }
        }
        if(action === 'new'){
            this.props.selectColor(null);
        }
        if(action === 'delete'){
            if(exists){
                this.props.deleteColor(this.state.id);
            }
        }
    }
    
    render(){
        let previewStyle = {
            backgroundColor: "#" + this.state.color.colorCode
        };
        let channelVals = Hash.extract(this.state.color.colorChannels, MixerChannelIds);
        return (
            
            <div className='color-mixer'>
                <div className='cm-body'>
                    <div className='cm-preview'>
                        <div 
                            className="color"
                            style={previewStyle}
                        />
                        <div className="value">{this.state.color.colorCode}</div>
                    </div>
                    <div className='cm-channels'>
                    {(channelVals.map((ch,i) => (
                        <MixerChannel
                            key={MixerChannelIds[i]}
                            channel={MixerChannelIds[i]}
                            channelName={MixerChannelNames[i]}
                            value={ch}
                            onChange={this.handleChannelChange}
                        />
                    )))}
                </div>
                </div>
                <div className='cm-actions'>
                    <div className='cm-name'>
                        Name: <input 
                            value={this.state.color.name}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <button onClick={()=>{this.handleButtonAction('new')}}>New</button>
                    <button onClick={()=>{this.handleButtonAction('save')}}>Save</button>
                    <button onClick={()=>{this.handleButtonAction('reset')}}>Reset</button>
                    <button onClick={()=>{this.handleButtonAction('delete')}}>Delete</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {id, name, channels} = getSelectedColor(state);
    console.info('Mixer map state ', id, name ,channels);
    return {id, name, channels};
};

export default connect(
    mapStateToProps, 
    {addColor, updateColor, selectColor, getSelectedColor, deleteColor}
)(ColorMixer);