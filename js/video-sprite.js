// Video to spritesheet tool
// Loaded as a classic script so the tool still works from file://.

    function loadVideoFile(file) {
      if (videoObjectUrl) URL.revokeObjectURL(videoObjectUrl);
      videoFileName = baseName(file.name || "video");
      animationNameInput.value = safeFileName(videoFileName);
      videoObjectUrl = URL.createObjectURL(file);
      videoPreview.src = videoObjectUrl;
      videoPreview.load();
      resetGeneratedVideoAssets();
      videoInfo.textContent = "正在读取视频信息...";
      videoPreviewInfo.textContent = "读取中";
      videoEmpty.hidden = true;
      extractButton.disabled = true;

      videoPreview.onloadedmetadata = () => {
        const width = videoPreview.videoWidth;
        const height = videoPreview.videoHeight;
        const duration = Number.isFinite(videoPreview.duration) ? videoPreview.duration : 0;
        videoInfo.textContent = `${width} × ${height}，${duration.toFixed(2)} 秒`;
        videoPreviewInfo.textContent = `${width} × ${height}`;
        extractButton.disabled = width <= 0 || height <= 0 || duration <= 0;
      };
    }


    function resetGeneratedVideoAssets() {
      generatedSheetBlob = null;
      generatedJsonBlob = null;
      generatedZipBlob = null;
      generatedSheetName = "";
      generatedJsonName = "";
      generatedZipName = "";
      sheetCanvas.width = 0;
      sheetCanvas.height = 0;
      sheetInfo.textContent = "未生成";
      sheetEmpty.hidden = false;
      extractProgress.value = 0;
      progressText.textContent = "等待开始";
      downloadSheetButton.disabled = true;
      downloadJsonButton.disabled = true;
      downloadFramesButton.disabled = true;
    }


    async function extractSpriteSheet() {
      if (!videoPreview.src || videoPreview.videoWidth <= 0 || videoPreview.videoHeight <= 0) return;

      const settings = getSpriteSettings();
      const frameWidth = videoPreview.videoWidth;
      const frameHeight = videoPreview.videoHeight;
      const sheetWidth = frameWidth * settings.columns;
      const sheetHeight = frameHeight * settings.rows;
      const frameCanvas = document.createElement("canvas");
      const frameCtx = frameCanvas.getContext("2d");
      const sheetCtx = sheetCanvas.getContext("2d");
      const frameFiles = [];

      frameCanvas.width = frameWidth;
      frameCanvas.height = frameHeight;
      sheetCanvas.width = sheetWidth;
      sheetCanvas.height = sheetHeight;
      sheetCtx.clearRect(0, 0, sheetWidth, sheetHeight);
      sheetEmpty.hidden = true;
      extractButton.disabled = true;
      setDownloadButtonsDisabled(true);
      setProgress(0, "准备抽帧...");

      try {
        videoPreview.pause();
        await waitForVideoReady(videoPreview);
        for (let index = 0; index < settings.frameCount; index += 1) {
          const time = frameTime(index, settings.frameCount, videoPreview.duration);
          await seekVideo(videoPreview, time);
          frameCtx.clearRect(0, 0, frameWidth, frameHeight);
          frameCtx.drawImage(videoPreview, 0, 0, frameWidth, frameHeight);

          const column = index % settings.columns;
          const row = Math.floor(index / settings.columns);
          sheetCtx.drawImage(frameCanvas, column * frameWidth, row * frameHeight);

          const frameBlob = await canvasToPngBlob(frameCanvas);
          frameFiles.push({
            name: `${settings.animationName}_${String(index).padStart(4, "0")}.png`,
            blob: frameBlob
          });
          setProgress(((index + 1) / settings.frameCount) * 80, `抽帧 ${index + 1} / ${settings.frameCount}`);
        }

        generatedSheetName = `${settings.animationName}_spritesheet.png`;
        generatedJsonName = `${settings.animationName}.json`;
        generatedZipName = `${settings.animationName}_frames.zip`;
        generatedSheetBlob = await canvasToPngBlob(sheetCanvas);
        const metadata = {
          animation_name: settings.animationName,
          spritesheet: generatedSheetName,
          frame_count: settings.frameCount,
          frame_width: frameWidth,
          frame_height: frameHeight,
          columns: settings.columns,
          rows: settings.rows,
          fps: settings.fps
        };
        generatedJsonBlob = new Blob([JSON.stringify(metadata, null, 2)], { type: "application/json" });
        setProgress(90, "正在打包单帧 ZIP...");
        generatedZipBlob = await createZip(frameFiles);
        sheetInfo.textContent = `${sheetWidth} × ${sheetHeight}`;
        setProgress(100, "生成完成");
        setDownloadButtonsDisabled(false);
      } catch (error) {
        progressText.textContent = `生成失败：${error.message}`;
      } finally {
        extractButton.disabled = false;
      }
    }


    function getSpriteSettings() {
      const frameCount = clampInt(frameCountInput.value, 1, 240, 24);
      const columns = clampInt(sheetColumnsInput.value, 1, 60, 6);
      const rows = Math.ceil(frameCount / columns);
      const fps = clampInt(sheetFpsInput.value, 1, 240, 24);
      return {
        animationName: safeFileName(animationNameInput.value || videoFileName || "animation"),
        frameCount,
        columns,
        rows,
        fps
      };
    }


    function updateRowsHint() {
      const frameCount = clampInt(frameCountInput.value, 1, 240, 24);
      const columns = clampInt(sheetColumnsInput.value, 1, 60, 6);
      const autoRows = Math.ceil(frameCount / columns);
      rowsValue.value = String(autoRows);
    }


    function frameTime(index, frameCount, duration) {
      if (frameCount <= 1) return 0;
      const end = Math.max(0, duration - 0.001);
      return Math.min(end, (index / (frameCount - 1)) * end);
    }


    function seekVideo(video, time) {
      return new Promise((resolve, reject) => {
        if (Math.abs(video.currentTime - time) < 0.001 && video.readyState >= 2) {
          requestAnimationFrame(resolve);
          return;
        }
        const cleanup = () => {
          video.removeEventListener("seeked", onSeeked);
          video.removeEventListener("error", onError);
        };
        const onSeeked = () => {
          cleanup();
          resolve();
        };
        const onError = () => {
          cleanup();
          reject(new Error("视频 seek 失败"));
        };
        video.addEventListener("seeked", onSeeked, { once: true });
        video.addEventListener("error", onError, { once: true });
        video.currentTime = time;
      });
    }


    function waitForVideoReady(video) {
      if (video.readyState >= 2) return Promise.resolve();
      return new Promise((resolve, reject) => {
        const cleanup = () => {
          video.removeEventListener("loadeddata", onReady);
          video.removeEventListener("error", onError);
        };
        const onReady = () => {
          cleanup();
          resolve();
        };
        const onError = () => {
          cleanup();
          reject(new Error("视频数据读取失败"));
        };
        video.addEventListener("loadeddata", onReady, { once: true });
        video.addEventListener("error", onError, { once: true });
      });
    }


    function setProgress(value, text) {
      extractProgress.value = Math.max(0, Math.min(100, value));
      progressText.textContent = text;
    }


    function setDownloadButtonsDisabled(disabled) {
      downloadSheetButton.disabled = disabled || !generatedSheetBlob;
      downloadJsonButton.disabled = disabled || !generatedJsonBlob;
      downloadFramesButton.disabled = disabled || !generatedZipBlob;
    }

