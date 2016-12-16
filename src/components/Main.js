require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';


// 获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');

// 将图片名信息转换成图片URL路径信息
imageDatas.map((item, index) => {
  imageDatas[index].imageURL = require('../images/' + imageDatas[index].fileName);
});

/**
 * 获取区间内的一个随机值
 */
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

/**
 * 获取0-30度之间的任意正负值
 */
function get30DegRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

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
      this.props.center();
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

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr: [
        // {
        //   pos: {
        //     left: '0',
        //     top: '0'
        //   },
        //   rotate: 0,          // 旋转角度
        //   isInverse: false,   // 图片正反面
        //   isCenter: false     // 是否居中
        // }
      ]
    };
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      // 水平方向的取值范围
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      // 垂直方向的取值范围
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    }
  }

  /**
   * 翻转图片
   * @param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
   * @return {Function} 这是一个闭包函数，其内return一个真正待被执行的函数
   */
  inverse(index) {
    let imgsArrangeArr = this.state.imgsArrangeArr;

    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

    this.setState({ imgsArrangeArr });
  }

  /**
   * 重新布局所有图片
   * @param centerIndex 指定居中排布那个图片
   */
  rearrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr;
    let Constant = this.Constant;
    let centerPos = Constant.centerPos;
    let hPosRange = Constant.hPosRange;
    let vPosRange = Constant.vPosRange;
    let hPosRangeLeftSecX = hPosRange.leftSecX;
    let hPosRangeRightSecX = hPosRange.rightSecX;
    let hPosRangeY = hPosRange.y;
    let vPosRangeTopY = vPosRange.topY;
    let vPosRangeX = vPosRange.x;

    let imgsArrangeTopArr = [];
    // 取1或2个顶部图片
    let topImgNum = Math.ceil(Math.random() * 2);
    let topImgSpliceIndex = 0;

    // 取出居中图片，并对其设置
    let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
    imgsArrangeCenterArr[0].pos = centerPos;
    imgsArrangeCenterArr[0].rotate = 0;
    imgsArrangeCenterArr[0].isCenter = true;

    // 取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    // 布局位于上侧的图片
    imgsArrangeTopArr.map((item, index) => {
      imgsArrangeTopArr[index].pos = {
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      }
      imgsArrangeTopArr[index].rotate = get30DegRandom();
      imgsArrangeTopArr[index].isCenter = false;
    });

    // 布局左右两侧的图片
    for (let i = 0, l = imgsArrangeArr.length, j = l / 2; i < l; i++) {
      let hPosRangeLORX = null;

      // 前半部分布局左边，右半部分布局右边
      if (i < j) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i].pos = {
        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      };
      imgsArrangeArr[i].rotate = get30DegRandom();
      imgsArrangeArr[i].isCenter = false;
    }

    // 由于可能取了1个或者2个顶部图片，所以在此做两次判断，将其合并入imgsArrangeArr
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    if (imgsArrangeTopArr && imgsArrangeTopArr[1]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[1]);
    }
    // 将居中图片合并入imgsArrangeArr
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({ imgsArrangeArr });
  }

  /**
   * 利用 rearrange 函数，居中对应index的图片
   * @param index，需要被居中的图片对应的图片信息数组的index值
   */
  center(index) {
    this.rearrange(index);
  }

  componentWillMount() {
    imageDatas.map((item, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        let imgsArrangeArr = this.state.imgsArrangeArr;
        imgsArrangeArr[index] = {
          pos: {
            left: '0',
            top: '0'
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        };
        this.setState({ imgsArrangeArr });
      }
    });
  }


  // 组件加载后，为每张图片计算其位置的范围
  componentDidMount() {
    // 首先拿到舞台的大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage);
    let stageW = stageDOM.scrollWidth;
    let stageH = stageDOM.scrollHeight;
    let halfStageW = Math.ceil(stageW / 2);
    let halfStageH = Math.ceil(stageH / 2);

    // 拿到一个imageFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
    let imgW = imgFigureDOM.scrollWidth;
    let imgH = imgFigureDOM.scrollHeight;
    let halfImgW = Math.ceil(imgW / 2);
    let halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  }


  render() {
    let controllerUnits = [];
    let imgFigures = [];

    imageDatas.map((item, index) => {
      imgFigures.push(<ImgFigure ref={'imgFigure' + index} data={item} key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse.bind(this, index)} center={this.center.bind(this, index)} />);
    });

    return (
      <div>
        <section className="stage" ref="stage">
          <section className="img-sec">
            {imgFigures}
          </section>
          <nav className="controller-nav">
            {controllerUnits}
          </nav>
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
