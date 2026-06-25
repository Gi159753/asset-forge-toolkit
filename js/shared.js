// Shared helpers
// Loaded as a classic script so the tool still works from file://.

    function canvasToPngBlob(canvas) {
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("PNG 生成失败"));
        }, "image/png");
      });
    }


    async function createZip(files) {
      const encoder = new TextEncoder();
      const fileParts = [];
      const centralParts = [];
      let offset = 0;

      for (const file of files) {
        const nameBytes = encoder.encode(file.name);
        const data = new Uint8Array(await file.blob.arrayBuffer());
        const crc = crc32(data);
        const localHeader = new Uint8Array(30 + nameBytes.length);
        const localView = new DataView(localHeader.buffer);
        localView.setUint32(0, 0x04034b50, true);
        localView.setUint16(4, 20, true);
        localView.setUint16(8, 0, true);
        localView.setUint32(14, crc, true);
        localView.setUint32(18, data.length, true);
        localView.setUint32(22, data.length, true);
        localView.setUint16(26, nameBytes.length, true);
        localHeader.set(nameBytes, 30);
        fileParts.push(localHeader, data);

        const centralHeader = new Uint8Array(46 + nameBytes.length);
        const centralView = new DataView(centralHeader.buffer);
        centralView.setUint32(0, 0x02014b50, true);
        centralView.setUint16(4, 20, true);
        centralView.setUint16(6, 20, true);
        centralView.setUint16(10, 0, true);
        centralView.setUint32(16, crc, true);
        centralView.setUint32(20, data.length, true);
        centralView.setUint32(24, data.length, true);
        centralView.setUint16(28, nameBytes.length, true);
        centralView.setUint32(42, offset, true);
        centralHeader.set(nameBytes, 46);
        centralParts.push(centralHeader);
        offset += localHeader.length + data.length;
      }

      const centralSize = centralParts.reduce((total, part) => total + part.length, 0);
      const end = new Uint8Array(22);
      const endView = new DataView(end.buffer);
      endView.setUint32(0, 0x06054b50, true);
      endView.setUint16(8, files.length, true);
      endView.setUint16(10, files.length, true);
      endView.setUint32(12, centralSize, true);
      endView.setUint32(16, offset, true);
      return new Blob([...fileParts, ...centralParts, end], { type: "application/zip" });
    }


    function crc32(data) {
      let crc = 0xffffffff;
      for (let index = 0; index < data.length; index += 1) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ data[index]) & 0xff];
      }
      return (crc ^ 0xffffffff) >>> 0;
    }


    const crcTable = (() => {
      const table = new Uint32Array(256);
      for (let index = 0; index < 256; index += 1) {
        let value = index;
        for (let bit = 0; bit < 8; bit += 1) {
          value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
        }
        table[index] = value >>> 0;
      }
      return table;
    })();


    function downloadBlob(blob, filename) {
      if (!blob || !filename) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    }


    function downloadCanvas(canvas, filename) {
      if (!canvas || canvas.width <= 0 || canvas.height <= 0) return;
      canvas.toBlob((blob) => {
        downloadBlob(blob, filename);
      }, "image/png");
    }


    function colorDistance(r, g, b, color) {
      const dr = r - color.r;
      const dg = g - color.g;
      const db = b - color.b;
      return Math.sqrt((dr * dr) + (dg * dg) + (db * db));
    }


    function canvasPointFromEvent(canvas, event) {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;
      const x = Math.floor(((event.clientX - rect.left) / rect.width) * canvas.width);
      const y = Math.floor(((event.clientY - rect.top) / rect.height) * canvas.height);
      if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return null;
      return { x, y };
    }


    function rgbToHex(color) {
      return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
    }


    function toHex(value) {
      return clampByte(value).toString(16).padStart(2, "0");
    }


    function clampByte(value) {
      return Math.max(0, Math.min(255, Math.round(value)));
    }


    function clampInt(value, min, max, fallback) {
      const number = Number.parseInt(value, 10);
      if (!Number.isFinite(number)) return fallback;
      return Math.max(min, Math.min(max, number));
    }


    function safeFileName(value) {
      return String(value).trim().replace(/[\\/:*?"<>|]+/g, "_").replace(/\s+/g, "_").replace(/^_+|_+$/g, "") || "animation";
    }


    function baseName(name) {
      return name.replace(/\.[^.]+$/, "") || "image";
    }

