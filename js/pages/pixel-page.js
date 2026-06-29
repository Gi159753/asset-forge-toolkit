// Pixel tool page DOM wiring.
// Loaded as a classic script so the tool still works from file://.

const pixelDropZone = document.getElementById("pixelDropZone");
const pixelInput = document.getElementById("pixelInput");
const pixelFileButton = document.getElementById("pixelFileButton");
const pixelPresetInput = document.getElementById("pixelPreset");
const pixelAlgorithmInput = document.getElementById("pixelAlgorithm");
const presetSyncSizeInput = document.getElementById("presetSyncSize");
const pixelWidthInput = document.getElementById("pixelWidth");
const pixelHeightInput = document.getElementById("pixelHeight");
const autoPixelHeightInput = document.getElementById("autoPixelHeight");
const pixelBlockSizeInput = document.getElementById("pixelBlockSize");
const colorCountInput = document.getElementById("colorCount");
const pixelDitherInput = document.getElementById("pixelDither");
const pixelHardEdgesInput = document.getElementById("pixelHardEdges");
const pixelOutlineInput = document.getElementById("pixelOutline");
const pixelSaturationInput = document.getElementById("pixelSaturation");
const pixelContrastInput = document.getElementById("pixelContrast");
const pixelSharpenInput = document.getElementById("pixelSharpen");
const alphaThresholdInput = document.getElementById("alphaThreshold");
const dirtyColorMergeInput = document.getElementById("dirtyColorMerge");
const outlineColorInput = document.getElementById("outlineColor");
const customOutlineColorInput = document.getElementById("customOutlineColor");
const preserveGlowInput = document.getElementById("preserveGlow");
const customPaletteInput = document.getElementById("customPalette");
const pixelitPanel = document.getElementById("pixelitPanel");
const pixelitPixelSizeInput = document.getElementById("pixelitPixelSize");
const pixelitMaxColorsInput = document.getElementById("pixelitMaxColors");
const pixelitPaletteInput = document.getElementById("pixelitPalette");
const pixelitDitherInput = document.getElementById("pixelitDither");
const pixelitGrayscaleInput = document.getElementById("pixelitGrayscale");
const pixelitBrightnessInput = document.getElementById("pixelitBrightness");
const pixelitContrastInput = document.getElementById("pixelitContrast");
const pixelitSaturationInput = document.getElementById("pixelitSaturation");
const pixelitBrightnessValue = document.getElementById("pixelitBrightnessValue");
const pixelitContrastValue = document.getElementById("pixelitContrastValue");
const pixelitSaturationValue = document.getElementById("pixelitSaturationValue");
const pixelSaturationValue = document.getElementById("pixelSaturationValue");
const pixelContrastValue = document.getElementById("pixelContrastValue");
const pixelSharpenValue = document.getElementById("pixelSharpenValue");
const alphaThresholdValue = document.getElementById("alphaThresholdValue");
const dirtyColorMergeValue = document.getElementById("dirtyColorMergeValue");
const pixelInfo = document.getElementById("pixelInfo");
const pixelSourceInfo = document.getElementById("pixelSourceInfo");
const pixelPreviewInfo = document.getElementById("pixelPreviewInfo");
const pixelSourceCanvas = document.getElementById("pixelSourceCanvas");
const pixelPreviewCanvas = document.getElementById("pixelPreviewCanvas");
const pixelSourceEmpty = document.getElementById("pixelSourceEmpty");
const pixelPreviewEmpty = document.getElementById("pixelPreviewEmpty");
const downloadPixelActualButton = document.getElementById("downloadPixelActualButton");
const downloadPixelPreviewButton = document.getElementById("downloadPixelPreviewButton");

const pixelSourceCtx = pixelSourceCanvas.getContext("2d", { willReadFrequently: true });
const pixelPreviewCtx = pixelPreviewCanvas.getContext("2d", { willReadFrequently: true });

let pixelOriginalImage = null;
let pixelFileName = "image";
let pixelActualCanvas = document.createElement("canvas");
let pixelPreviewScale = 1;
let pixelFrame = 0;

pixelFileButton.addEventListener("click", () => pixelInput.click());

pixelInput.addEventListener("change", () => {
  const file = pixelInput.files && pixelInput.files[0];
  if (file) loadPixelImageFile(file);
});

pixelDropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  pixelDropZone.classList.add("dragging");
});

pixelDropZone.addEventListener("dragleave", () => {
  pixelDropZone.classList.remove("dragging");
});

pixelDropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  pixelDropZone.classList.remove("dragging");
  const file = [...event.dataTransfer.files].find((item) => ["image/png", "image/jpeg", "image/webp"].includes(item.type));
  if (file) loadPixelImageFile(file);
});

[
  pixelWidthInput,
  pixelHeightInput,
  pixelBlockSizeInput,
  colorCountInput,
  outlineColorInput,
  customOutlineColorInput,
  customPaletteInput,
  pixelitPixelSizeInput,
  pixelitMaxColorsInput,
  pixelitPaletteInput
].forEach((input) => {
  onValueInput(input, schedulePixelPreview);
});

onValueChange(pixelPresetInput, () => {
  applyPixelPreset(pixelPresetInput.value);
});

onValueChange(pixelAlgorithmInput, () => {
  updatePixelAlgorithmPanel();
  schedulePixelPreview();
});

[pixelDitherInput, pixelHardEdgesInput, pixelOutlineInput, preserveGlowInput, autoPixelHeightInput, presetSyncSizeInput, pixelitDitherInput, pixelitGrayscaleInput].forEach((input) => {
  onValueChange(input, () => {
    pixelHeightInput.disabled = autoPixelHeightInput.checked;
    if (autoPixelHeightInput.checked) updateAutoPixelHeight();
    schedulePixelPreview();
  });
});

[
  [pixelSaturationInput, pixelSaturationValue],
  [pixelContrastInput, pixelContrastValue],
  [pixelSharpenInput, pixelSharpenValue],
  [alphaThresholdInput, alphaThresholdValue],
  [dirtyColorMergeInput, dirtyColorMergeValue],
  [pixelitBrightnessInput, pixelitBrightnessValue],
  [pixelitContrastInput, pixelitContrastValue],
  [pixelitSaturationInput, pixelitSaturationValue]
].forEach(([input, output]) => {
  onValueInput(input, () => {
    output.value = input.value;
    schedulePixelPreview();
  });
});

downloadPixelActualButton.addEventListener("click", () => {
  downloadCanvas(pixelActualCanvas, `${baseName(pixelFileName)}_pixel.png`);
});

downloadPixelPreviewButton.addEventListener("click", () => {
  downloadCanvas(pixelPreviewCanvas, `${baseName(pixelFileName)}_pixel_preview.png`);
});

updatePixelAlgorithmPanel();
