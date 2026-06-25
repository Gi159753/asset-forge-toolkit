// DOM wiring
// Loaded as a classic script so the tool still works from file://.

    const fileInput = document.getElementById("fileInput");
    const exportButton = document.getElementById("exportButton");
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
    const sampleText = document.getElementById("sampleText");
    const sampleSwatch = document.getElementById("sampleSwatch");
    const zoomInput = document.getElementById("zoom");
    const zoomValue = document.getElementById("zoomValue");
    const toolTabs = document.querySelectorAll("[data-tool]");
    const cutoutTool = document.getElementById("cutoutTool");
    const spriteTool = document.getElementById("spriteTool");
    const pixelTool = document.getElementById("pixelTool");
    const videoDropZone = document.getElementById("videoDropZone");
    const videoInput = document.getElementById("videoInput");
    const videoPreview = document.getElementById("videoPreview");
    const videoEmpty = document.getElementById("videoEmpty");
    const videoInfo = document.getElementById("videoInfo");
    const videoPreviewInfo = document.getElementById("videoPreviewInfo");
    const animationNameInput = document.getElementById("animationName");
    const frameCountInput = document.getElementById("frameCount");
    const sheetColumnsInput = document.getElementById("sheetColumns");
    const sheetFpsInput = document.getElementById("sheetFps");
    const rowsValue = document.getElementById("rowsValue");
    const extractButton = document.getElementById("extractButton");
    const extractProgress = document.getElementById("extractProgress");
    const progressText = document.getElementById("progressText");
    const sheetCanvas = document.getElementById("sheetCanvas");
    const sheetInfo = document.getElementById("sheetInfo");
    const sheetEmpty = document.getElementById("sheetEmpty");
    const downloadSheetButton = document.getElementById("downloadSheetButton");
    const downloadJsonButton = document.getElementById("downloadJsonButton");
    const downloadFramesButton = document.getElementById("downloadFramesButton");
    const pixelDropZone = document.getElementById("pixelDropZone");
    const pixelInput = document.getElementById("pixelInput");
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
    const pixelSourceCtx = pixelSourceCanvas.getContext("2d", { willReadFrequently: true });
    const pixelPreviewCtx = pixelPreviewCanvas.getContext("2d", { willReadFrequently: true });

    let sourceImageData = null;
    let originalFileName = "image";
    let sampledColors = [{ r: 0, g: 0, b: 0 }];
    let previewFrame = 0;
    let syncingScroll = false;
    let videoObjectUrl = "";
    let videoFileName = "video";
    let generatedSheetBlob = null;
    let generatedJsonBlob = null;
    let generatedZipBlob = null;
    let generatedSheetName = "";
    let generatedJsonName = "";
    let generatedZipName = "";
    let pixelOriginalImage = null;
    let pixelFileName = "image";
    let pixelActualCanvas = document.createElement("canvas");
    let pixelPreviewScale = 1;
    let pixelFrame = 0;

    toolTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.dataset.tool;
        cutoutTool.hidden = targetId !== "cutoutTool";
        spriteTool.hidden = targetId !== "spriteTool";
        pixelTool.hidden = targetId !== "pixelTool";
        toolTabs.forEach((item) => item.classList.toggle("active", item === tab));
      });
    });

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

    videoInput.addEventListener("change", () => {
      const file = videoInput.files && videoInput.files[0];
      if (file) loadVideoFile(file);
    });

    videoDropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      videoDropZone.classList.add("dragging");
    });

    videoDropZone.addEventListener("dragleave", () => {
      videoDropZone.classList.remove("dragging");
    });

    videoDropZone.addEventListener("drop", (event) => {
      event.preventDefault();
      videoDropZone.classList.remove("dragging");
      const file = [...event.dataTransfer.files].find((item) => item.type === "video/mp4" || item.type === "video/webm");
      if (file) loadVideoFile(file);
    });

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

    document.querySelectorAll("input[name='mode']").forEach((input) => {
      input.addEventListener("change", () => {
        updateModeHint();
        schedulePreview();
      });
    });

    Object.entries(sliders).forEach(([key, input]) => {
      input.addEventListener("input", () => {
        values[key].value = input.value;
        schedulePreview();
      });
    });

    zoomInput.addEventListener("input", applyZoom);

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

    [frameCountInput, sheetColumnsInput].forEach((input) => {
      input.addEventListener("input", updateRowsHint);
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
      input.addEventListener("input", schedulePixelPreview);
    });

    pixelPresetInput.addEventListener("change", () => {
      applyPixelPreset(pixelPresetInput.value);
    });

    pixelAlgorithmInput.addEventListener("change", () => {
      updatePixelAlgorithmPanel();
      schedulePixelPreview();
    });

    [pixelDitherInput, pixelHardEdgesInput, pixelOutlineInput, preserveGlowInput, autoPixelHeightInput, presetSyncSizeInput, pixelitDitherInput, pixelitGrayscaleInput].forEach((input) => {
      input.addEventListener("change", () => {
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
      input.addEventListener("input", () => {
        output.value = input.value;
        schedulePixelPreview();
      });
    });

    extractButton.addEventListener("click", extractSpriteSheet);
    downloadSheetButton.addEventListener("click", () => downloadBlob(generatedSheetBlob, generatedSheetName));
    downloadJsonButton.addEventListener("click", () => downloadBlob(generatedJsonBlob, generatedJsonName));
    downloadFramesButton.addEventListener("click", () => downloadBlob(generatedZipBlob, generatedZipName));
    downloadPixelActualButton.addEventListener("click", () => {
      downloadCanvas(pixelActualCanvas, `${baseName(pixelFileName)}_pixel.png`);
    });
    downloadPixelPreviewButton.addEventListener("click", () => {
      downloadCanvas(pixelPreviewCanvas, `${baseName(pixelFileName)}_pixel_preview.png`);
    });

    setupSyncedScroll(sourceWrap, previewWrap);
    setupSyncedScroll(previewWrap, sourceWrap);
    setupMiddleMousePan(sourceWrap, previewWrap);
    setupMiddleMousePan(previewWrap, sourceWrap);

    sourceCanvas.addEventListener("click", (event) => {
      if (!sourceImageData || getMode() === "black") return;
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
      previewCanvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${baseName(originalFileName)}_cutout.png`;
        link.click();
        URL.revokeObjectURL(link.href);
      }, "image/png");
    });


    updateSampleDisplay();
    updateRowsHint();
    updatePixelAlgorithmPanel();
