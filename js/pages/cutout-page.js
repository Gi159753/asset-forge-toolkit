// Cutout page DOM wiring.
// Loaded as a classic script so the tool still works from file://.

const fileInput = document.getElementById("fileInput");
const fileButton = document.getElementById("fileButton");
const exportButton = document.getElementById("exportButton");
const copyButton = document.getElementById("copyButton");
const exportHelp = document.getElementById("exportHelp");
const dropZone = document.getElementById("dropZone");
const sourceCanvas = document.getElementById("sourceCanvas");
const previewCanvas = document.getElementById("previewCanvas");
const sourceWrap = document.getElementById("sourceWrap");
const previewWrap = document.getElementById("previewWrap");
const sourceInfo = document.getElementById("sourceInfo");
const previewInfo = document.getElementById("previewInfo");
const sourceEmpty = document.getElementById("sourceEmpty");
const previewEmpty = document.getElementById("previewEmpty");
const modeHint = document.getElementById("modeHint");
const modeGroup = document.getElementById("modeGroup");
const sampleText = document.getElementById("sampleText");
const sampleSwatch = document.getElementById("sampleSwatch");
const zoomInput = document.getElementById("zoom");
const zoomValue = document.getElementById("zoomValue");

const sliders = {
  threshold: document.getElementById("threshold"),
  feather: document.getElementById("feather"),
  defringe: document.getElementById("defringe"),
  alphaStrength: document.getElementById("alphaStrength")
};

const values = {
  threshold: document.getElementById("thresholdValue"),
  feather: document.getElementById("featherValue"),
  defringe: document.getElementById("defringeValue"),
  alphaStrength: document.getElementById("alphaStrengthValue")
};

const sourceCtx = sourceCanvas.getContext("2d", { willReadFrequently: true });
const previewCtx = previewCanvas.getContext("2d", { willReadFrequently: true });

let sourceImageData = null;
let originalFileName = "image";
let sampledColors = [{ r: 0, g: 0, b: 0 }];
let previewFrame = 0;
let syncingScroll = false;

fileButton.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  const file = fileInput.files && fileInput.files[0];
  if (file) loadImageFile(file);
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragging");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragging");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragging");
  const file = [...event.dataTransfer.files].find((item) => item.type.startsWith("image/"));
  if (file) loadImageFile(file);
});

document.addEventListener("paste", (event) => {
  const file = findClipboardImage(event.clipboardData);
  if (!file) return;
  event.preventDefault();
  loadImageFile(file);
});

modeGroup.addEventListener("sl-change", () => {
  updateModeHint();
  schedulePreview();
});

Object.entries(sliders).forEach(([key, input]) => {
  onValueInput(input, () => {
    values[key].value = input.value;
    schedulePreview();
  });
});

onValueInput(zoomInput, applyZoom);

document.querySelectorAll("[data-zoom]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.zoom === "fit") {
      fitImageToView();
    } else {
      zoomInput.value = button.dataset.zoom;
      applyZoom();
    }
  });
});

setupSyncedScroll(sourceWrap, previewWrap);
setupSyncedScroll(previewWrap, sourceWrap);
setupMiddleMousePan(sourceWrap, previewWrap);
setupMiddleMousePan(previewWrap, sourceWrap);

sourceCanvas.addEventListener("click", (event) => {
  if (!sourceImageData) return;
  const point = canvasPointFromEvent(sourceCanvas, event);
  if (!point) return;
  const index = (point.y * sourceCanvas.width + point.x) * 4;
  const data = sourceImageData.data;
  const color = { r: data[index], g: data[index + 1], b: data[index + 2] };
  sampledColors = event.shiftKey ? [...sampledColors, color] : [color];
  updateSampleDisplay();
  schedulePreview();
});

exportButton.addEventListener("click", () => {
  if (!sourceImageData) return;
  getPreviewPngBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${baseName(originalFileName)}_cutout.png`;
    link.click();
    URL.revokeObjectURL(link.href);
  });
});

copyButton.addEventListener("click", () => {
  if (!sourceImageData) return;
  if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
    exportHelp.textContent = "当前浏览器不支持复制 PNG，请使用导出。";
    return;
  }

  getPreviewPngBlob(async (blob) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
      exportHelp.textContent = "已复制透明 PNG。";
    } catch (error) {
      exportHelp.textContent = "复制失败，请使用导出 PNG。";
    }
  });
});

function getPreviewPngBlob(callback) {
  previewCanvas.toBlob((blob) => {
    if (blob) callback(blob);
  }, "image/png");
}

function findClipboardImage(clipboardData) {
  if (!clipboardData) return null;
  const files = [...clipboardData.files];
  const file = files.find((item) => item.type.startsWith("image/"));
  if (file) return file;

  const imageItem = [...clipboardData.items].find((item) => item.kind === "file" && item.type.startsWith("image/"));
  return imageItem ? imageItem.getAsFile() : null;
}

updateSampleDisplay();
