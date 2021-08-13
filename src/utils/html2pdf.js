
import jspdf from "jspdf";
import html2canvas from "html2canvas";

const quality = 1;

export default {
  install(Vue, options) {
    Vue.prototype.$getPdf = (elements, options, fileName) => {
      options = {
        quality,  // 质量不建议超过3，否则可能会引起某些元素的缺失等问题
        headerHeight: 0,
        footerHeight: 0,
        pageWidth: 0,
        pageHeight: 0,
        coverIndex: [], // 从0开始，此内容页页码的内容页不包含头部、底部，只按内容页面的页数为准
        // 注意此处的内容页不是指实际页数，而是封面、封底，加上大章节数的内容页面数
        covers: [],
        pageInfo: [],
        ...options,
      }
      let {
        quality,
        headerHeight,
        footerHeight,
        pageWidth,
        pageHeight,
        coverIndex,
        covers,
        pageInfo,
      } = options;
      return new Promise(async (resolve, reject) => {
        let pageDatas = [];  // 测试用返回值
        let canvases = [];  // 测试用返回值
        let cWidth = pageWidth * quality;  // canvas宽度
        let contentHeight = pageHeight - headerHeight - footerHeight;  // 内容页的body(内容)高度
        let PDF = new jspdf('', 'pt', [pageHeight, pageWidth]);
        let pageNum = coverIndex.length + elements.length;  // 封面、封底、内容页总数三者之和
        let nowContentPage = 0;  // 当前绘制的内容页数
        let coverCounter = 0;  // 当前绘制的封面数组序号
        // 内容页转化用的Canvas
        let canvas = document.createElement("canvas");
        canvas.width = cWidth;
        let ctx = canvas.getContext("2d");
        // 关闭抗锯齿，提高清晰度，下同
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        // 对已转化内容页进行截取分页的Canvas
        let divideCanvas = document.createElement("canvas");
        divideCanvas.height = contentHeight * quality;
        divideCanvas.width = cWidth;
        let divideCtx = divideCanvas.getContext("2d");
        divideCtx.mozImageSmoothingEnabled = false;
        divideCtx.webkitImageSmoothingEnabled = false;
        divideCtx.msImageSmoothingEnabled = false;
        divideCtx.imageSmoothingEnabled = false;

        for (let nowPage = 0; nowPage < pageNum; nowPage++) {
          console.log(`第${nowPage}页加载中...`);
          if (coverIndex.indexOf(nowPage) != -1) {
            // 封面是已截好的img数据，直接插入PDF即可
            PDF.addImage(covers[coverCounter], 'JPEG', 0, 0, pageWidth, pageHeight);
            coverCounter++;
            if (nowPage < pageNum - 1) PDF.addPage();
          } else {
            let element = elements[nowContentPage];
            canvas.height = element.offsetHeight * quality;
            // 对当前内容页进行分页及转换
            // 这里需要await进行同步处理，否则nowPage会同时变化，引起数据错乱
            await html2canvas(element, {
              backgroundColor: "#fff",
              useCORS: true,
              allowTaint: true,
              height: element.offsetHeight,
              width: element.offsetWidth,
              canvas,
              scrollY: -(document.documentElement.scrollTop || document.body.scrollTop),
              scrollX: -2,
              scale: quality
            }).then(async (pageCanvas) => {
              canvases.push(pageCanvas);
              // 将转化成canvas数据的内容页再次转化为img数据
              let imgData = pageCanvas.toDataURL('image/jpeg', 1);
              let dividePage = 0;  // 当前内容页面的内部分页序号
              let positionY = 0;  // y轴偏移
              let imgTag = new Image(cWidth, canvas.height);
              let { height, headers, footers } = pageInfo[nowContentPage];
              await (() => {
                // 接下来的操作均需要等待imgTag在加载结束时才能继续，因此此处的Promise写进onload中执行
                // 当当前内容页的分页全部裁剪好后才会继续下一个内容页
                let loadingPage = new Promise((pageResolve) => {
                  imgTag.onload = () => {
                    while (height > 0) {
                      // 清空分页canvas
                      divideCtx.clearRect(0, 0, cWidth, divideCanvas.height);
                      let thisHeight = height >= contentHeight ? contentHeight : height;  // 当前分页高度
                      let thisImgHeight = thisHeight * quality;  // 内容截取的质量倍数
                      // 截取分页，img数据、原图x轴、原图y轴、截取的宽、截取的高、粘贴板(divideCtx)的x轴、粘贴板(divideCtx)的y轴、粘贴后缩放的宽度、粘贴后缩放的高度
                      divideCtx.drawImage(imgTag, 0, positionY, cWidth, thisImgHeight, 0, 0, cWidth, thisImgHeight);

                      // 将对透明部分的黑色补白底色变为白色
                      let _pageData = divideCtx.getImageData(0, 0, divideCanvas.width, divideCanvas.height);
                      for (let i = 0; i < _pageData.data.length; i += 4) {
                        if (_pageData.data[i + 3] == 0) {
                          _pageData.data[i] = 255;
                          _pageData.data[i + 1] = 255;
                          _pageData.data[i + 2] = 255;
                          _pageData.data[i + 3] = 255;
                        }
                      }
                      divideCtx.putImageData(_pageData, 0, 0);

                      // 将截好的分页转为img数据
                      let pageData = divideCanvas.toDataURL('image/jpeg', 1);
                      pageDatas.push(pageData);
                      // 分别向当前PDF页插入页眉、内容、页脚
                      if (headers.length > 0) PDF.addImage(headers[dividePage], 'JPEG', 0, 0, pageWidth, headerHeight);
                      PDF.addImage(pageData, 'JPEG', 0, headerHeight, pageWidth, thisHeight);
                      if (footers.length > 0) PDF.addImage(footers[dividePage], 'JPEG', 0, headerHeight + contentHeight, pageWidth, footerHeight);
                      positionY += thisImgHeight;  // 下一个分页的y轴偏移（坐标）
                      height -= contentHeight;  // 当前内容页剩余高度
                      console.log(`第${nowPage}页组装中`, height);
                      dividePage++;  // 当前内容页的内部分页序号+1
                      PDF.addPage();  // 添加PDF页
                    }
                    pageResolve();  // 结束当前内容页的裁剪转化
                  }
                });
                imgTag.src = imgData;
                return loadingPage;
              })();
            });
            nowContentPage++;  // 内容页的序号+1
          }
          console.log(`第${nowPage}页加载完成`);
        }
        resolve({ pageDatas, canvases, downloadPDF: () => { PDF.save(fileName + '.pdf'); } });
      });
    }
  }
}


