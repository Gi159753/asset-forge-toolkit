// Image pixelation tool
// Loaded as a classic script so the tool still works from file://.

    const pixelPresets = {
      classic: {
        width: 32,
        colorCount: 16,
        hardEdges: true,
        outline: true,
        alphaThreshold: 160,
        dirtyColorMerge: 45,
        sharpen: 45,
        preserveGlow: false,
        dither: false
      },
      modern: {
        width: 64,
        colorCount: 64,
        hardEdges: true,
        outline: false,
        alphaThreshold: 110,
        dirtyColorMerge: 25,
        sharpen: 30,
        preserveGlow: false,
        dither: false
      },
      hd: {
        width: 128,
        colorCount: 128,
        hardEdges: false,
        outline: false,
        alphaThreshold: 60,
        dirtyColorMerge: 10,
        sharpen: 15,
        preserveGlow: true,
        dither: false
      },
      vfx: {
        width: 128,
        colorCount: 128,
        hardEdges: false,
        outline: false,
        alphaThreshold: 30,
        dirtyColorMerge: 5,
        sharpen: 10,
        preserveGlow: true,
        dither: false
      }
    };

    function loadPixelImageFile(file) {
      pixelFileName = file.name || "image";
      const image = new Image();
      image.onload = () => {
        pixelOriginalImage = image;
        pixelSourceCanvas.width = image.naturalWidth;
        pixelSourceCanvas.height = image.naturalHeight;
        pixelSourceCtx.clearRect(0, 0, image.naturalWidth, image.naturalHeight);
        pixelSourceCtx.imageSmoothingEnabled = false;
        pixelSourceCtx.drawImage(image, 0, 0);
        pixelSourceInfo.textContent = `${image.naturalWidth} × ${image.naturalHeight}`;
        pixelSourceEmpty.hidden = true;
        pixelPreviewEmpty.hidden = true;
        downloadPixelActualButton.disabled = false;
        downloadPixelPreviewButton.disabled = false;
        updateAutoPixelHeight();
        schedulePixelPreview();
        URL.revokeObjectURL(image.src);
      };
      image.src = URL.createObjectURL(file);
    }

    function schedulePixelPreview() {
      if (!pixelOriginalImage) return;
      if (autoPixelHeightInput.checked) updateAutoPixelHeight();
      cancelAnimationFrame(pixelFrame);
      pixelFrame = requestAnimationFrame(renderPixelPreview);
    }

    function updateAutoPixelHeight() {
      if (!pixelOriginalImage || !autoPixelHeightInput.checked) return;
      const width = clampInt(pixelWidthInput.value, 1, 1024, 64);
      const height = Math.max(1, Math.round(width * pixelOriginalImage.naturalHeight / pixelOriginalImage.naturalWidth));
      pixelHeightInput.value = String(Math.min(1024, height));
    }

    function renderPixelPreview() {
      const settings = getPixelSettings();
      if (settings.algorithm === "pixelit") {
        renderPixelitStyle(settings);
        return;
      }
      const preparedCanvas = createPreparedPixelSource(settings);
      const smallCanvas = document.createElement("canvas");
      const smallCtx = smallCanvas.getContext("2d", { willReadFrequently: true });
      smallCanvas.width = settings.width;
      smallCanvas.height = settings.height;
      smallCtx.clearRect(0, 0, settings.width, settings.height);
      smallCtx.imageSmoothingEnabled = false;
      smallCtx.drawImage(preparedCanvas, 0, 0, settings.width, settings.height);

      let imageData = smallCtx.getImageData(0, 0, settings.width, settings.height);
      if (settings.hardEdges) hardenAlphaEdges(imageData, settings.alphaThreshold, settings.preserveGlow);
      quantizePixelImageData(imageData, settings.colorCount, settings.dither && !settings.hardEdges, settings.customPalette);
      if (settings.dirtyColorMerge > 0) mergeDirtyColors(imageData, settings.dirtyColorMerge, settings.preserveGlow, settings.customPalette);
      if (settings.outline) addPixelOutline(imageData, settings);
      if (settings.hardEdges) hardenAlphaEdges(imageData, settings.alphaThreshold, settings.preserveGlow);

      pixelActualCanvas.width = settings.width;
      pixelActualCanvas.height = settings.height;
      pixelActualCanvas.getContext("2d").putImageData(imageData, 0, 0);

      pixelPreviewScale = settings.blockSize;
      pixelPreviewCanvas.width = settings.width * pixelPreviewScale;
      pixelPreviewCanvas.height = settings.height * pixelPreviewScale;
      pixelPreviewCtx.clearRect(0, 0, pixelPreviewCanvas.width, pixelPreviewCanvas.height);
      pixelPreviewCtx.imageSmoothingEnabled = false;
      pixelPreviewCtx.drawImage(pixelActualCanvas, 0, 0, pixelPreviewCanvas.width, pixelPreviewCanvas.height);

      const edgeLabel = settings.hardEdges ? "硬边" : "普通";
      pixelInfo.textContent = `实际尺寸 ${settings.width} × ${settings.height}，像素块 ${settings.blockSize}x，${edgeLabel}`;
      pixelPreviewInfo.textContent = `${settings.width} × ${settings.height}`;
    }

    function getPixelSettings() {
      const width = clampInt(pixelWidthInput.value, 1, 1024, 64);
      const height = clampInt(pixelHeightInput.value, 1, 1024, 64);
      return {
        algorithm: pixelAlgorithmInput.value,
        width,
        height,
        blockSize: clampInt(pixelBlockSizeInput.value, 2, 16, 8),
        colorCount: clampInt(colorCountInput.value, 8, 256, 64),
        customPalette: parseCustomPalette(customPaletteInput.value),
        dither: pixelDitherInput.checked,
        hardEdges: pixelHardEdgesInput.checked,
        outline: pixelOutlineInput.checked,
        alphaThreshold: clampInt(alphaThresholdInput.value, 0, 255, 100),
        dirtyColorMerge: clampInt(dirtyColorMergeInput.value, 0, 100, 30),
        outlineColor: outlineColorInput.value,
        customOutlineColor: customOutlineColorInput.value,
        preserveGlow: preserveGlowInput.checked,
        saturation: Number(pixelSaturationInput.value) / 100,
        contrast: Number(pixelContrastInput.value) / 100,
        sharpen: Number(pixelSharpenInput.value) / 100
      };
    }

    function getPixelitSettings(baseSettings) {
      return {
        ...baseSettings,
        blockSize: clampInt(pixelitPixelSizeInput.value, 2, 16, 8),
        maxColors: clampInt(pixelitMaxColorsInput.value, 8, 256, 64),
        palette: parseCustomPalette(pixelitPaletteInput.value),
        dither: pixelitDitherInput.checked,
        grayscale: pixelitGrayscaleInput.checked,
        brightness: Number(pixelitBrightnessInput.value) / 100,
        contrast: Number(pixelitContrastInput.value) / 100,
        saturation: Number(pixelitSaturationInput.value) / 100
      };
    }

    function updatePixelAlgorithmPanel() {
      pixelitPanel.hidden = pixelAlgorithmInput.value !== "pixelit";
    }

    function renderPixelitStyle(settings) {
      const pixelit = getPixelitSettings(settings);
      const smallCanvas = document.createElement("canvas");
      const smallCtx = smallCanvas.getContext("2d", { willReadFrequently: true });
      smallCanvas.width = pixelit.width;
      smallCanvas.height = pixelit.height;
      smallCtx.clearRect(0, 0, pixelit.width, pixelit.height);
      smallCtx.imageSmoothingEnabled = false;
      smallCtx.drawImage(pixelOriginalImage, 0, 0, pixelit.width, pixelit.height);

      const imageData = smallCtx.getImageData(0, 0, pixelit.width, pixelit.height);
      applyPixelitColorAdjustments(imageData, pixelit);
      hardenAlphaEdges(imageData, pixelit.alphaThreshold, pixelit.preserveGlow);
      quantizePixelImageData(imageData, pixelit.maxColors, pixelit.dither, pixelit.palette);

      pixelActualCanvas.width = pixelit.width;
      pixelActualCanvas.height = pixelit.height;
      pixelActualCanvas.getContext("2d").putImageData(imageData, 0, 0);

      pixelPreviewScale = pixelit.blockSize;
      pixelPreviewCanvas.width = pixelit.width * pixelPreviewScale;
      pixelPreviewCanvas.height = pixelit.height * pixelPreviewScale;
      pixelPreviewCtx.clearRect(0, 0, pixelPreviewCanvas.width, pixelPreviewCanvas.height);
      pixelPreviewCtx.imageSmoothingEnabled = false;
      pixelPreviewCtx.drawImage(pixelActualCanvas, 0, 0, pixelPreviewCanvas.width, pixelPreviewCanvas.height);

      const paletteLabel = pixelit.palette.length >= 2 ? "自定义调色板" : `自动 ${pixelit.maxColors} 色`;
      pixelInfo.textContent = `Pixelit Style，实际尺寸 ${pixelit.width} × ${pixelit.height}，像素块 ${pixelit.blockSize}x，${paletteLabel}`;
      pixelPreviewInfo.textContent = `${pixelit.width} × ${pixelit.height}`;
    }

    function applyPixelitColorAdjustments(imageData, settings) {
      const data = imageData.data;
      for (let index = 0; index < data.length; index += 4) {
        if (data[index + 3] === 0) continue;
        let r = data[index] * settings.brightness;
        let g = data[index + 1] * settings.brightness;
        let b = data[index + 2] * settings.brightness;
        const gray = (r * 0.299) + (g * 0.587) + (b * 0.114);
        if (settings.grayscale) {
          r = gray;
          g = gray;
          b = gray;
        } else {
          r = gray + ((r - gray) * settings.saturation);
          g = gray + ((g - gray) * settings.saturation);
          b = gray + ((b - gray) * settings.saturation);
        }
        data[index] = clampByte(((r - 128) * settings.contrast) + 128);
        data[index + 1] = clampByte(((g - 128) * settings.contrast) + 128);
        data[index + 2] = clampByte(((b - 128) * settings.contrast) + 128);
      }
    }

    function applyPixelPreset(presetId) {
      const preset = pixelPresets[presetId];
      if (!preset) return;

      if (presetSyncSizeInput.checked) {
        pixelWidthInput.value = String(preset.width);
        if (autoPixelHeightInput.checked) updateAutoPixelHeight();
      }

      colorCountInput.value = String(preset.colorCount);
      pixelHardEdgesInput.checked = preset.hardEdges;
      pixelOutlineInput.checked = preset.outline;
      alphaThresholdInput.value = String(preset.alphaThreshold);
      alphaThresholdValue.value = String(preset.alphaThreshold);
      dirtyColorMergeInput.value = String(preset.dirtyColorMerge);
      dirtyColorMergeValue.value = String(preset.dirtyColorMerge);
      pixelSharpenInput.value = String(preset.sharpen);
      pixelSharpenValue.value = String(preset.sharpen);
      preserveGlowInput.checked = preset.preserveGlow;
      pixelDitherInput.checked = preset.dither;
      schedulePixelPreview();
    }

    function createPreparedPixelSource(settings) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = pixelOriginalImage.naturalWidth;
      canvas.height = pixelOriginalImage.naturalHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(pixelOriginalImage, 0, 0);

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      adjustPixelImageData(imageData, settings.saturation, Math.max(settings.contrast, settings.hardEdges ? 1.18 : 1));
      imageData = sharpenPixelImageData(imageData, Math.max(settings.sharpen, settings.hardEdges ? 0.35 : 0));
      ctx.putImageData(imageData, 0, 0);
      return canvas;
    }

    function adjustPixelImageData(imageData, saturation, contrast) {
      const data = imageData.data;
      for (let index = 0; index < data.length; index += 4) {
        if (data[index + 3] === 0) continue;
        let r = data[index];
        let g = data[index + 1];
        let b = data[index + 2];
        const gray = (r * 0.299) + (g * 0.587) + (b * 0.114);
        r = gray + ((r - gray) * saturation);
        g = gray + ((g - gray) * saturation);
        b = gray + ((b - gray) * saturation);
        data[index] = clampByte(((r - 128) * contrast) + 128);
        data[index + 1] = clampByte(((g - 128) * contrast) + 128);
        data[index + 2] = clampByte(((b - 128) * contrast) + 128);
      }
    }

    function sharpenPixelImageData(imageData, strength) {
      if (strength <= 0) return imageData;
      const width = imageData.width;
      const height = imageData.height;
      const source = imageData.data;
      const output = new ImageData(new Uint8ClampedArray(source), width, height);
      const amount = strength * 1.1;

      for (let y = 1; y < height - 1; y += 1) {
        for (let x = 1; x < width - 1; x += 1) {
          const index = (y * width + x) * 4;
          if (source[index + 3] === 0) continue;
          for (let channel = 0; channel < 3; channel += 1) {
            const center = source[index + channel];
            const left = source[index + channel - 4];
            const right = source[index + channel + 4];
            const up = source[index + channel - (width * 4)];
            const down = source[index + channel + (width * 4)];
            output.data[index + channel] = clampByte(center + ((center * 4 - left - right - up - down) * amount));
          }
        }
      }

      return output;
    }

    function hardenAlphaEdges(imageData, threshold, preserveGlow) {
      const data = imageData.data;
      for (let index = 0; index < data.length; index += 4) {
        if (preserveGlow && isGlowPixel(data, index)) continue;
        const alpha = data[index + 3];
        data[index + 3] = alpha >= threshold ? 255 : 0;
        if (data[index + 3] === 0) {
          data[index] = 0;
          data[index + 1] = 0;
          data[index + 2] = 0;
        }
      }
    }

    function quantizePixelImageData(imageData, colorCount, dither, customPalette) {
      const palette = customPalette.length >= 2 ? customPalette : buildMedianCutPalette(imageData.data, colorCount);
      if (palette.length === 0) return;
      if (dither) {
        ditherPixelImageData(imageData, palette);
      } else {
        const data = imageData.data;
        for (let index = 0; index < data.length; index += 4) {
          if (data[index + 3] === 0) continue;
          const color = nearestPaletteColor(data[index], data[index + 1], data[index + 2], palette);
          data[index] = color.r;
          data[index + 1] = color.g;
          data[index + 2] = color.b;
        }
      }
    }

    function parseCustomPalette(value) {
      const colors = String(value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map(parseHexPaletteColor)
        .filter(Boolean);
      return colors.length >= 2 ? colors : [];
    }

    function parseHexPaletteColor(value) {
      const match = /^#?([0-9a-f]{6})$/i.exec(value);
      if (!match) return null;
      const hex = match[1];
      return {
        r: Number.parseInt(hex.slice(0, 2), 16),
        g: Number.parseInt(hex.slice(2, 4), 16),
        b: Number.parseInt(hex.slice(4, 6), 16)
      };
    }

    function buildMedianCutPalette(data, targetCount) {
      const colors = [];
      for (let index = 0; index < data.length; index += 4) {
        if (data[index + 3] === 0) continue;
        colors.push([data[index], data[index + 1], data[index + 2]]);
      }
      if (colors.length === 0) return [];

      let boxes = [colors];
      while (boxes.length < targetCount) {
        boxes.sort((a, b) => colorBoxRange(b) - colorBoxRange(a));
        const box = boxes.shift();
        if (!box || box.length <= 1) {
          if (box) boxes.push(box);
          break;
        }
        const channel = widestColorChannel(box);
        box.sort((a, b) => a[channel] - b[channel]);
        const middle = Math.floor(box.length / 2);
        boxes.push(box.slice(0, middle), box.slice(middle));
      }

      return boxes.map((box) => averageColor(box));
    }

    function colorBoxRange(box) {
      let range = 0;
      for (let channel = 0; channel < 3; channel += 1) {
        let min = 255;
        let max = 0;
        box.forEach((color) => {
          min = Math.min(min, color[channel]);
          max = Math.max(max, color[channel]);
        });
        range = Math.max(range, max - min);
      }
      return range;
    }

    function widestColorChannel(box) {
      let widest = 0;
      let widestRange = -1;
      for (let channel = 0; channel < 3; channel += 1) {
        let min = 255;
        let max = 0;
        box.forEach((color) => {
          min = Math.min(min, color[channel]);
          max = Math.max(max, color[channel]);
        });
        if (max - min > widestRange) {
          widestRange = max - min;
          widest = channel;
        }
      }
      return widest;
    }

    function averageColor(box) {
      const total = box.reduce((sum, color) => {
        sum.r += color[0];
        sum.g += color[1];
        sum.b += color[2];
        return sum;
      }, { r: 0, g: 0, b: 0 });
      return {
        r: Math.round(total.r / box.length),
        g: Math.round(total.g / box.length),
        b: Math.round(total.b / box.length)
      };
    }

    function ditherPixelImageData(imageData, palette) {
      const width = imageData.width;
      const height = imageData.height;
      const data = imageData.data;
      const buffer = new Float32Array(data.length);
      for (let index = 0; index < data.length; index += 1) buffer[index] = data[index];

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const index = (y * width + x) * 4;
          if (data[index + 3] === 0) continue;
          const oldR = buffer[index];
          const oldG = buffer[index + 1];
          const oldB = buffer[index + 2];
          const color = nearestPaletteColor(oldR, oldG, oldB, palette);
          data[index] = color.r;
          data[index + 1] = color.g;
          data[index + 2] = color.b;
          spreadDitherError(buffer, data, width, height, x + 1, y, oldR - color.r, oldG - color.g, oldB - color.b, 7 / 16);
          spreadDitherError(buffer, data, width, height, x - 1, y + 1, oldR - color.r, oldG - color.g, oldB - color.b, 3 / 16);
          spreadDitherError(buffer, data, width, height, x, y + 1, oldR - color.r, oldG - color.g, oldB - color.b, 5 / 16);
          spreadDitherError(buffer, data, width, height, x + 1, y + 1, oldR - color.r, oldG - color.g, oldB - color.b, 1 / 16);
        }
      }
    }

    function spreadDitherError(buffer, data, width, height, x, y, er, eg, eb, factor) {
      if (x < 0 || y < 0 || x >= width || y >= height) return;
      const index = (y * width + x) * 4;
      if (data[index + 3] === 0) return;
      buffer[index] = Math.max(0, Math.min(255, buffer[index] + (er * factor)));
      buffer[index + 1] = Math.max(0, Math.min(255, buffer[index + 1] + (eg * factor)));
      buffer[index + 2] = Math.max(0, Math.min(255, buffer[index + 2] + (eb * factor)));
    }

    function nearestPaletteColor(r, g, b, palette) {
      let best = palette[0];
      let bestDistance = Infinity;
      palette.forEach((color) => {
        const dr = r - color.r;
        const dg = g - color.g;
        const db = b - color.b;
        const distance = (dr * dr) + (dg * dg) + (db * db);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = color;
        }
      });
      return best;
    }

    function mergeDirtyColors(imageData, threshold, preserveGlow, customPalette) {
      const data = imageData.data;
      const colors = customPalette.length >= 2 ? customPalette : buildMedianCutPalette(data, 8);
      if (colors.length === 0) return;

      for (let index = 0; index < data.length; index += 4) {
        if (data[index + 3] === 0) continue;
        if (preserveGlow && isGlowPixel(data, index)) continue;
        const color = nearestPaletteColor(data[index], data[index + 1], data[index + 2], colors);
        const distance = Math.sqrt(
          ((data[index] - color.r) ** 2) +
          ((data[index + 1] - color.g) ** 2) +
          ((data[index + 2] - color.b) ** 2)
        );
        if (distance > threshold) continue;
        data[index] = color.r;
        data[index + 1] = color.g;
        data[index + 2] = color.b;
      }
    }

    function addPixelOutline(imageData, settings) {
      const width = imageData.width;
      const height = imageData.height;
      const source = imageData.data;
      const output = new ImageData(new Uint8ClampedArray(source), width, height);
      const outline = getOutlineColor(source, settings);

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const index = (y * width + x) * 4;
          if (source[index + 3] !== 0) continue;
          if (!touchesSolidOrContrast(source, width, height, x, y)) continue;
          output.data[index] = outline.r;
          output.data[index + 1] = outline.g;
          output.data[index + 2] = outline.b;
          output.data[index + 3] = outline.a;
        }
      }

      addContrastOutline(source, output.data, width, height, settings.preserveGlow);
      imageData.data.set(output.data);
      if (settings.hardEdges) hardenAlphaEdges(imageData, settings.alphaThreshold, settings.preserveGlow);
    }

    function touchesSolidOrContrast(data, width, height, x, y) {
      for (let oy = -1; oy <= 1; oy += 1) {
        for (let ox = -1; ox <= 1; ox += 1) {
          if (Math.abs(ox) + Math.abs(oy) !== 1) continue;
          const nx = x + ox;
          const ny = y + oy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const index = (ny * width + nx) * 4;
          if (data[index + 3] >= 128) return true;
        }
      }
      return false;
    }

    function addContrastOutline(source, target, width, height, preserveGlow) {
      for (let y = 1; y < height - 1; y += 1) {
        for (let x = 1; x < width - 1; x += 1) {
          const index = (y * width + x) * 4;
          if (source[index + 3] === 0) continue;
          if (preserveGlow && isGlowPixel(source, index)) continue;
          const current = luminance(source[index], source[index + 1], source[index + 2]);
          const right = luminance(source[index + 4], source[index + 5], source[index + 6]);
          const downIndex = index + (width * 4);
          const down = luminance(source[downIndex], source[downIndex + 1], source[downIndex + 2]);
          if (Math.abs(current - right) < 70 && Math.abs(current - down) < 70) continue;
          target[index] = Math.max(0, target[index] - 28);
          target[index + 1] = Math.max(0, target[index + 1] - 28);
          target[index + 2] = Math.max(0, target[index + 2] - 28);
          target[index + 3] = 255;
        }
      }
    }

    function luminance(r, g, b) {
      return (r * 0.299) + (g * 0.587) + (b * 0.114);
    }

    function getOutlineColor(data, settings) {
      if (settings.outlineColor === "black") return { r: 0, g: 0, b: 0, a: 255 };
      if (settings.outlineColor === "dark") return { r: 24, g: 24, b: 28, a: 255 };
      if (settings.outlineColor === "custom") return hexToColor(settings.customOutlineColor);

      const base = averageOpaqueLuminance(data);
      const value = base > 96 ? 24 : 8;
      return { r: value, g: value, b: Math.min(32, value + 4), a: 255 };
    }

    function averageOpaqueLuminance(data) {
      let total = 0;
      let count = 0;
      for (let index = 0; index < data.length; index += 4) {
        if (data[index + 3] === 0) continue;
        total += luminance(data[index], data[index + 1], data[index + 2]);
        count += 1;
      }
      return count > 0 ? total / count : 128;
    }

    function hexToColor(value) {
      const hex = String(value || "#18181c").replace("#", "");
      return {
        r: Number.parseInt(hex.slice(0, 2), 16) || 0,
        g: Number.parseInt(hex.slice(2, 4), 16) || 0,
        b: Number.parseInt(hex.slice(4, 6), 16) || 0,
        a: 255
      };
    }

    function isGlowPixel(data, index) {
      const alpha = data[index + 3];
      if (alpha === 0) return false;
      const luma = luminance(data[index], data[index + 1], data[index + 2]);
      const maxChannel = Math.max(data[index], data[index + 1], data[index + 2]);
      const minChannel = Math.min(data[index], data[index + 1], data[index + 2]);
      return luma >= 210 || (maxChannel >= 230 && maxChannel - minChannel >= 40 && alpha >= 48);
    }
