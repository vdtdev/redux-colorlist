import React from 'react';
import { connect } from 'react-redux';
import ColorThumb from './ColorThumb';

import { getColors, getSelectedColor } from '../redux/selectors';
import Color from '../lib/color';

class ColorList extends React.Component {
    render(){
        let colors = this.props.colors;
        return (
            <div className='colorList-container'>
                {/* <span>Selected: {this.props.selected.id}</span> */}
                <div className='cl-body'>
                    { 
                        (colors && colors.length)?
                            colors.map(color => (
                                <ColorThumb 
                                    key={`color-${color.id}`}
                                    color={color}
                                    selected={(color.id === this.props.selected)}
                                />
                            ))
                            : <div className='no-colors'>No colors in list</div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let colors = getColors(state).map(c => {
        let {id, name, channels} = c;
        return {id, obj: new Color(name, channels)};
    });
    const selectedColor = getSelectedColor(state).id;
    return { colors, selected: selectedColor };
};

export default connect(mapStateToProps,{getSelectedColor})(ColorList);