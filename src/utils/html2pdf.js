
import jspdf from "jspdf";
import html2canvas from "html2canvas";
export default {
  install(Vue, options) {
    Vue.prototype.$getPdf = (element, fileName) => {
      html2canvas(element, {
        allowTaint: true
      }).then((canvas) => {
        console.log('生成图片', canvas)
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        // pdf单页高度
        let pageHeight = contentWidth / 595.28 * 841.89
        // 页面总高度
        let leftHeight = contentHeight
        // pdf面板坐标
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 595.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new jspdf('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(fileName + '.pdf')
      }
      )
    }
  }
}