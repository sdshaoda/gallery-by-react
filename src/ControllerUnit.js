import React from 'react';

// 控制组件
class ControllerUnit extends React.Component {
    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.rearrange();
        }
    }

    render() {
        let controllerUnitClassName = 'controller-unit';

        // 如果对应的是居中图片
        if (this.props.arrange.isCenter) {
            controllerUnitClassName += ' is-center';
            // 同时图片是翻转的
            if (this.props.arrange.isInverse) {
                controllerUnitClassName += ' is-inverse';
            }
        }

        return (
            <span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
        );
    }
}

export default ControllerUnit;