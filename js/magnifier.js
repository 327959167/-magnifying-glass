// 解释
// move.offsetWidth   为放大镜圆的直径                /2           为半径

// clientX      为鼠标距离可视化区域的X轴距离    
// clientY      Y轴距离（与上同理）

// offsetleft   为某元素距离可视化区域X轴距离
// offsettop    Y轴距离（与上同理）

// offsetWidth  为某元素水平的width+padding+border-width值
// offsetHeight 垂直方向（与上同理）    


// 获取container
const container = document.querySelector('.container');
// 获取move
const move = document.querySelector('.move');
// 获取大图
const bigImg = document.querySelector('.move img')

// 放大镜跟随鼠标移动事件
container.addEventListener('mousemove', e => {
  // x轴
  // 鼠标距离可视化窗口的left值
  let cliX = e.clientX;
  // container距离可视化窗口的left值
  let conX = container.offsetLeft;
  // 计算放大镜距离container的left值
  let moveLeft = cliX - conX - move.offsetWidth / 2;
  // 边界值检测--鼠标中心点
  // 鼠标左边界（container窗口视区 + 放大镜半径）
  const boundaryLeft = conX + move.offsetWidth / 2;
  // 鼠标右边界（container窗口视区 + container宽度 - 放大镜半径）
  const boundaryRight = conX + container.offsetWidth - move.offsetWidth / 2;
  // 鼠标超过左边界--left = 0
  if (cliX < boundaryLeft) moveLeft = 0;
  // 鼠标超过右边界--left = container宽度 - 放大镜半径
  else if (cliX > boundaryRight) moveLeft = container.offsetWidth - move.offsetWidth;
  // 设置放大镜的left值
  move.style.left = moveLeft + 'px';
  // 比例关系 : move小图left :小图总宽度 = move大图left : 大图总宽度
  // moveLeft : container.offsetWidth = bigImgLeft : bigImg.offsetWidth
  // 注意：计算出的只是放大镜左边距图左边的left值，要鼠标在园中居中还需加上圆的半径
  let bigImgLeft = (bigImg.offsetWidth * moveLeft) / container.offsetWidth + move.offsetWidth / 2;
  // 设置bigImg大图left值(大图左移left为负值)
  bigImg.style.left = -bigImgLeft + 'px';

  // y轴原理与x轴相同
  let cliY = e.clientY;
  let conY = container.offsetTop;
  let moveTop = cliY - conY - move.offsetWidth / 2;
  const boundaryTop = conY + move.offsetWidth / 2;
  const boundaryBottom = conY + container.offsetHeight - move.offsetWidth / 2;
  if (cliY < boundaryTop) moveTop = 0;
  else if (cliY > boundaryBottom) moveTop = container.offsetHeight - move.offsetWidth;
  move.style.top = moveTop + 'px';
  let bigImgTop = (bigImg.offsetWidth * moveTop) / container.offsetWidth + move.offsetWidth / 2;
  bigImg.style.top = -bigImgTop + 'px';
})