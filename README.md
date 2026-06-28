# ASSET-FORGE-TOOLKIT

把 AI 生成的素材，处理成游戏工程能直接用的资源。

## 在线使用

推荐直接打开网页使用：

[在线打开 ASSET-FORGE-TOOLKIT](https://gi159753.github.io/asset-forge-toolkit/)



## 当前功能

- 图片抠图
- 视频转序列帧
- 精灵图生成
- JSON 元数据导出
- AI 像素风转换
- 自定义调色板
- 透明 PNG 导出

## GitHub

喜欢这个工具的话，可以点一个 Star 支持项目：

[Star 支持项目](https://github.com/Gi159753/asset-forge-toolkit)

也可以查看源码：

[GitHub 源码](https://github.com/Gi159753/asset-forge-toolkit)


## 工具说明

### 图片抠图

用于把图片背景去掉，导出透明 PNG。

适合：

- 黑底素材
- 纯色背景图片
- AI 图标背景清理
- 角色、道具、技能图标简单抠图

支持：

- 黑底去除
- 纯色背景去除
- 边缘连通背景去除
- 多颜色取样
- `Shift + 点击` 追加多个背景色
- 导出透明 PNG

### 视频转精灵图

用于把 `mp4` 或 `webm` 视频转成游戏常用素材。

可以导出：

- 单帧 PNG 序列
- spritesheet 精灵图
- JSON 元数据
- 单帧 PNG zip

适合：

- 技能动画拆帧
- VFX 视频转序列帧
- 临时制作 spritesheet
- 给 Godot、Unity、Web 游戏准备动画素材

### 像素风转换器 / Pixel Style Converter

用于把 AI 生成图、普通图片或伪像素图，转换成更接近游戏可用的像素风素材。

支持方向：

- Classic Pixel / 经典像素
- Modern Pixel / 现代独游像素
- HD Pixel / 高清像素
- VFX Pixel / 特效像素

支持算法：

- Advanced Clean
- Pixelit Style

可以导出：

- 实际低分辨率 PNG
- 最近邻放大的预览 PNG

## 自定义调色板

像素风转换器支持自定义调色板。

格式示例：

```text
#000000,#ffffff,#2b6cff,#ffcc33
```

如果输入的有效颜色少于 2 个，工具会自动回退到自动取色。

## 本地使用

如果你想完全离线使用：

1. 点击 GitHub 的 `Code`
2. 选择 `Download ZIP`
3. 解压
4. 双击 `index.html`

这个工具是纯前端页面，不需要启动服务器。

## 隐私说明

这个工具不会上传文件。

你的图片和视频只会在浏览器里处理。

关闭网页后，导入的素材不会保存在工具里。

## 适合谁

这个工具适合：

- 刚开始做独立游戏的新手
- 不想安装复杂软件的开发者
- 想快速处理 AI 素材的人
- 需要临时抠图、抽帧、生成精灵图的人
- 需要把普通图片处理成像素风素材的人

它不是 Photoshop，也不是专业动画软件。

它的目标是：简单、免费、本地、安全、够用。
