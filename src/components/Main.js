require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';


// 获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');
let yeomanImage = require('../images/yeoman.png');

// 利用自执行函数，将图片名信息转换成图片URL路径信息
imageDatas = (function (imageDatasArr) {
  for (let i = 0, l = imageDatasArr.length; i < l; i++) {
    let singleImageData = imageDatasArr[i];

    singleImageData.imageURL = require('../images/' + singleImageData.fileName);

    imageDatasArr[i] = singleImageData;

    return imageDatasArr;
  }
})(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        {/*<div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>*/}
        <section className="stage">
          <section className="img-sec"></section>
          <nav className="controller-nav">
            shaoda
          </nav>
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;