/*
// 试验版本，未区分封面及内容页
while (remainHeight > 0) {
  console.log('切图中...', remainHeight);
  if (drawingPage) continue;
  drawingPage = true;
  let isContent = !(remainHeight == cHeight || remainHeight <= fullHeight);
  let thisHeight = fullHeight - (isContent ? (headerHeight + footerHeight) * quality : 0);
  let imgTag = new Image(cWidth, cHeight);
  let divideCanvas = document.createElement("canvas");
  divideCanvas.height = fullHeight;
  divideCanvas.width = cWidth;
  await (() => {
    let loadingPage = new Promise((resolve, reject) => {
      imgTag.onload = () => {
        if (isContent) divideCanvas.getContext("2d").drawImage(headerImgTag, 0, 0, cWidth, headerHeight * quality, 0, 0, cWidth, headerHeight * quality);
        divideCanvas.getContext("2d").drawImage(imgTag, 0, positionY, cWidth, thisHeight, 0, isContent ? headerHeight * quality : 0, cWidth, thisHeight);
        if (isContent) divideCanvas.getContext("2d").drawImage(footerImgTag, 0, 0, cWidth, footerHeight * quality, 0, thisHeight + headerHeight * quality, cWidth, footerHeight * quality);
        let pageData = divideCanvas.toDataURL('image/jpeg');
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