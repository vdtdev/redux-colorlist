import React from 'react';
import { connect } from 'react-redux';
import { selectColor } from '../redux/actions';

class ColorThumb extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(evt){
        console.info('Clicked');
        this.props.selectColor(this.props.color.id);
    }
    get styleClass(){
        let classes = ['thumb'];
        if(this.props.selected){
            classes.push('selected');
        }
        return classes.join(' ');
    }
    render(){
        let color = this.props.color;
        return (
            <div 
                className={this.styleClass}
                onClick={this.handleClick}
                style={{backgroundColor: `#${color.obj.colorCode}`}}
            >
                <div className='label'>
                    <div className='name'>{color.obj.name}</div>
                    <div className='code'>{color.obj.colorCode}</div>
                </div>
            </div>
        );
    }
}

export default connect(null,{selectColor})(ColorThumb);