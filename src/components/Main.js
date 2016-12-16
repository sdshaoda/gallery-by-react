require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';


// 获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');
// let yeomanImage = require('../images/yeoman.png');

// 将图片名信息转换成图片URL路径信息
imageDatas.map((item, index) => {
  imageDatas[index].imageURL = require('../images/' + imageDatas[index].fileName);
});

class ImgFigure extends React.Component {
  render() {
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

class AppComponent extends React.Component {
  render() {
    let controllerUnits = [];
    let imgFigures = [];

    imageDatas.forEach(function (item, index) {
      imgFigures.push(<ImgFigure data={item} key={index} />);
    });

    return (
      <div>
        {/*<div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>*/}
        <section className="stage">
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
