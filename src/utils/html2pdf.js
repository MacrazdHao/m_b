
import jspdf from "jspdf";
import html2canvas from "html2canvas";

const quality = 1;

export default {
  install(Vue, options) {
    Vue.prototype.$getPdf = (element, options, fileName) => {
      options = {
        quality,  // 质量不建议超过3，否则可能会引起某些元素的缺失等问题
        headerHeight: 0,
        footerHeight: 0,
        pageHeight: 0,
        coverIndex: [], // 从0开始，此处的序号不包含分页，只按内容页面的页数为准
        covers: [],
        pageInfo: [],
        ...options,
      }
      let {
        quality,
        headerHeight,
        footerHeight,
        pageHeight,
        coverIndex,
        covers,
        pageInfo,
      } = options;
      return new Promise((resolve, reject) => {
        let canvas = document.createElement("canvas");
        canvas.height = element.offsetHeight * quality;
        canvas.width = element.offsetWidth * quality;
        let context = canvas.getContext("2d");
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        html2canvas(element, {
          backgroundColor: "#fff",
          useCORS: true,
          allowTaint: true,
          height: element.offsetHeight,
          width: element.offsetWidth,
          canvas,
          scrollY: -(document.documentElement.scrollTop || document.body.scrollTop),
          scrollX: -2,
          scale: quality
        }).then(async (canvas) => {
          let imgData = canvas.toDataURL('image/jpeg', 1);
          let cWidth = canvas.width;  // canvas宽度
          // let cHeight = canvas.height / quality;  // canvas高度
          let pageWidth = cWidth / quality;  // 页面宽度
          let fullHeight = pageHeight;  // 每页的总高度
          // let realHeaderHeight = headerHeight;
          // let realFooterHeight = footerHeight;
          let contentHeight = fullHeight - headerHeight - footerHeight;
          let pageNum = coverIndex.length + pageInfo.length;
          let nowPage = 0;  // 当前绘制页数
          let nowContentPage = 0;  // 当前绘制的内容页数
          let dividePage = 0;  // 当前内容页面的内部分页数
          let coverCounter = 0;
          let positionY = 0;  // y轴偏移
          let PDF = new jspdf('', 'pt', [pageHeight, pageWidth]);

          while (nowPage < pageNum) {
            console.log(`第${nowPage}页加载中...`);
            if (coverIndex.indexOf(nowPage) != -1) {
              PDF.addImage(covers[coverCounter], 'JPEG', 0, 0, pageWidth, pageHeight);
              coverCounter++;
              nowPage++;
              if (nowPage < pageNum) PDF.addPage();
              // drawingPage = false;
              console.log(`第${nowPage - 1}页加载完成`);
            } else {
              let imgTag = new Image(pageWidth * quality, fullHeight * quality);
              let newCanvas = document.createElement("canvas");
              newCanvas.height = contentHeight * quality;
              newCanvas.width = pageWidth * quality;
              let ctx = newCanvas.getContext("2d");
              ctx.mozImageSmoothingEnabled = false;
              ctx.webkitImageSmoothingEnabled = false;
              ctx.msImageSmoothingEnabled = false;
              ctx.imageSmoothingEnabled = false;
              await (() => {
                let loadingPage = new Promise((resolve) => {
                  imgTag.onload = () => {
                    let { height, headers, footers } = pageInfo[nowContentPage];
                    // let headerImgTag = new Image(cWidth, headerHeight);
                    // let footerImgTag = new Image(cWidth, footerHeight);
                    // if (headers.length > 0) headerImgTag.src = headers[dividePage];
                    // if (footers.length > 0) footerImgTag.src = footers[dividePage];
                    let thisHeight = height >= contentHeight ? contentHeight : height;
                    // if (headers.length > 0) ctx.drawImage(headerImgTag, 0, 0, cWidth*2, realHeaderHeight*2, 0, 0, cWidth, realHeaderHeight);
                    // ctx.drawImage(imgTag, 0, positionY, cWidth, thisHeight, 0, realHeaderHeight, cWidth, thisHeight);
                    ctx.drawImage(imgTag, 0, positionY, pageWidth * quality, thisHeight * quality, 0, 0, pageWidth*quality, thisHeight*quality);
                    // if (footers.length > 0) ctx.drawImage(footerImgTag, 0, 0, cWidth*2, realFooterHeight*2, 0, realHeaderHeight + contentHeight, cWidth, realFooterHeight);
                    // 将黑色补白底色变为白色
                    let _pageData = ctx.getImageData(0, 0, newCanvas.width, newCanvas.height);
                    for (let i = 0; i < _pageData.data.length; i += 4) {
                      if (_pageData.data[i + 3] == 0) {
                        _pageData.data[i] = 255;
                        _pageData.data[i + 1] = 255;
                        _pageData.data[i + 2] = 255;
                        _pageData.data[i + 3] = 255;
                      }
                    }
                    ctx.putImageData(_pageData, 0, 0);
                    let pageData = newCanvas.toDataURL('image/jpeg', 1);
                    // PDF.addImage(pageData, 'JPEG', 0, 0, pageWidth, pageHeight);
                    if (headers.length > 0) PDF.addImage(headers[dividePage], 'JPEG', 0, 0, pageWidth, headerHeight);
                    PDF.addImage(pageData, 'JPEG', 0, headerHeight, pageWidth, thisHeight);
                    if (footers.length > 0) PDF.addImage(footers[dividePage], 'JPEG', 0, headerHeight + contentHeight, pageWidth, footerHeight);
                    positionY += (thisHeight * quality);
                    pageInfo[nowContentPage].height -= contentHeight;
                    console.log(`第${nowPage}页组装完成`, pageInfo[nowContentPage].height);
                    if (pageInfo[nowContentPage].height <= 0) {
                      dividePage = 0;
                      nowContentPage++;
                      nowPage++;
                      // drawingPage = false;
                      console.log(`第${nowPage - 1}页加载完成`);
                    } else {
                      dividePage++;
                    }
                    if (nowPage < pageNum) PDF.addPage();
                    resolve();
                  }
                });
                imgTag.src = imgData;
                return loadingPage;
              })();
            }
          }
          PDF.save(fileName + '.pdf');
          resolve(canvas);
          /*
          // 试验版本，未区分封面及内容页
          while (remainHeight > 0) {
            console.log('切图中...', remainHeight);
            if (drawingPage) continue;
            drawingPage = true;
            let isContent = !(remainHeight == cHeight || remainHeight <= fullHeight);
            let thisHeight = fullHeight - (isContent ? (headerHeight + footerHeight) * quality : 0);
            let imgTag = new Image(cWidth, cHeight);
            let newCanvas = document.createElement("canvas");
            newCanvas.height = fullHeight;
            newCanvas.width = cWidth;
            await (() => {
              let loadingPage = new Promise((resolve, reject) => {
                imgTag.onload = () => {
                  if (isContent) newCanvas.getContext("2d").drawImage(headerImgTag, 0, 0, cWidth, headerHeight * quality, 0, 0, cWidth, headerHeight * quality);
                  newCanvas.getContext("2d").drawImage(imgTag, 0, positionY, cWidth, thisHeight, 0, isContent ? headerHeight * quality : 0, cWidth, thisHeight);
                  if (isContent) newCanvas.getContext("2d").drawImage(footerImgTag, 0, 0, cWidth, footerHeight * quality, 0, thisHeight + headerHeight * quality, cWidth, footerHeight * quality);
                  let pageData = newCanvas.toDataURL('image/jpeg');
                  PDF.addImage(pageData, 'JPEG', 0, 0, pageWidth, pageHeight);
                  let a = document.createElement("img");
                  a.src = pageData;
                  document.getElementById("app").appendChild(a)
                  remainHeight -= thisHeight;
                  positionY += thisHeight;
                  if (remainHeight > 0) {
                    PDF.addPage()
                  }
                  console.log('加载完毕1');
                  resolve();
                }
              });
              imgTag.src = imgData;
              return loadingPage;
            })().then(res => {
              drawingPage = false;
              console.log("加载完毕2");
            });
          }
          PDF.save(fileName + '.pdf');
          resolve(canvas);
          */
        });
      })
    }
  }
}