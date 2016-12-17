import React from 'react';

class ImgFigure extends React.Component {
  /**
   * imgFigure的点击处理函数
   */
  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();

    if (this.props.arrange && this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.rearrange();
    }
  }

  render() {
    let styleObj = {};
    // 如果props属性中指定了这张图片的位置，则使用
    if (this.props.arrange && this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    // 如果图片的旋转角度有值并且不为0，添加旋转角度
    if (this.props.arrange && this.props.arrange.rotate) {
      styleObj.transform = `rotate(${this.props.arrange.rotate}deg)`;
    }

    // 如果是居中的图片， z-index设为11
    if (this.props.arrange && this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    let imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange && this.props.arrange.isInverse ? ' is-inverse' : '';

    return (
      <div className={imgFigureClassName} onClick={this.handleClick.bind(this)} style={styleObj}>
        <div className="front">
          <img src={this.props.data.imageURL} alt={this.props.data.title} />
          <h2 className="img-title">{this.props.data.title}</h2>
        </div>
        <div className="back">
          <p>{this.props.data.desc}</p>
        </div>
      </div>
    );
  }
}

export default ImgFigure;