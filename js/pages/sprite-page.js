// Video sprite page DOM wiring.
// Loaded as a classic script so the tool still works from file://.

const videoDropZone = document.getElementById("videoDropZone");
const videoInput = document.getElementById("videoInput");
const videoFileButton = document.getElementById("videoFileButton");
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

let videoObjectUrl = "";
let videoFileName = "video";
let generatedSheetBlob = null;
let generatedJsonBlob = null;
let generatedZipBlob = null;
let generatedSheetName = "";
let generatedJsonName = "";
let generatedZipName = "";

videoFileButton.addEventListener("click", () => videoInput.click());

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

[frameCountInput, sheetColumnsInput].forEach((input) => {
  onValueInput(input, updateRowsHint);
});

extractButton.addEventListener("click", extractSpriteSheet);
downloadSheetButton.addEventListener("click", () => downloadBlob(generatedSheetBlob, generatedSheetName));
downloadJsonButton.addEventListener("click", () => downloadBlob(generatedJsonBlob, generatedJsonName));
downloadFramesButton.addEventListener("click", () => downloadBlob(generatedZipBlob, generatedZipName));

updateRowsHint();
