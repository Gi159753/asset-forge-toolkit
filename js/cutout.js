// Cutout tool
// Loaded as a classic script so the tool still works from file://.

    function loadImageFile(file) {
      originalFileName = file.name || "image";
      const image = new Image();
      image.onload = () => {
        sourceCanvas.width = image.naturalWidth;
        sourceCanvas.height = image.naturalHeight;
        previewCanvas.width = image.naturalWidth;
        previewCanvas.height = image.naturalHeight;

        sourceCtx.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
        sourceCtx.drawImage(image, 0, 0);
        sourceImageData = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);

        sourceInfo.textContent = `${image.naturalWidth} × ${image.naturalHeight}`;
        previewInfo.textContent = `${image.naturalWidth} × ${image.naturalHeight}`;
        sourceEmpty.hidden = true;
        previewEmpty.hidden = true;
        exportButton.disabled = false;

        if (getMode() === "black") sampledColors = [{ r: 0, g: 0, b: 0 }];
        requestAnimationFrame(fitImageToView);
        updateModeHint();
        updateSampleDisplay();
        schedulePreview();
        URL.revokeObjectURL(image.src);
      };
      image.src = URL.createObjectURL(file);
    }


    function schedulePreview() {
      if (!sourceImageData) return;
      cancelAnimationFrame(previewFrame);
      previewFrame = requestAnimationFrame(renderPreview);
    }


    function applyZoom() {
      const zoom = Number(zoomInput.value);
      zoomValue.value = `${zoom}%`;
      if (!sourceImageData) return;
      const width = `${Math.round(sourceImageData.width * zoom / 100)}px`;
      const height = `${Math.round(sourceImageData.height * zoom / 100)}px`;
      sourceCanvas.style.width = width;
      sourceCanvas.style.height = height;
      previewCanvas.style.width = width;
      previewCanvas.style.height = height;
      sourceWrap.classList.toggle("can-pan", zoom > 100);
      previewWrap.classList.toggle("can-pan", zoom > 100);
    }


    function fitImageToView() {
      if (!sourceImageData) {
        applyZoom();
        return;
      }

      const zoom = Math.max(1, Math.min(400, Math.floor(getFitZoom())));
      zoomInput.value = zoom;
      applyZoom();
      sourceWrap.scrollLeft = 0;
      sourceWrap.scrollTop = 0;
      previewWrap.scrollLeft = 0;
      previewWrap.scrollTop = 0;
    }


    function getFitZoom() {
      const wraps = [sourceWrap, previewWrap];
      let zoom = 100;

      wraps.forEach((wrap) => {
        const style = getComputedStyle(wrap);
        const horizontalPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        const verticalPadding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        const availableWidth = Math.max(1, wrap.clientWidth - horizontalPadding);
        const availableHeight = Math.max(1, wrap.clientHeight - verticalPadding);
        zoom = Math.min(
          zoom,
          (availableWidth / sourceImageData.width) * 100,
          (availableHeight / sourceImageData.height) * 100
        );
      });

      return zoom;
    }


    function setupSyncedScroll(fromWrap, toWrap) {
      fromWrap.addEventListener("scroll", () => {
        if (syncingScroll) return;
        syncLinkedScroll(fromWrap, toWrap);
      });
    }


    function syncLinkedScroll(fromWrap, toWrap) {
      syncingScroll = true;
      syncScrollPosition(fromWrap, toWrap);
      requestAnimationFrame(() => {
        syncingScroll = false;
      });
    }


    function syncScrollPosition(fromWrap, toWrap) {
      const fromMaxLeft = Math.max(1, fromWrap.scrollWidth - fromWrap.clientWidth);
      const fromMaxTop = Math.max(1, fromWrap.scrollHeight - fromWrap.clientHeight);
      const toMaxLeft = Math.max(0, toWrap.scrollWidth - toWrap.clientWidth);
      const toMaxTop = Math.max(0, toWrap.scrollHeight - toWrap.clientHeight);
      toWrap.scrollLeft = (fromWrap.scrollLeft / fromMaxLeft) * toMaxLeft;
      toWrap.scrollTop = (fromWrap.scrollTop / fromMaxTop) * toMaxTop;
    }


    function setupMiddleMousePan(wrap, linkedWrap) {
      wrap.addEventListener("auxclick", (event) => {
        if (event.button === 1) event.preventDefault();
      });

      wrap.addEventListener("mousedown", (event) => {
        if (event.button !== 1) return;
        event.preventDefault();

        const startX = event.clientX;
        const startY = event.clientY;
        const startLeft = wrap.scrollLeft;
        const startTop = wrap.scrollTop;
        wrap.classList.add("panning");

        function move(moveEvent) {
          wrap.scrollLeft = startLeft - (moveEvent.clientX - startX);
          wrap.scrollTop = startTop - (moveEvent.clientY - startY);
          syncLinkedScroll(wrap, linkedWrap);
        }

        function stop() {
          wrap.classList.remove("panning");
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseup", stop);
        }

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", stop);
      });
    }


    function renderPreview() {
      const mode = getMode();
      const threshold = Number(sliders.threshold.value);
      const feather = Number(sliders.feather.value);
      const defringe = Number(sliders.defringe.value) / 100;
      const strength = Number(sliders.alphaStrength.value) / 100;
      const width = sourceImageData.width;
      const height = sourceImageData.height;
      const source = sourceImageData.data;
      const output = new ImageData(new Uint8ClampedArray(source), width, height);
      const targetMask = mode === "edge"
        ? buildEdgeConnectedMask(source, width, height, threshold + feather, sampledColors)
        : null;

      for (let index = 0; index < source.length; index += 4) {
        const pixel = index / 4;
        if (targetMask && !targetMask[pixel]) continue;

        const r = source[index];
        const g = source[index + 1];
        const b = source[index + 2];
        const distance = mode === "black"
          ? Math.max(r, g, b)
          : nearestSampleDistance(r, g, b);
        const removal = removalAmount(distance, threshold, feather) * strength;
        if (removal <= 0) continue;

        const alpha = source[index + 3] / 255;
        const nextAlpha = Math.max(0, alpha * (1 - removal));
        output.data[index + 3] = Math.round(nextAlpha * 255);

        if (nextAlpha > 0 && defringe > 0) {
          const amount = Math.min(1, removal * defringe);
          const clean = removeColorSpill(r, g, b, nearestSampleColor(r, g, b), amount);
          output.data[index] = clean.r;
          output.data[index + 1] = clean.g;
          output.data[index + 2] = clean.b;
        }
      }

      previewCtx.clearRect(0, 0, width, height);
      previewCtx.putImageData(output, 0, 0);
    }


    function removalAmount(distance, threshold, feather) {
      if (distance <= threshold) return 1;
      if (feather <= 0) return 0;
      if (distance >= threshold + feather) return 0;
      return 1 - ((distance - threshold) / feather);
    }


    function buildEdgeConnectedMask(source, width, height, limit, colors) {
      const mask = new Uint8Array(width * height);
      const queue = [];

      for (let x = 0; x < width; x += 1) {
        enqueueIfSimilar(x, 0);
        enqueueIfSimilar(x, height - 1);
      }
      for (let y = 1; y < height - 1; y += 1) {
        enqueueIfSimilar(0, y);
        enqueueIfSimilar(width - 1, y);
      }

      for (let head = 0; head < queue.length; head += 1) {
        const pixel = queue[head];
        const x = pixel % width;
        const y = Math.floor(pixel / width);
        if (x > 0) enqueueIfSimilar(x - 1, y);
        if (x < width - 1) enqueueIfSimilar(x + 1, y);
        if (y > 0) enqueueIfSimilar(x, y - 1);
        if (y < height - 1) enqueueIfSimilar(x, y + 1);
      }

      return mask;

      function enqueueIfSimilar(x, y) {
        const pixel = y * width + x;
        if (mask[pixel]) return;
        const index = pixel * 4;
        if (nearestSampleDistance(source[index], source[index + 1], source[index + 2], colors) > limit) return;
        mask[pixel] = 1;
        queue.push(pixel);
      }
    }


    function removeColorSpill(r, g, b, color, amount) {
      return {
        r: clampByte(r + ((r - color.r) * amount)),
        g: clampByte(g + ((g - color.g) * amount)),
        b: clampByte(b + ((b - color.b) * amount))
      };
    }


    function updateModeHint() {
      const mode = getMode();
      sourceCanvas.classList.toggle("pickable", mode !== "black");
      if (mode === "black") {
        sampledColors = [{ r: 0, g: 0, b: 0 }];
        modeHint.textContent = "黑底模式会按像素亮度把接近黑色的区域转透明。";
      } else if (mode === "solid") {
        modeHint.textContent = "点击左侧原图取样背景色；按住 Shift 点击可以追加多个背景色。";
      } else {
        modeHint.textContent = "点击左侧原图取样背景色；按住 Shift 点击可追加多个颜色，只删除与图片边缘连通的相近背景。";
      }
      updateSampleDisplay();
    }


    function updateSampleDisplay() {
      const hexes = sampledColors.map(rgbToHex);
      sampleText.textContent = hexes.length > 1 ? `${hexes.length} 色：${hexes.join(", ")}` : hexes[0];
      sampleSwatch.replaceChildren(...hexes.map((hex) => {
        const swatch = document.createElement("span");
        swatch.className = "swatch";
        swatch.style.backgroundColor = hex;
        return swatch;
      }));
    }

    function nearestSampleDistance(r, g, b, colors = sampledColors) {
      return colors.reduce((best, color) => Math.min(best, colorDistance(r, g, b, color)), Infinity);
    }

    function nearestSampleColor(r, g, b) {
      return sampledColors.reduce((best, color) => {
        const distance = colorDistance(r, g, b, color);
        return distance < best.distance ? { color, distance } : best;
      }, { color: sampledColors[0], distance: Infinity }).color;
    }


    function getMode() {
      return modeGroup.value;
    }
